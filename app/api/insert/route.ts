import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import { tests, questions } from "@/db/schema";
import { eq } from "drizzle-orm";
export async function GET(req: NextRequest) {
  try {
    const updatedUserId = await db
      .update(questions)
      .set({
        statement:
          "For path specific operations which of the following operations is required to be used?",
        options: ["OS Module", "Path Module", "Fs Module", "None of the above"],
        answer: ["Path Module"],
      })
      .where(eq(questions.id, 3));

    return NextResponse.json(
      { success: true, message: "inserted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
