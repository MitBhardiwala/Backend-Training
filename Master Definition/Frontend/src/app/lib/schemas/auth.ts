import * as Yup from "yup";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

export const registerSchema = Yup.object({
  name: Yup.string().trim().min(1, "Name cannot be empty").required("Required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  image: Yup.mixed()
    .nullable()
    .test("fileSize", "File too large", function (value) {
      if (!value || typeof value === "string") return true;
      return value.size <= MAX_FILE_SIZE;
    })
    .test("fileType", "Unsupported file format", function (value) {
      if (!value || typeof value === "string") return true;
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .required(),
  gender: Yup.string()
    .min(2, "Gender required")
    .required("Please select gender"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  address: Yup.string().trim().min(1, "Address cannot be empty").required(),
  department: Yup.string().trim().min(1, "Department cannot be empty"),
  class: Yup.string().trim().min(1, "Class cannot be empty"),
  grNumber: Yup.string().trim().min(1, "grNumber cannot be empty"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  otp: Yup.string()
    .matches(/^\d{4}$/, "Otp must be exactly 4 digits")
    .required("Otp is required"),
});

export const emailSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
});

export const applyLeaveSchema = Yup.object({
  reason: Yup.string().min(1, "Reason cannot be empty").required("Required"),
  leaveType: Yup.string().required("Please select leave type"),
  requestTo: Yup.string().required("Please select the faculy"),
  dateRange: Yup.array()
    .of(Yup.date().nullable())
    .required("Date range is required")
    .test("is-valid-range", "End date must be after start date", (value) => {
      if (value && value[0] && value[1]) {
        return value[1] >= value[0];
      }
      return true;
    }),
});

export const updateProfileSchema = Yup.object({
  name: Yup.string().trim().min(1, "Name cannot be empty").required("Required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
  image: Yup.mixed()
    .nullable()
    .test("fileSize", "File too large", function (value) {
      if (!value || typeof value === "string") return true;
      return value.size <= MAX_FILE_SIZE;
    })
    .test("fileType", "Unsupported file format", function (value) {
      if (!value || typeof value === "string") return true;
      return SUPPORTED_FORMATS.includes(value.type);
    }),
  gender: Yup.string()
    .min(2, "Gender required")
    .required("Please select gender"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  address: Yup.string()
    .trim()
    .min(1, "Address cannot be empty")
    .required("Address is required"),
  department: Yup.string().trim().nullable(),
  class: Yup.string().trim().min(1, "Class cannot be empty").optional(),
  grNumber: Yup.string().min(1, "Gr Number cannot be less than 0").optional(),
});
