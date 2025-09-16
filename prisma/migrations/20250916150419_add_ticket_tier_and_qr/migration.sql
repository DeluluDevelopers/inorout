-- CreateEnum
CREATE TYPE "public"."TicketTier" AS ENUM ('REGULAR', 'VIP', 'VVIP');

-- AlterTable
ALTER TABLE "public"."Booking" ADD COLUMN     "qrCode" TEXT,
ADD COLUMN     "ticketTier" "public"."TicketTier" NOT NULL DEFAULT 'REGULAR';
