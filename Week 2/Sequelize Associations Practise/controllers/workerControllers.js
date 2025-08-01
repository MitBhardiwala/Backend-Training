import API_MESSAGES from "../utils/constants.js";
import { Worker, Department, Bonus } from "../models/index.js";
import sequelize from "../config/database.js";
import { Op, Sequelize } from "sequelize";

//find details and workers in each department
export const fetchWorkersAndTheirDepartmentInfo = async (req, res) => {
  try {
    const workerDeptDetails = await Worker.findAll({
      include: [
        {
          model: Department,
          attributes: ["name"],
        },
      ],
      attributes: [["name", "WorkerName"]],
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.SUCCESS.DATA_FETCHED,
      workerDeptDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
    });
  }
};

//find all bonuses for a specific worker
export const fetchBonusInfo = async (req, res) => {
  try {
    const { workerName } = req.query;

    const bonusDetails = await Worker.findAll({
      include: {
        model: Bonus,
      },
      where: {
        name: workerName,
      },
      attributes: [["name", "WorkerName"], "email", "salary"],
    });

    res.status(200).json({
      success: true,
      message: bonusDetails.length
        ? API_MESSAGES.SUCCESS.DATA_FETCHED
        : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      bonusDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
    });
  }
};
//find total bonus for each worker
export const fetchTotalBonusPerWorker = async (req, res) => {
  try {
    const bonusDetails = await Worker.findAll({
      attributes: [
        "id",
        "name",
        [sequelize.fn("SUM", sequelize.col("bonuses.amount")), "totalBonus"],
      ],
      include: [
        {
          model: Bonus,
          attributes: [],
        },
      ],
      group: ["worker.id", "worker.name"],
    });

    res.status(200).json({
      success: true,
      message: bonusDetails.length
        ? API_MESSAGES.SUCCESS.DATA_FETCHED
        : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      bonusDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
    });
  }
};

//get total workers in each department
export const fetchTotalWorkersInEachDept = async (req, res) => {
  try {
    const workerDetails = await Department.findAll({
      attributes: [
        "id",
        "name",
        [
          sequelize.fn("COUNT", sequelize.col("workers.id")),
          "totalWorkersCount",
        ],
      ],
      include: [
        {
          model: Worker,
          attributes: [],
        },
      ],
      group: ["department.id", "department.name"],
    });

    res.status(200).json({
      success: true,
      message: workerDetails.length
        ? API_MESSAGES.SUCCESS.DATA_FETCHED
        : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      workerDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
    });
  }
};

//get highest worker detail in each department
export const fetchHighestPaidWorkerInEachDept = async (req, res) => {
  try {
    const workerDetails = await Worker.findAll({
      where: {
        salary: {
          [Op.in]: Sequelize.literal(`(
                    SELECT MAX(salary) FROM workers
                    GROUP BY departmentId
            )`),
        },
      },
      include: [
        {
          model: Department,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json({
      success: true,
      message: workerDetails.length
        ? API_MESSAGES.SUCCESS.DATA_FETCHED
        : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      workerDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
    });
  }
};
