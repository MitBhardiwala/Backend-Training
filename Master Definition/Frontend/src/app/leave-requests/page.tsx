"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getLeaveRequests } from "../lib/services/user/user";
import { toast } from "react-toastify";
import { LeaveRequestType } from "../lib/definitions";
import { getDaysDifference } from "../lib/utils";

export default function LeaveRequest() {
  const { data: session, status } = useSession();
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      if (session && session.user.role) {
        const result = await getLeaveRequests(
          session.accessToken,
          session.user.role
        );

        if (result.success) {
          setLeaveRequests(result.data);
        } else {
          console.log("Error : ", result);
        }
      }
    };

    fetchLeaveRequests();
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">No session token found</div>
      </div>
    );

  if (session.user.role !== "Hod" && session.user.role !== "Faculty")
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Unauthorized User</div>
      </div>
    );
  if (!session.user.department)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">
          No department has been assigned, please contact admin
        </div>
      </div>
    );

  return (
    <>
      <div>Leave Request Page</div>
      {leaveRequests.length > 0 && (
        <div className="flex flex-col justify-center items-center gap-2">
          {leaveRequests.map((request: LeaveRequestType) => (
            <div key={request.id} className="border-1">
              <p>{request.RequestedBy.name}</p>
              <p>{request.RequestedBy.email}</p>
              <p>{request.startDate}</p>
              <p>{request.endDate}</p>
              <p>{request.leaveType}</p>
              <p>{request.reason}</p>
              <p>{request.status}</p>
              <p>
                Duration :
                {getDaysDifference(request.startDate, request.endDate)} days
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
