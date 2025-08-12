import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be 6 characters long"),
  role: z.enum(["APPLICANT", "RECRUITER"]).optional(),
});

export const loginUserSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be 6 characters long"),
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty").optional(),
  email: z.email("Invalid email address").optional(),
  password: z.string().min(6, "Password must be 6 characters long").optional(),
  role: z.enum(["APPLICANT", "RECRUITER"]).optional(),
});

export const createCompanySchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty"),
  industry: z.string().trim().min(1, "industry cannot be empty"),
});

export const updateCompanySchema = z
  .object({
    name: z.string().trim().min(1, "Name cannot be empty").optional(),
    industry: z.string().trim().min(1, "industry cannot be empty").optional(),
    userId: z.string().min(1, "User id cannot be empty").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Body cannot be empty.",
  });

export const createJobSchema = z
  .object({
    title: z.string().trim().min(1, "Title cannot be empty"),
    description: z.string().trim().min(1, "industry cannot be empty"),
    location: z.string().trim().min(1, "Location cannot be empty"),
    salaryMin: z.number().min(1, "Minimum Salary cannot be negative"),
    salaryMax: z.number().min(1, "Maximum Salary cannot be negative"),
  })
  .refine((data) => data.salaryMin <= data.salaryMax, {
    message: "Maximum salarssy should not be greater than minimum salary",
    path: ["salaryMin"],
  });

export const createApplicationSchema = z.object({
  jobId: z.number().min(1, "Job Id cannot be negative"),
  coverLetter: z.string().trim().min(1, "Cover letter cannot be empty"),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).optional(),
});
