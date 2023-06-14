import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import { users } from "@/db/schema";
import { z } from "zod";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
export async function POST(req: NextRequest) {
  const body = await req.json();
  //Validate the request body using zod
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone_number: z.string().min(10).max(13).optional(),
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
    const checkExist = await db
      .select()
      .from(users)
      .where(eq(users.email, body.email));
    if (checkExist.length > 0) {
      return NextResponse.json(
        {
          error: { message: "User already exists" },
        },
        { status: 403 }
      );
    }
    var newUser = body;
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(body.password, salt);
    const result = await db.insert(users).values(newUser);
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
    { success: true, message: "Signed up successfully" },
    { status: 200 }
  );
}
