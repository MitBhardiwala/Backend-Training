/*
  Warnings:

  - You are about to drop the column `course_id` on the `Enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `Enrollments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId,courseId]` on the table `Enrollments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseId` to the `Enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Enrollments` table without a default value. This is not possible if the table is not empty.

*/

-- AlterTable
ALTER TABLE "public"."Enrollments"
RENAME COLUMN "student_id" TO "studentId";


ALTER TABLE "public"."Enrollments" 
RENAME COLUMN "course_id" TO "courseId";
