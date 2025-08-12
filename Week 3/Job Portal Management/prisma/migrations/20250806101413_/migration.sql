/*
  Warnings:

  - A unique constraint covering the columns `[title,companyId]` on the table `Job` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Job_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Job_title_companyId_key" ON "public"."Job"("title", "companyId");
