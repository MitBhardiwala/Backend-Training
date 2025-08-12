-- DropForeignKey
ALTER TABLE "public"."LeaveRequest" DROP CONSTRAINT "LeaveRequest_requestToId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LeaveRequest" DROP CONSTRAINT "LeaveRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserLeave" DROP CONSTRAINT "UserLeave_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."LeaveRequest" ADD CONSTRAINT "LeaveRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LeaveRequest" ADD CONSTRAINT "LeaveRequest_requestToId_fkey" FOREIGN KEY ("requestToId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserLeave" ADD CONSTRAINT "UserLeave_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
