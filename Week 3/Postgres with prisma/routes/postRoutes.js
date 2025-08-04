import express from "express";
import API_MESSAGES from "../lib/constants.js";
import prisma from "../lib/db.js";

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const postData = req.body;

    const newPost = await prisma.post.create({
      data: postData,
    });

    res.status(201).json({
      success: true,
      message: API_MESSAGES.POST.SUCCESS,
      newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.POST.ERROR,
      error,
    });
  }
});

router.get("", async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany();

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      allPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
});

//get postDetails along with author Details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const postDetails = await prisma.post.findMany({
      include: { author: true },
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      postDetails,
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
});

//publish api(put)
router.put("/publish/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const postDetails = await prisma.post.update({
      where: { id: Number(id) },
      data: { published: true },
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      postDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
});



export default router;
