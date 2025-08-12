-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "verificationOtp" TEXT,
ADD COLUMN     "verificationOtpExpires" TIMESTAMP(3);
