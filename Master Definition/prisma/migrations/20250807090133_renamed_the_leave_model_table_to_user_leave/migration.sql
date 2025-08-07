/*
  Warnings:

  - You are about to drop the `LeaveModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."LeaveModel" DROP CONSTRAINT "LeaveModel_user_id_fkey";

-- DropTable
DROP TABLE "public"."LeaveModel";

-- CreateTable
CREATE TABLE "public"."UserLeave" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "total_leave" INTEGER NOT NULL,
    "available_leave" INTEGER NOT NULL,
    "used_leave" INTEGER NOT NULL,
    "academic_year" TEXT NOT NULL,
    "total_working_days" INTEGER NOT NULL,
    "attendance_percentage" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserLeave_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."UserLeave" ADD CONSTRAINT "UserLeave_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
