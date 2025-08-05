import express from "express";
import API_MESSAGES from "../lib/constants.js"
import prisma from "../lib/db.js"

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const allWorkers = await prisma.worker.findMany();

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      allWorkers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
      
    });
  }
});

router.post("", async (req, res) => {
  try {
    const workerData = req.body;

    const newWorker = await prisma.worker.create({
      data: workerData,
    });

    res.status(201).json({
      success: true,
      message: API_MESSAGES.WORKER.SUCCESS,
      newWorker,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.WORKER.ERROR,
      error,
    });
  }
});

export default router;
