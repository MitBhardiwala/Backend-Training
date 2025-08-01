const API_MESSAGES = {
  SUCCESS: {
    DATA_FETCHED: "Data has been fetched",
    NO_DATA_FOUND: "No Data found",
    DATA_UPDATED: "Data updated successfully",
    COURSE_ADDED: "Course added Successfully",
    INSTRUCTOR_ADDED: "Instructor Added successfully",
    DATA_DELETED: "Data has been deleted successfully",
    STUDENT_ADDED: "Student has been added successfully",
    CATEGORY_ADDED: "Category has been added successfully",
    ENROLLMENT_ADDED: "Enrollment has been added successfully",
    NO_CHANGES_MADE: "No changes made",
  },  
  ERROR: {
    DATA_NOT_FETCHED: "Error in fetching data",
    INSTRUCTOR_NOT_ADDED: "Error in adding instructor",
    STUDENT_NOT_ADDED: "Error in adding student",
    CATEGORY_NOT_ADDED: "Error in adding category",
    ENROLLMENT_NOT_ADDED: "Error in adding enrollment",
    COURSE_NOT_ADDED: "Error in adding course",
    DATA_NOT_UPDATED: "Error in updating data",
    DATA_NOT_DELETED: "Error in deleting data",
    VALIDATION_ERROR:{
      ZOD_ERROR:"Zod Validation error"
    }
  },
};

export default API_MESSAGES;
