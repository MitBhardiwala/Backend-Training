"use client";

import { LeaveRequestType } from "@/app/lib/definitions";
import { getDaysDifference } from "@/app/lib/utils";
import { Button, Popover } from "@mui/material";
import { useState } from "react";

export default function LeaveRequestCard({
  leaveRequest,
  handleLeaveStatusChange,
}: {
  leaveRequest: LeaveRequestType;
  handleLeaveStatusChange: (
    newStatus: string,
    leaveId: number,
    requestedUserId: number
  ) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-100";
    }
  };

  const handleApprove = () => {
    handleLeaveStatusChange(
      "approved",
      leaveRequest.id,
      leaveRequest.RequestedBy.id
    );
  };

  const handleReject = () => {
    handleLeaveStatusChange(
      "rejected",
      leaveRequest.id,
      leaveRequest.RequestedBy.id
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {leaveRequest.RequestedBy.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3>{leaveRequest.RequestedBy.name}</h3>
              <p>{leaveRequest.RequestedBy.email}</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>Start Date</p>
              <p>{new Date(leaveRequest.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p>End Date</p>
              <p>{new Date(leaveRequest.endDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p>Duration</p>
              <p>
                {getDaysDifference(
                  leaveRequest.startDate,
                  leaveRequest.endDate
                )}{" "}
                days
              </p>
            </div>
            <div>
              <p>Leave Type</p>
              <p className="font-medium">{leaveRequest.leaveType}</p>
            </div>
          </div>
          <div className="mt-4">
            <p>Reason</p>
            <p className="mt-1">{leaveRequest.reason}</p>
          </div>
        </div>

        <div className="lex flex-col items-end gap-4">
          <div className="relative">
            <span
              className={`px-3 py-1 rounded-full font-medium border ${getStatusStyle(
                leaveRequest.status
              )}`}
            >
              {leaveRequest.status}
            </span>
          </div>

          {leaveRequest.status === "pending" && (
            <div className="mt-2">
              <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
              >
                Change Status
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <button
                  onClick={handleApprove}
                  className="w-full text-left px-4 py-2 text-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={handleReject}
                  className="w-full text-left px-4 py-2 text-red-700"
                >
                  Reject
                </button>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
