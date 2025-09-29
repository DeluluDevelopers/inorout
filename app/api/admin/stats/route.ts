// app/api/admin/stats/route.ts
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ||
    "your-super-secret-jwt-key-change-this-in-production"
);

// Middleware to verify admin token
async function verifyAdminToken(request: Request): Promise<boolean> {
  try {
    const authHeader = request.headers.get("authorization");
    const cookieHeader = request.headers.get("cookie");

    let token = null;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else if (cookieHeader) {
      const cookies = cookieHeader.split(";");
      const adminCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("admin-token=")
      );
      if (adminCookie) {
        token = adminCookie.split("=")[1];
      }
    }

    if (!token) return false;

    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}

export async function GET(req: Request) {
  try {
    // Verify admin authentication
    if (!(await verifyAdminToken(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get overall statistics
    const [
      totalBookings,
      confirmedBookings,
      pendingBookings,
      failedBookings,
      confirmedBookingsWithAmounts,
    ] = await Promise.all([
      // Total bookings count
      prisma.booking.count(),

      // Confirmed bookings count
      prisma.booking.count({
        where: { status: "CONFIRMED" },
      }),

      // Pending bookings count
      prisma.booking.count({
        where: { status: "PENDING" },
      }),

      // Failed bookings count
      prisma.booking.count({
        where: { status: "FAILED" },
      }),

      // Get confirmed bookings with amounts for revenue calculation
      prisma.booking.findMany({
        where: { status: "CONFIRMED" },
        select: { amount: true },
      }),
    ]);

    // Calculate total revenue (convert from paise to rupees)
    const totalRevenue = confirmedBookingsWithAmounts.reduce(
      (sum, booking) => sum + booking.amount / 100,
      0
    );

    return NextResponse.json({
      totalBookings,
      confirmedBookings,
      pendingBookings,
      failedBookings,
      totalRevenue: Math.round(totalRevenue), // Round to avoid decimal issues
    });
  } catch (err: unknown) {
    console.error("admin/stats error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch stats", details: errorMessage },
      { status: 500 }
    );
  }
}
