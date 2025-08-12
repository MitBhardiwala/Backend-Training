-- RenameForeignKey
ALTER TABLE "public"."Enrollments" RENAME CONSTRAINT "Enrollments_course_id_fkey" TO "Enrollments_courseId_fkey";

-- RenameForeignKey
ALTER TABLE "public"."Enrollments" RENAME CONSTRAINT "Enrollments_student_id_fkey" TO "Enrollments_studentId_fkey";

-- RenameIndex
ALTER INDEX "public"."Enrollments_student_id_course_id_key" RENAME TO "Enrollments_studentId_courseId_key";
