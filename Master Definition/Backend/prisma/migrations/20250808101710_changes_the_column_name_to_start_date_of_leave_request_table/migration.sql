/*
  Warnings:

  - You are about to drop the column `starDate` on the `LeaveRequest` table. All the data in the column will be lost.
  - Added the required column `startDate` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."LeaveRequest" DROP COLUMN "starDate",
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;
