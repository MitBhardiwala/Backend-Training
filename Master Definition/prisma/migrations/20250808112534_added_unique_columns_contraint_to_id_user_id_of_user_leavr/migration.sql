/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `UserLeave` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserLeave_id_userId_key" ON "public"."UserLeave"("id", "userId");
