"use client";
// In your Next.js component (e.g., pages/index.js or a custom component)
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Import the default RSuite styless
import { applyLeaveSchema, loginSchema } from "@/app/schemas/auth";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ApplyLeave() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState(null); // Initialize with null or a default range

  return (
    <>
      <div>Apply leave</div>
      <div className="container mx-auto w-[50%] flex flex-col justify-center items-center gap-5">
        <p className="text-3xl">Apply leave form</p>
        <Formik
          initialValues={{
            reason: "",
            requestTo: "",
            leaveType: "",
            dateRange: [null, null],
          }}
          validationSchema={applyLeaveSchema}
          onSubmit={async (values, { setSubmitting }) => {
            console.log(values);
            // const result = await signIn("credentials", {
            //   email: values.email,
            //   password: values.password,
            //   redirect: false,
            // });

            // if (result && result.error) {
            //   toast.error(result.error.split(":")[1]);
            // } else {
            //   toast.success("Login successfull!");
            //   router.push("/");
            // }
            setSubmitting(false);
          }}
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
              <Field
                as={TextField}
                type="text"
                name="requestTo"
                label="Request To"
                variant="outlined"
                fullWidth
                error={touched.requestTo && Boolean(errors.requestTo)}
                helperText={touched.requestTo && errors.requestTo}
              />
              <p>
                Selected Date Range:{" "}
                {dateRange
                  ? `${dateRange[0]?.toDateString()} - ${dateRange[1]?.toDateString()}`
                  : "None"}
              </p>
              <DateRangePicker
                value={values.dateRange}
                format="MM/dd/yyyy"
                onChange={(date) => setFieldValue("dateRange", date)}
              />
              {touched.dateRange && errors.dateRange && (
                <div style={{ color: "red" }}>{errors.dateRange}</div>
              )}
              <FormControl
                component="fieldset"
                error={touched.leaveType && Boolean(errors.leaveType)}
              >
                <FormLabel component="legend">Leave Type:</FormLabel>
                <Field name="leaveType">
                  {({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="firstHalf"
                        control={<Radio />}
                        label="First Half"
                      />
                      <FormControlLabel
                        value="secondHalf"
                        control={<Radio />}
                        label="Second Half"
                      />
                      <FormControlLabel
                        value="fullDay"
                        control={<Radio />}
                        label="Full Day"
                      />
                    </RadioGroup>
                  )}
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  style={{ color: "red" }}
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
