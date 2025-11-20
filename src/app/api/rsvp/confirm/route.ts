import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: token tidak ditemukan" },
        { status: 401 }
      );
    }
    const { code } = await req.json();
    const res = await fetch(
      "https://api.mohaproject.dev/api/reservations/confirm",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      const response = NextResponse.json(
        { message: data.error || "Konfirmasi RSVP gagal" },
        { status: res.status }
      );
      if (res.status === 401) {
        response.cookies.delete("token");
      }
      return response;
    }
    return NextResponse.json(
      {
        message: "Kehadiran anda telah tersimpan. Terima kasih!",
        data: data.data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
