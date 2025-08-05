import express from "express";
import {
  fetchWorkersAndTheirDepartmentInfo,
  fetchBonusInfo,
  fetchTotalBonusPerWorker,
  fetchTotalWorkersInEachDept,
  fetchHighestPaidWorkerInEachDept,
} from "../controllers/workerControllers.js";

const router = express.Router();

//associations queries
router.get("/getWorkersAndTheirDeptInfo", fetchWorkersAndTheirDepartmentInfo);
router.get("/getBonusInfo", fetchBonusInfo);
router.get("/getTotalBonusPerWorker", fetchTotalBonusPerWorker);
router.get("/getTotalWorkersInEachDept",fetchTotalWorkersInEachDept)
router.get("/getHighestPaidWorkerInEachDept",fetchHighestPaidWorkerInEachDept)

export default router;
