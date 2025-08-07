const API_MESSAGES = {
  USER: {
    REGISTER_SUCCESS: "User registered successfully",
    REGISTER_ERROR: "Error in registering User",

    LOGIN_SUCCESS: "User logged in successfully",
    LOGIN_ERROR: "Error in user login",

    ROLE_NOT_FOUND: "No role found, please enter correct role id",
    ALREADY_EXISTS: "User with same email already exists, enter new email",
    NOT_FOUND: "User not found",


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
    JOI_ERROR: "Joi validation error",
  },
};

export default API_MESSAGES;
