"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { applyLeaveSchema } from "@/app/lib/schemas/auth";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Field, Form, Formik } from "formik";
import { Button, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import { useSession } from "next-auth/react";
import { applyLeave } from "@/app/lib/services/user/user";
import { useEffect, useState } from "react";
import { getFacultyHodList } from "@/app/lib/services/student/student";
import { getHodList } from "@/app/lib/services/faculty/faculty";

interface ApplyLeaveFormValues {
  reason: string;
  requestTo: number;
  leaveType: string;
  dateRange: [Date | null, Date | null] | null;
}

const ApplyLeave: React.FC = () => {
  const { data: session } = useSession();
  const role = session.user.role;
  const [requestToUserList, setRequestToUserList] = useState([]);
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
        startDate: values.dateRange[0].toISOString(),
        endDate: values.dateRange[1].toISOString(),
        leaveType: values.leaveType,
        reason: values.reason,
        requestToId: Number(values.requestTo),
      };

      const result = await applyLeave(leaveData, session.accessToken);

      if (result.success) {
        toast.success(
          result.message || "Leave application submitted successfully!"
        );
      } else {
        toast.error(result.error || "Failed to submit leave application");
      }
    } catch (error) {
      toast.error("Failed to submit leave application");
      console.error("Error submitting leave:", error);
    }

    setSubmitting(false);
  };

  const initialValues = {
    reason: "",
    requestTo: "",
    leaveType: "",
    dateRange: [null, null],
  };

  useEffect(() => {
    const fetchRequestToUserList = async () => {
      try {
        const response =
          role === "Student"
            ? await getFacultyHodList(session.accessToken)
            : await getHodList(session.accessToken);
        setRequestToUserList([...response]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRequestToUserList();
  }, []);

  useEffect(() => {}, [requestToUserList]);

  return (
    <div>
      <div>Apply leave</div>

      <div className="container mx-auto w-[50%] flex flex-col justify-center items-center gap-5">
        <p className="text-3xl">Apply leave form</p>
        <Formik
          initialValues={initialValues}
          validationSchema={applyLeaveSchema}
          onSubmit={handleApplyLeave}
          enableReinitialize={true}
        >
          {({ errors, touched, isSubmitting, setFieldValue, values }) => (
            <Form className="flex flex-col gap-3 w-[60%]">
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

              <div>
                <InputLabel id="requestTo-label">
                  Select Faculty or Hod:
                </InputLabel>
                <Field
                  as={Select}
                  labelId="requestTo-label"
                  name="requestTo"
                  fullWidth
                  error={touched.requestTo && Boolean(errors.requestTo)}
                >
                  <MenuItem value="" disabled>
                    Select Faculty or Hod type
                  </MenuItem>

                  {requestToUserList.map(
                    (user: { id: number; name: string }) => {
                      return (
                        <MenuItem value={user.id} key={user.id}>
                          {user.name}
                        </MenuItem>
                      );
                    }
                  )}
                </Field>
                {touched.requestTo && errors.requestTo && (
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    {errors.requestTo}
                  </div>
                )}
              </div>

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
                <p>
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
