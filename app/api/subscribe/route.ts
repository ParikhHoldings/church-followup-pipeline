import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, product } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
    const BEEHIIV_PUB_ID = process.env.BEEHIIV_PUB_ID;

    if (!BEEHIIV_API_KEY || !BEEHIIV_PUB_ID) {
      return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
    }

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: product || "church-followup-pipeline",
          utm_medium: "lead-magnet",
          utm_campaign: "church-followup-pipeline",
          custom_fields: [
            {
              name: "product",
              value: product || "church-followup-pipeline",
            },
          ],
        }),
      }
    );

    if (!res.ok && res.status !== 400) {
      const err = await res.text();
      console.error("Beehiiv error:", err);
      return NextResponse.json({ message: "Subscription failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
