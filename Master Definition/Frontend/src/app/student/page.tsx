import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/services/auth/auth.js";
import StudentLeave from "../components/student/StudentLeave.tsx";
import LeaveHistory from "../components/student/LeaveHistory.tsx";
import ApplyLeave from "../components/student/ApplyLeave.tsx";

const StudentPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <p>Student page</p>
      <p>{session.user.name}</p>

      <StudentLeave userId={session.user.id} />
      <LeaveHistory />
      <ApplyLeave/>
    </>
  );
};

export default StudentPage;
