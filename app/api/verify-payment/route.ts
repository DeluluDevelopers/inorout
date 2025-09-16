// app/api/verify-payment/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import QRCode from "qrcode";
import prisma from "@/lib/prisma";

// Secure price validation
const VALID_TICKET_PRICES: Record<string, number> = {
  REGULAR: 2499,
  VIP: 5999,
  VVIP: 9999,
};

async function generateSecureQRCode(bookingData: any): Promise<string> {
  const qrData = {
    bookingId: bookingData.id,
    orderId: bookingData.orderId,
    customerName: bookingData.customerName,
    ticketTier: bookingData.ticketTier,
    eventDate: "2025-09-20", // Your event date
    timestamp: new Date().toISOString(),
    // Generate a hash to prevent tampering
    hash: crypto
      .createHash("sha256")
      .update(
        `${bookingData.id}-${bookingData.orderId}-${process.env.RAZORPAY_KEY_SECRET}`
      )
      .digest("hex")
      .substring(0, 16),
  };

  return await QRCode.toDataURL(JSON.stringify(qrData));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      metadata,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET as string;
    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expected !== razorpay_signature) {
      // mark booking failed (if exists)
      try {
        await prisma.booking.updateMany({
          where: { orderId: razorpay_order_id },
          data: { status: "FAILED", signature: razorpay_signature },
        });
      } catch (e) {
        // ignore if not found
      }
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }

    // Get the existing booking to validate ticket tier and amount
    const existingBooking = await prisma.booking.findUnique({
      where: { orderId: razorpay_order_id },
    });

    if (!existingBooking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    // Validate that the paid amount matches the expected price for the tier
    console.log(
      existingBooking.amount,
      VALID_TICKET_PRICES[existingBooking.ticketTier]
    );
    const expectedAmount =
      VALID_TICKET_PRICES[existingBooking.ticketTier] * 100; // in paise
    if (existingBooking.amount !== expectedAmount) {
      console.error(
        `Amount mismatch: expected ${expectedAmount}, got ${existingBooking.amount}`
      );
      await prisma.booking.updateMany({
        where: { orderId: razorpay_order_id },
        data: { status: "FAILED", signature: razorpay_signature },
      });
      return NextResponse.json(
        { success: false, message: "Amount validation failed" },
        { status: 400 }
      );
    }

    // Generate QR code for the confirmed booking
    const qrCodeData = await generateSecureQRCode(existingBooking);

    // Signature valid and amount validated -> update booking as CONFIRMED with QR code
    const updated = await prisma.booking.updateMany({
      where: { orderId: razorpay_order_id },
      data: {
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: "CONFIRMED",
        qrCode: qrCodeData,
        metadata: metadata ?? undefined,
      },
    });

    // TODO: Send confirmation email/SMS with QR code using your provider here (server-side).
    // Example: await sendEmail(customerEmail, 'Your ticket is confirmed', qrCodeData, ...)

    return NextResponse.json({
      success: true,
      message: "Payment verified — booking confirmed! QR code generated.",
      qrCode: qrCodeData,
    });
  } catch (err: any) {
    console.error("verify-payment error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
