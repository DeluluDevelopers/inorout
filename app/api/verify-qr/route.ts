// app/api/verify-qr/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { qrData } = body;

    if (!qrData) {
      return NextResponse.json({ error: "QR data required" }, { status: 400 });
    }

    let parsedData;
    try {
      parsedData = JSON.parse(qrData);
    } catch (e) {
      return NextResponse.json({ error: "Invalid QR format" }, { status: 400 });
    }

    const { bookingId, orderId, hash } = parsedData;

    if (!bookingId || !orderId || !hash) {
      return NextResponse.json(
        { error: "Missing QR data fields" },
        { status: 400 }
      );
    }

    // Verify the booking exists and is confirmed
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(bookingId) },
    });

    if (
      !booking ||
      booking.orderId !== orderId ||
      booking.status !== "CONFIRMED"
    ) {
      return NextResponse.json(
        {
          valid: false,
          message: "Invalid or unconfirmed booking",
        },
        { status: 400 }
      );
    }

    // Verify the hash to prevent tampering
    const expectedHash = crypto
      .createHash("sha256")
      .update(
        `${booking.id}-${booking.orderId}-${process.env.RAZORPAY_KEY_SECRET}`
      )
      .digest("hex")
      .substring(0, 16);

    if (hash !== expectedHash) {
      return NextResponse.json(
        {
          valid: false,
          message: "QR code tampered or invalid",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      message: "Valid ticket",
      booking: {
        id: booking.id,
        customerName: booking.customerName,
        ticketTier: booking.ticketTier,
        amount: booking.amount / 100, // Convert back to rupees
        createdAt: booking.createdAt,
      },
    });
  } catch (err: any) {
    console.error("verify-qr error:", err);
    return NextResponse.json(
      { error: "QR verification failed" },
      { status: 500 }
    );
  }
}
