import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();

  const responseLogin = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    }
  );
  const data = await responseLogin.json();

  return NextResponse.json(data);
}
