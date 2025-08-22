"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { fetchStudentsList } from "../lib/services/student/student";
import { useSession } from "next-auth/react";
import { getAllUsers } from "../lib/services/user/user";

export default function Manage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    if (session && session.user.role) {
      try {
        const response = await getAllUsers(session.accessToken, role);

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }, [session, role]);

  useEffect(() => {
    if (session) {
      fetchUsers();
    }
  }, [session, fetchUsers]);

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

  if (!role)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">No role found</div>
      </div>
    );

  return (
    <div>
      <h1>Dashboard Page</h1>
      {role === "admin" ? (
        <p>Welcome, Admin!</p>
      ) : (
        <p>Welcome, {role || "Guest"}!</p>
      )}
    </div>
  );
}
