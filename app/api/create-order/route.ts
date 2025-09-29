// app/api/create-order/route.ts
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import prisma from "@/lib/prisma";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn("Razorpay keys missing in env");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

// Secure server-side price validation
const VALID_TICKET_PRICES: Record<string, number> = {
  REGULAR: 1500,
  COUPLES: 2499,
  VIP: 5999,
  VVIP: 9999,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ticketTier } = body;
    const metadata = body.metadata || {};
    const customerName = metadata.customerName ?? null;
    const customerEmail = metadata.customerEmail ?? null;
    const customerPhone = metadata.customerPhone ?? null;

    // Validate ticket tier
    if (!ticketTier || !VALID_TICKET_PRICES[ticketTier]) {
      return NextResponse.json(
        { error: "Invalid ticket tier" },
        { status: 400 }
      );
    }

    // Get the secure server-side price
    const amountINR = VALID_TICKET_PRICES[ticketTier];
    const amountPaise = Math.round(amountINR * 100); // store in paise

    const options = {
      amount: amountPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1, // auto-capture; set 0 for manual capture
      notes: {
        createdBy: "nextjs-app",
        ticketTier: ticketTier,
        customerName: customerName || "N/A",
      },
    };

    const order = await razorpay.orders.create(options);

    // Persist a PENDING booking with order id, tier, and customer details
    await prisma.booking.create({
      data: {
        orderId: order.id,
        amount: amountPaise,
        currency: order.currency,
        status: "PENDING",
        ticketTier: ticketTier,
        customerName,
        customerEmail,
        customerPhone,
        metadata,
      },
    });

    return NextResponse.json({ order, key_id: process.env.RAZORPAY_KEY_ID });
  } catch (err: unknown) {
    console.error("create-order error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Order creation failed", details: errorMessage },
      { status: 500 }
    );
  }
}
