-- RenameForeignKey
ALTER TABLE "public"."Course" RENAME CONSTRAINT "Course_category_id_fkey" TO "Course_categoryId_fkey";

-- RenameForeignKey
ALTER TABLE "public"."Course" RENAME CONSTRAINT "Course_instructor_id_fkey" TO "Course_instructorId_fkey";
