import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("tx");

  let membership;
  let transaksi;

  const responseProfile = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/auth/mitra/profile`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-store",
      credentials: "include",
    }
  );
  const profile = await responseProfile.json();

  if (profile.data?.id_membership) {
    const responseMembership = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/membership/member/${profile.data?.id_membership}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        cache: "no-store",
        credentials: "include",
      }
    );
    membership = await responseMembership.json();
  }

  if (membership.data.id_transaksi) {
    const responseTransaksi = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/finance/transaksi/${membership.data.id_transaksi}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        cache: "no-store",
        credentials: "include",
      }
    );
    transaksi = await responseTransaksi.json();
  }

  return NextResponse.json({
    status: 200,
    success: true,
    profile: profile.data,
    membership: membership.data,
    transaksi: transaksi.data,
  });
}
