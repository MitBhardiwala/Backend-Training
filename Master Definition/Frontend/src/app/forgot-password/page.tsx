"use client";

import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { emailSchema, forgotPasswordSchema } from "../schemas/auth";
import { toast } from "react-toastify";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { sendOtp, verifyOtp } from "../lib/services/auth/forgotPassword";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [isOtpSent, setIsOtpSent] = useState(false);

  return (
    <div className="container mx-auto h-screen w-[50%] flex flex-col justify-center items-center gap-5">
      <p className="text-3xl">Forgot password form</p>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          otp: "",
        }}
        validationSchema={isOtpSent ? forgotPasswordSchema : emailSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (isOtpSent) {
            const result = await verifyOtp(values);

            if (result.success) {
              toast.success(result.message);
              router.push("/login");
            } else {
              toast.error(result.error);
            }
          } else {
            const result = await sendOtp(values.email);

            if (result.success) {
              toast.success(result.message);
              setIsOtpSent(true);
            } else {
              toast.error(result.error);
            }
          }
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-3 w-[60%]">
            <label htmlFor="email">Enter your registered email address:</label>
            <Field
              as={TextField}
              name="email"
              type="text"
              label="Email"
              variant="outlined"
              fullWidth
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            {isOtpSent && (
              <>
                <Field
                  as={TextField}
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Field
                  as={TextField}
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                <Field
                  as={TextField}
                  type="number"
                  name="otp"
                  label="Otp"
                  variant="outlined"
                  fullWidth
                  error={touched.otp && Boolean(errors.otp)}
                  helperText={touched.otp && errors.otp}
                />
              </>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isOtpSent ? "Confirm Password" : "Send Otp"}
            </Button>
          </Form>
        )}
      </Formik>

      <Link href="/login">
        <Button variant="contained" color="secondary">
          Login
        </Button>
      </Link>
    </div>
  );
};

export default ForgotPasswordPage;
