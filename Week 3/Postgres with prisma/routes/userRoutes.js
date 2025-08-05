import express from "express";
import API_MESSAGES from "../lib/constants.js";
import prisma from "../lib/db.js";

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const userData = req.body;

    const newuser = await prisma.user.create({
      data: userData,
    });

    res.status(201).json({
      success: true,
      message: API_MESSAGES.USER.SUCCESS,
      newuser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.USER.ERROR,
      error,
    });
  }
});

router.get("", async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      allUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
});

//get all user posts
router.get("/:id/posts", async (req, res) => {
  const { id } = req.params;

  console.log(req.params);
  try {
    const allPosts = await prisma.user.findMany({
      include: {
        posts: {
          include: {
            categories: true,
            // author:true
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      allPosts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
});

//create user along with posts and its categories
router.get("/createPostWithCategories", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.create({
      data: {
        email: "ariadne@prisma.io",
        name: "Ariadne",
        posts: {
          create: [
            {
              title: "my first dat at prisma",
              categories: {
                create: [{ name: "office" }],
              },
            },
          ],
        },
      },
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.USER.SUCCESS,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: API_MESSAGES.USER.ERROR,
    });
  }
});

//aggregate routes
router.get("/getUserAgeStats", async (req, res) => {
  try {
    const allUsers = await prisma.user.aggregate({
        _avg:{
            age:true
        },
        _sum:{
            age:true
        },
        _max:{
            age:true
        },
        _min:{
            age:true
        }
        
    });

    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      allUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
});

//get number of post per user using group by
router.get("/getPostsPerUser", async (req, res) => {
  try {
    const postData = await prisma.post.groupBy({
        by:['authorId'],
        _count:{
            id:true
        }
    })
    const totalPosts = await prisma.post.aggregate({
        _count:{
            id:true
        }
    })



    res.status(200).json({
      success: true,
      message: API_MESSAGES.DATA.FETCH_SUCCESS,
      postData,
      totalNumberOfPosts : totalPosts._count.id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
    });
  }
});

export default router;
