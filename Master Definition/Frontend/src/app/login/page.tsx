"use client";

import { Field, Form, Formik } from "formik";
import { Button, TextField } from "@mui/material";
import { loginSchema } from "../schemas/auth";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="container mx-auto h-screen w-[50%] flex flex-col justify-center items-center gap-5">
        <p className="text-3xl">Login form</p>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const result = await signIn("credentials", {
              email: values.email,
              password: values.password,
              redirect: false,
            });

            if (result && result.error) {
              toast.error(result.error.split(":")[1]);
            } else {
              toast.success("Login successfull!");
              router.push("/");
            }
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="flex flex-col gap-3 w-[60%]">
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
        <Link href="/forgot-password">
          <Button variant="text">Forgot password</Button>
        </Link>
        <Link href="/register">
          <Button variant="contained" color="secondary">
            Create Account
          </Button>
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
