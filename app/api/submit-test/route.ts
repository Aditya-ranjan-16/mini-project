import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import { tests, responses } from "@/db/schema";
import { z } from "zod";
import { verifyToken } from "@/utils/tokens";
import { eq, and } from "drizzle-orm";
import _ from "lodash";
//import { generateToken } from "@/utils/tokens";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = req.headers
    .get("Authorization")
    ?.replace("Bearer ", "") as string;

  //Validate the request body using zod
  const schema = z.object({
    UserID: z.number(),
    TestID: z.number(),
    QuestionID: z.array(z.number()),
    Answers: z.array(z.string().array()),
  });

  const response = schema.safeParse(body);

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json(
      {
        error: { message: "Invalid request", errors },
      },
      { status: 400 }
    );
  }
  //Verify token (Auth)
  var validToken;
  var scoreMultiplier = 0;
  var test;
  try {
    validToken = await verifyToken(token);
  } catch (error) {
    return NextResponse.json(
      {
        error: { message: "Invalid token , Access denied" },
      },
      { status: 401 }
    );
  }
  //Checking if response exists or  not

  const checkExist = await db
    .select()
    .from(responses)
    .where(
      and(eq(responses.userID, body.UserID), eq(responses.testID, body.TestID))
    );
  if (checkExist.length > 0) {
    return NextResponse.json(
      {
        error: { message: "Test Response already exists" },
      },
      { status: 403 }
    );
  }

  try {
    test = await db.query.tests.findMany({
      where: eq(tests.id, body.TestID),
      with: {
        questions: true,
      },
    });

    for (var i = 0; i < test[0].questions.length; i++) {
      if (_.isEqual(test[0].questions[i].answer, body.Answers[i])) {
        scoreMultiplier += 1;
      }
    }

    const result = await db.insert(responses).values({
      testID: body.TestID,
      score: scoreMultiplier * test[0].marks_per_question,
      userID: body.UserID,
      answers: body.Answers,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: { message: "Internal Server Error" },
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      UserID: body.UserID,
      TestID: body.TestID,
      score: scoreMultiplier * test[0].marks_per_question,
    },
    { status: 200 }
  );
}
