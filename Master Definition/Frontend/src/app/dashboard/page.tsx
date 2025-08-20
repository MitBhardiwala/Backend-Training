"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import FacultyDashboard from "../components/dashboard/FacultyDashboard";
import HodDashboard from "../components/dashboard/HodDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";

const DashBoard = () => {
  const { data: session, status } = useSession();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (session && session.user && session.user.role) {
      setRole(session.user.role);
    }
  }, [session]);

  if (status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );

  if (!session)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">No session token found</div>
      </div>
    );
  if (!session.user.department && session.user.role!=="Admin")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">No department has been assigned, contact admin</div>
      </div>
    );
  
  const RenderDashBoard = () => {
    switch (role) {
      case "Student":
        return <StudentDashboard />;
      case "Faculty":
        return <FacultyDashboard />;
      case "Hod":
        return <HodDashboard />;
      case "Admin":
        return <AdminDashboard />;
      default:
        return <div>No user role found</div>;
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h1>
          <RenderDashBoard />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
