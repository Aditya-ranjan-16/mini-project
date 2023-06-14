import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import { users } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/utils/tokens";

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const token = req.headers
    .get("Authorization")
    ?.replace("Bearer ", "") as string;

  //Validate the request body using zod
  const schema = z.object({
    phone_number: z.string().min(10).max(13),
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
  try {
    validToken = await verifyToken(token);
  } catch (error) {
    return NextResponse.json(
      {
        error: { message: "Invalid token , Access Denied" },
      },
      { status: 401 }
    );
  }
  //Update phone number
  try {
    await db
      .update(users)
      .set({ phone_number: body.phone_number })
      .where(eq(users.email, validToken.email));
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
    { success: true, message: "Phone number changed / added successfully" },
    { status: 200 }
  );
}
