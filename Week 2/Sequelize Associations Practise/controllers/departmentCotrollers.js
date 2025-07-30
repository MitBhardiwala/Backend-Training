import { Department, Worker } from "../models/index.js";
import API_MESSAGES from "../utils/constants.js";

//find all workers for specific department
export const fetchWorkers = async (req, res) => {
  try {
    const { department } = req.query;

    const workerDetails = await Department.findAll({
      include: [
        {
          model: Worker,
          attributes:['name','email','salary']
        },
      ],

      where:{
        name:department
      },

      attributes:[['name','DepartmentName']]
    });

    res.status(200).json({
      success: true,
      message: workerDetails.length ? API_MESSAGES.SUCCESS.DATA_FETCHED : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      workerDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
    });
  }
};
