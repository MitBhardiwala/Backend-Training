"use client";

import { LeaveRequestType } from "@/app/lib/definitions";
import { getDaysDifference } from "@/app/lib/utils";
import { Box, Button, Menu, MenuItem, Modal, Typography } from "@mui/material";
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="w-full">
        <div className="flex border-gray-300 rounded-md border-1 items-center justify-around p-3">
          <div>
            <p>Applied By : {leaveRequest.RequestedBy.name}</p>
            <p>{leaveRequest.RequestedBy.email}</p>
          </div>
          <div>
            <p>Start Date: {leaveRequest.startDate.substring(0, 10)}</p>
            <p>End Date : {leaveRequest.endDate.substring(0, 10)}</p>
            <p>Leave Type: {leaveRequest.leaveType}</p>
            <p>Reason : {leaveRequest.reason}</p>
            <p>
              Duration :
              {getDaysDifference(leaveRequest.startDate, leaveRequest.endDate)}{" "}
              days
            </p>
          </div>
          <div>
            <p
              className={`px-2 py-1 rounded-full ${
                leaveRequest.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : leaveRequest.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {leaveRequest.status}
            </p>
            {leaveRequest.status === "pending" && (
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  Change Status
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "basic-button",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      handleLeaveStatusChange(
                        "approved",
                        leaveRequest.id,
                        leaveRequest.RequestedBy.id
                      );
                    }}
                  >
                    Approve
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      handleLeaveStatusChange(
                        "rejected",
                        leaveRequest.id,
                        leaveRequest.RequestedBy.id
                      );
                    }}
                  >
                    Reject
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
