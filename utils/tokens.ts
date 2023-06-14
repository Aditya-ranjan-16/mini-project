import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function generateToken(email: string): string {
  return jwt.sign({ email: email }, process.env.SECRET_TOKEN as string, {
    expiresIn: "1h",
  });
}

export async function verifyToken(
  token: string
): Promise<{ email: string; iat: number; exp: number }> {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN as string);
    return {
      email: (decoded as any).email,
      iat: (decoded as any).iat,
      exp: (decoded as any).exp,
    };
  } catch (err) {
    throw new Error("Invalid token");
  }
}
