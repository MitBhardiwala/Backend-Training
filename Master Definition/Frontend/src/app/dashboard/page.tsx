"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import FacultyDashboard from "../components/dashboard/FacultyDashboard";

const DashBoard = () => {
  const { data: session, status } = useSession();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (session && session.user) {
      setRole(session.user.role);
    }
  }, [session]);

  if (status === "loading") return <div>Loading....</div>;
  if (!session) return <div>No session found</div>;

  const RenderDashBoard = () => {
    switch (role) {
      case "Student":
        return <StudentDashboard />;
      case "Faculty":
        return <FacultyDashboard />;
      default:
        return <div>No user role found</div>;
    }
  };

  return (
    <>
      <p>Welcome {session.user.email}</p>

      <RenderDashBoard />
    </>
  );
};

export default DashBoard;
