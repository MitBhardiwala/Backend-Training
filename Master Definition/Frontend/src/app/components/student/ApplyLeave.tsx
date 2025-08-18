"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { applyLeaveSchema } from "@/app/schemas/auth";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Field, Form, Formik } from "formik";
import { Button, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import { useSession } from "next-auth/react";
import { applyLeave } from "@/app/lib/services/user/user";

// Type definitions for Apply Leave form
interface ApplyLeaveFormValues {
  reason: string;
  requestTo: number;
  leaveType: string;
  dateRange: [Date | null, Date | null] | null;
}

const ApplyLeave: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleApplyLeave = async (
    values: ApplyLeaveFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ): Promise<void> => {
    if (!session?.user?.id || !session?.accessToken) {
      toast.error("User session not found. Please login again.");
      setSubmitting(false);
      return;
    }

    if (!values.dateRange || !values.dateRange[0] || !values.dateRange[1]) {
      toast.error("Please select a valid date range");
      setSubmitting(false);
      return;
    }

    try {
      const leaveData = {
        startDate: values.dateRange[0].toISOString(), // Full ISO-8601 DateTime format
        endDate: values.dateRange[1].toISOString(), // Full ISO-8601 DateTime format
        leaveType: values.leaveType,
        reason: values.reason,
        requestToId: Number(values.requestTo), // Assuming this is the user ID
      };

      const result = await applyLeave(leaveData, session.accessToken);

      if (result.success) {
        toast.success(
          result.message || "Leave application submitted successfully!"
        );
        // Reset form or perform any other action needed
      } else {
        toast.error(result.error || "Failed to submit leave application");
      }
    } catch (error) {
      toast.error("Failed to submit leave application");
      console.error("Error submitting leave:", error);
    }

    setSubmitting(false);
  };

  const initialValues: ApplyLeaveFormValues = {
    reason: "",
    requestTo: "",
    leaveType: "",
    dateRange: [null, null],
  };

  return (
    <div>
      <div>Apply leave</div>
      <div className="container mx-auto w-[50%] flex flex-col justify-center items-center gap-5">
        <p className="text-3xl">Apply leave form</p>
        <Formik
          initialValues={initialValues}
          validationSchema={applyLeaveSchema}
          onSubmit={handleApplyLeave}
        >
          {({ errors, touched, isSubmitting, setFieldValue, values }) => (
            <Form className="flex flex-col gap-3 w-[60%]">
              {/* Reason Field */}
              <Field
                as={TextField}
                name="reason"
                type="text"
                label="Reason"
                variant="outlined"
                fullWidth
                error={touched.reason && Boolean(errors.reason)}
                helperText={touched.reason && errors.reason}
              />

              {/* Request To Field */}
              <Field
                as={TextField}
                name="requestTo"
                type="text"
                label="Request To"
                variant="outlined"
                fullWidth
                error={touched.requestTo && Boolean(errors.requestTo)}
                helperText={touched.requestTo && errors.requestTo}
              />

              {/* Leave Type Select Field */}
              <div>
                <InputLabel id="leaveType-label">Select Leave Type:</InputLabel>
                <Field
                  as={Select}
                  labelId="leaveType-label"
                  name="leaveType"
                  fullWidth
                  error={touched.leaveType && Boolean(errors.leaveType)}
                >
                  <MenuItem value="" disabled>
                    Select leave type
                  </MenuItem>
                  <MenuItem value="firstHalf">First Half</MenuItem>
                  <MenuItem value="secondHalf">Second Half</MenuItem>
                  <MenuItem value="fullDay">Full Day</MenuItem>
                </Field>
                {touched.leaveType && errors.leaveType && (
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    {errors.leaveType}
                  </div>
                )}
              </div>

              {/* Date Range Picker - Handled explicitly with proper error handling */}
              <div>
                <InputLabel>Select Date Range:</InputLabel>
                <DateRangePicker
                  value={values.dateRange}
                  format="MM/dd/yyyy"
                  onChange={(date) => setFieldValue("dateRange", date)}
                  style={{ width: "100%" }}
                />
                {touched.dateRange && errors.dateRange && (
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    {typeof errors.dateRange === "string"
                      ? errors.dateRange
                      : "Please select a valid date range"}
                  </div>
                )}
                <p style={{ fontSize: "0.875rem", marginTop: "5px" }}>
                  Selected Date Range:{" "}
                  {values.dateRange &&
                  values.dateRange[0] &&
                  values.dateRange[1]
                    ? `${values.dateRange[0]?.toDateString()} - ${values.dateRange[1]?.toDateString()}`
                    : "None"}
                </p>
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Apply leave
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ApplyLeave;
