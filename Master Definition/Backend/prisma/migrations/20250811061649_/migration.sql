/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserLeave` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."UserLeave_id_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserLeave_userId_key" ON "public"."UserLeave"("userId");
