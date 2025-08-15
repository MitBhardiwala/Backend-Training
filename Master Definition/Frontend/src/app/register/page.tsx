"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { registerSchema } from "../schemas/auth";
import { toast } from "react-toastify";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Link from "next/link";
import { handleRegister } from "../lib/services/auth/register";

const RegisterPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="container mx-auto h-screen w-[50%] flex flex-col justify-center items-center gap-5">
        <p className="text-3xl">Register form</p>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            gender: "",
            image: "",
            phone: "",
            address: "",
            department: "",
            class: "",
          }}
          validationSchema={registerSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const result = await handleRegister(values);
            if (result.success) {
              toast.success(result.message);
              router.push("/");
            } else {
              toast.error(result.error);
            }

            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col gap-3 w-[60%]">
              <Field
                as={TextField}
                name="name"
                type="text"
                label="Name"
                variant="outlined"
                fullWidth
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
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
              <Field
                as={TextField}
                type="number"
                name="phone"
                label="Phone"
                variant="outlined"
                fullWidth
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />
              <label htmlFor="myFile">Upload File:</label>
              <input
                id="myFile"
                name="image"
                type="file"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (
                    event.currentTarget.files &&
                    event.currentTarget.files[0]
                  ) {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }
                }}
              />
              <ErrorMessage name="image" component="div" />
              <Field
                as={TextField}
                type="text"
                name="address"
                label="Address"
                variant="outlined"
                fullWidth
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
              />
              <Field
                as={TextField}
                type="text"
                name="class"
                label="Class"
                variant="outlined"
                fullWidth
                error={touched.class && Boolean(errors.class)}
                helperText={touched.class && errors.class}
              />
              <Field
                as={TextField}
                type="department"
                name="department"
                label="Department"
                variant="outlined"
                fullWidth
                error={touched.department && Boolean(errors.department)}
                helperText={touched.department && errors.department}
              />
              <InputLabel id="gender">Select Gender:</InputLabel>
              <Field
                as={Select}
                id="gender"
                name="gender"
                fullWidth
                error={touched.gender && Boolean(errors.gender)}
                helperText={touched.gender && errors.gender}
              >
                <MenuItem value="" disabled>
                  Select gender
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Field>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>

        <Link href="/login">
          <Button variant="contained" color="secondary">
            Sign in
          </Button>
        </Link>
      </div>
    </>
  );
};

export default RegisterPage;
