import express from "express";
import API_MESSAGES from "../lib/constants.js";
import prisma from "../lib/db.js";

const router = express.Router();

//get posts for each category
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const categoryData = await prisma.category.findMany({
      include: {
        Post: {
          select: { title: true, published: true },
        },
      },
      where: {
        name: category,
      },
      omit:{
        id:true,
        postId:true,
        name:true
      }
    });

    res.status(200).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      categoryData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
});

export default router;
