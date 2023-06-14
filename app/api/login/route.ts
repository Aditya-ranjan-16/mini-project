import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import { users } from "@/db/schema";
import { z } from "zod";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { generateToken } from "@/utils/tokens";
export async function POST(req: NextRequest) {
  const body = await req.json();
  var msg;
  var checkExist;
  //Validate the request body using zod
  const schema = z.object({
    email: z.string().email(),
    password: z.string(),
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
  try {
    checkExist = await db
      .select()
      .from(users)
      .where(eq(users.email, body.email));
    if (checkExist.length !== 1) {
      return NextResponse.json(
        {
          error: { message: "User does not exists" },
        },
        { status: 404 }
      );
    }
    const validPassword = await bcrypt.compare(
      body.password,
      checkExist[0].password as string
    );

    if (!validPassword) {
      return NextResponse.json(
        {
          error: { message: "Invalid password" },
        },
        { status: 403 }
      );
    }

    const getmsg = await fetch(`https://api.catboys.com/catboy`, {
      method: "GET",
    });
    const data = await getmsg.json();
    msg = data.response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: { message: "Internal Server Error" },
      },
      { status: 500 }
    );
  }

  const token = generateToken(body.email);
  return NextResponse.json(
    { success: true, message: msg, token: token, userID: checkExist[0].id },
    { status: 200 }
  );
}
