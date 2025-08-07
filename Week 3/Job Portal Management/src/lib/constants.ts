const API_MESSAGES = {
  USER: {
    ADD_SUCCESS: "User added successfully",
    ADD_ERROR: "Error in adding User",
    ALREADY_EXISTS: "User already exists, please logIn",
    NOT_FOUND: "User not found",
  },
  COMPANY: {
    ADD_SUCCESS: "Company added successfully",
    ADD_ERROR: "Error in adding company",
    NOT_FOUND: "Company not found",
    ALREADY_EXISTS:
      "Company already exists or A company is already created by the user",
  },
  APPLICATION: {
    ADD_SUCCESS: "Application added successfully",
    ADD_ERROR: "Error in adding Application",
    NOT_FOUND: "Application not found",
    ALREADY_EXISTS: "Application already exists",
  },
  JOB: {
    ADD_SUCCESS: "Job added successfully",
    ADD_ERROR: "Error in adding Job",
    NOT_FOUND: "Job not found",
    ALREADY_EXISTS: "Job already exists",
  },

  LOGIN: {
    SUCCESS: "Logged In successfully",
    ERROR: "Error in login",
  },
  DATA: {
    FETCH_SUCCESS: "Data fetched successfully",
    FETCH_ERROR: "Error in fetching data",

    UPDATE_SUCCESS: "Data updated successfully",
    UPDATE_ERROR: "Error in updating data",

    DELETE_SUCCESS: "Data deletd successfully",
    DELETE_ERROR: "Error in deleting data",

    NOT_FOUND: "No data found",
  },
  AUTH: {
    INVALID_TOKEN: "Invalid Token or Expired token. Please logIn again",
    UNAUTHORIZED: "Unauthorized User",
    INVALID_CREDENTAILS: "Invalid credentials",
  },
  VALIDATION: {
    ZOD_ERROR: "Zod validation error",
  },
};

export default API_MESSAGES;
