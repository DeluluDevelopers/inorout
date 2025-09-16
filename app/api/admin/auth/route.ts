// app/api/admin/auth/route.ts
import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ||
    "your-super-secret-jwt-key-change-this-in-production"
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // Validate credentials against environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    console.log(username, adminUsername);
    console.log(password, adminPassword);

    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { error: "Admin credentials not configured" },
        { status: 500 }
      );
    }

    if (username !== adminUsername || password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token for session
    const token = await new SignJWT({ username: adminUsername, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
    });

    // Set secure HTTP-only cookie
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (err: unknown) {
    console.error("Admin auth error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Authentication failed", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  // Logout endpoint
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.delete("admin-token");
  return response;
}
