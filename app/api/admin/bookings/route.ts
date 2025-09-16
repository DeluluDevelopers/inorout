// app/api/admin/bookings/route.ts
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
    const token = request.headers
      .get("cookie")
      ?.split("; ")
      .find((row) => row.startsWith("admin-token="))
      ?.split("=")[1];

    if (!token) return false;

    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  try {
    // Verify admin authentication
    if (!(await verifyAdminToken(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    // Pagination parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Filter parameters
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const ticketTier = searchParams.get("ticketTier") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Build where clause for filtering
    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { customerName: { contains: search, mode: "insensitive" } },
        { customerEmail: { contains: search, mode: "insensitive" } },
        { customerPhone: { contains: search, mode: "insensitive" } },
        { orderId: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) {
      whereClause.status = status;
    }

    if (ticketTier) {
      whereClause.ticketTier = ticketTier;
    }

    // Get total count for pagination
    const totalBookings = await prisma.booking.count({
      where: whereClause,
    });

    // Get bookings with pagination and filtering
    const bookings = await prisma.booking.findMany({
      where: whereClause,
      orderBy: {
        [sortBy]: sortOrder as "asc" | "desc",
      },
      skip,
      take: limit,
      select: {
        id: true,
        orderId: true,
        paymentId: true,
        amount: true,
        currency: true,
        status: true,
        ticketTier: true,
        customerName: true,
        customerEmail: true,
        customerPhone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Calculate pagination info
    const totalPages = Math.ceil(totalBookings / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return NextResponse.json({
      bookings: bookings.map((booking) => ({
        ...booking,
        amount: booking.amount / 100, // Convert paise to rupees for display
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalBookings,
        hasNext,
        hasPrev,
        limit,
      },
    });
  } catch (err: unknown) {
    console.error("Admin bookings error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch bookings", details: errorMessage },
      { status: 500 }
    );
  }
}
