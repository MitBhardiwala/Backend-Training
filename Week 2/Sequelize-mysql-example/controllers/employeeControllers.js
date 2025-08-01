import { Op, QueryError, QueryTypes } from "sequelize";
import sequelize from "../config/database.js";
import Employee from "../models/Employee.js";
import { API_MESSAGES } from "../utils/constants.js";
import { raw } from "mysql2";

//aggregations example

export const fetchTotalNumberOfEmployess = async (req, res) => {
  try {
    const totalCount = await Employee.count();
    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      totalCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};
export const fetchSalaryStats = async (req, res) => {
  try {
    const salaryStatsData = await Employee.findOne({
      attributes: [
        [sequelize.fn("MAX", sequelize.col("salary")), "maximumSalary"],
        [sequelize.fn("MIN", sequelize.col("salary")), "minimumSalary"],
        [sequelize.fn("AVG", sequelize.col("salary")), "averageSalary"],
        [sequelize.fn("SUM", sequelize.col("salary")), "totalSumOfAllSalaries"],
      ],
    });
    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      salaryStatsData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};

//using raw query
export const fetchEmployeeDetails = async (req, res) => {
  try {
    const employeeDetails = await sequelize.query("SELECT * FROM `Employees`;", {
      type: QueryTypes.SELECT,
    });
    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      employeeDetails,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};

//group by examples

export const fetchCountOfEmployeesPerDept = async (req, res) => {
  try {
    const EmployeeCount = await Employee.findAll({
      attributes: [
        "department",
        [sequelize.fn("COUNT", sequelize.col("department")), "totalEmployees"],
      ],
      group: "department",
    });
    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      EmployeeCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};
export const fetchAverageSalaryPerDept = async (req, res) => {
  try {
    const salaryData = await Employee.findAll({
      attributes: [
        "department",
        [sequelize.fn("AVG", sequelize.col("salary")), "averageSalary"],
        [sequelize.fn("Count", sequelize.col("id")), "employeeCount"],
      ],
      group: "department",
    });
    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      salaryData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};

export const fetchHighestSalaryPerDept = async (req, res) => {
  try {
    const salaryData = await Employee.findAll({
      attributes: [
        "department",
        [sequelize.fn("MAX", sequelize.col("salary")), "highestSalary"],
      ],
      group: ["department"],
    });
    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      salaryData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};
export const fetchCountOfEmployeesPerPosition = async (req, res) => {
  try {
    const EmployeeCount = await Employee.findAll({
      attributes: [
        "position",
        [sequelize.fn("COUNT", sequelize.col("position")), "totalEmployees"],
      ],
      group: ["position"],
    });
    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      EmployeeCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};

//having and where with aggregations examples
export const fetchDeptWithMoreThanEmployees = async (req, res) => {
  try {
    const deptDetails = await Employee.findAll({
      attributes: [
        "department",
        [sequelize.fn("COUNT", sequelize.col("id")), "employeeCount"],
      ],
      group: ["department"],
      having: {
        employeeCount: {
          [Op.gt]: 3,
        },
      },
    });
    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      deptDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};
export const fetchAvgSalaryForEmpHiredAFter2020 = async (req, res) => {
  try {
    const salaryDetails = await Employee.findAll({
      where: {
        hireDate: {
          [Op.gt]: "2020%",
        },
      },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("salary")), "AverageSalary"],
      ],
    });
    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      salaryDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};
export const fetchDeptWithAvgSalaryGreaterThan60K = async (req, res) => {
  try {
    const deptDetails = await Employee.findAll({
      attributes: [
        "department",
        [sequelize.fn("AVG", sequelize.col("salary")), "AverageSalary"],
      ],
      group: ["department"],
      having: {
        AverageSalary: {
          [Op.gt]: 60000,
        },
      },
    });
    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      deptDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};
export const fetchEmployeesHiredEachYear = async (req, res) => {
  try {
    const employeeDetails = await Employee.findAll({
      attributes: [
        [sequelize.fn("YEAR", sequelize.col("hireDate")), "year"],
        [sequelize.fn("COUNT", sequelize.col("id")), "employeeCount"],
      ],
      group: [sequelize.fn("YEAR", sequelize.col("hireDate"))],
      order: [["year", "ASC"]],
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      employeeDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
      error,
    });
  }
};
