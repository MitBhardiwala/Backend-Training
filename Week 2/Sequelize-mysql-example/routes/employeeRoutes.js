import express from "express";
import {
  fetchCountOfEmployeesPerDept,
  fetchSalaryStats,
  fetchTotalNumberOfEmployess,
  fetchAverageSalaryPerDept,
  fetchHighestSalaryPerDept,
  fetchCountOfEmployeesPerPosition,
  fetchDeptWithMoreThanEmployees,
  fetchAvgSalaryForEmpHiredAFter2020,
  fetchDeptWithAvgSalaryGreaterThan60K,
  fetchEmployeesHiredEachYear,
  fetchEmployeeDetails
} from "../controllers/employeeControllers.js";

const router = express.Router();

//aggregate examples
router.get("/totalNumberOfEmployees", fetchTotalNumberOfEmployess);
router.get("/getSalaryStats", fetchSalaryStats);

//using raw query
router.get("/getEmployeeDetails",fetchEmployeeDetails)

//group by examples
router.get("/getCountOfEmployeesPerDept", fetchCountOfEmployeesPerDept);
router.get("/getCountOfEmployeesPerPostion", fetchCountOfEmployeesPerPosition);
router.get("/getAverageSalaryPerDept", fetchAverageSalaryPerDept);
router.get("/getHighestSalaryPerDept", fetchHighestSalaryPerDept);

//having and where with aggregations examples
router.get("/getDeptWithMoreThan3Employees", fetchDeptWithMoreThanEmployees);
router.get(
  "/getAvgSalaryForEmpHiredAFter2020",
  fetchAvgSalaryForEmpHiredAFter2020
);
router.get(
  "/getDeptWithAvgSalaryGreaterThan60K",
  fetchDeptWithAvgSalaryGreaterThan60K
);
router.get("/getEmployeesHiredEachYear",fetchEmployeesHiredEachYear)

export default router;
