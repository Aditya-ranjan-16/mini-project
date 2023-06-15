import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import { tests, questions } from "@/db/schema";
export async function GET(req: NextRequest) {
  try {
    const test = await db.query.tests.findMany({
      with: {
        questions: true,
      },
    });

    return NextResponse.json({ tests: test }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: { message: "Internal Server Error" },
      },
      { status: 500 }
    );
  }
}
