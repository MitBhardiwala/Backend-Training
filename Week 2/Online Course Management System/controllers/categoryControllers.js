import z from "zod";
import { Category } from "../models/index.js";
import API_MESSAGES from "../utils/constants.js";
import { categorySchema } from "../utils/validateSchema.js";

export const addCategory = async (req, res) => {
  try {
    const category = req.body;

    categorySchema.parse(category);
    const createdCategory = await Category.create(category);

    res.status(201).json({
      success: true,
      message: API_MESSAGES.CATEGORY.SUCCESS,
      createdCategory,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues,
        error: API_MESSAGES.VALIDATION.ZOD_ERROR,
      });
    }
    res.status(500).json({
      success: false,
      message: API_MESSAGES.CATEGORY.ERROR,
      error,
    });
  }
};

export const fetchAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({});

    res.status(200).json({
      success: true,
      message: categories.length
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
      error,
    });
  }
};

export const fetchCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      success: true,
      message: category
        ? API_MESSAGES.DATA.FETCH_SUCCESS
        : API_MESSAGES.DATA.NOT_FOUND,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.FETCH_ERROR,
      error,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCategory = await Category.update(
      req.body,

      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).json({
      success: true,
      message:
        updatedCategory[0] > 0
          ? API_MESSAGES.DATA.UPDATE_SUCCESS
          : API_MESSAGES.DATA.NOT_FOUND +
            " or " +
            API_MESSAGES.DATA.NO_MODIFICATIONS,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.UPDATE_ERROR,
      error,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      success: true,
      message:
        deletedCategory > 0
          ? API_MESSAGES.DATA.DELETE_SUCCESS
          : API_MESSAGES.DATA.NOT_FOUND,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.DATA.DELETE_ERROR,
      error,
    });
  }
};
