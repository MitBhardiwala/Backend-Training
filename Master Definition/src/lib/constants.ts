const API_MESSAGES = {
  USER: {
    REGISTER_SUCCESS: "User registered successfully",
    REGISTER_ERROR: "Error in registering User",

    LOGIN_SUCCESS: "User logged in successfully",
    LOGIN_ERROR: "Error in user login",

    ROLE_NOT_FOUND: "No role found, please enter correct role id",
    ALREADY_EXISTS: "User with same email already exists, enter new email",

    LEAVE_SUCCESS: "Applied for leave successfully",
    LEAVE_ERROR: "Error in applying leave",

    NOT_FOUND: "User not found",
    INVALID_ROLE_ID: "Invalid role id",
    INVALID_USER_ID: "Invalid user id",

    DEPARTMENT_NOT_ASSIGNED:
      "No department has been assigned, please contact admin",
    LEAVE_NOT_ALLOWED: "User has exceeded his/her total leaves qouta",
    DEPT_CONFLICT_ERROR:
      "Department conflict error",
  },

  LEAVE_REQUEST: {
    SUCCESS: "Leave Request approved",
    ERROR: "Error in approving leave request",

    DEPT_CONFLICT_ERROR:
      "Department conflict, Hod can only aprrove request of students of his/her department only ",

    NOT_FOUND: "No leave request found",
  },

  DATA: {
    FETCH_SUCCESS: "Data fetched successfully",
    FETCH_ERROR: "Error in fetching data",

    UPDATE_SUCCESS: "Data updated successfully",
    UPDATE_ERROR: "Error in updating data",

    DELETE_SUCCESS: "Data deletd successfully",
    DELETE_ERROR: "Error in deleting data",

    NOT_FOUND: "No data found",
    ID_NOT_FOUND: "Id not found",

    POPULATING_USER_LEAVE_ERROR: "Error in populating user leave table",
  },
  AUTH: {
    INVALID_TOKEN: "Invalid Token or Expired token. Please logIn again",
    UNAUTHORIZED: "Unauthorized User",
    INVALID_CREDENTAILS: "Invalid credentials",
  },
  VALIDATION: {
    JOI_ERROR: "Joi validation error",
    IMAGE_NOT_FOUND: "Image not found",
  },

  INTERNAL_SERVER_ERROR: "Internal server error",
};

export default API_MESSAGES;
