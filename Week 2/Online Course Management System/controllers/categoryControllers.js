import { Category } from "../models/index.js";
import API_MESSAGES from "../utils/constants.js";

export const addCategory = async (req, res) => {
  try {
    const course = req.body;
    const createdCourse = await Category.create(course);

    res.status(201).json({
      success: true,
      message: API_MESSAGES.SUCCESS.CATEGORY_ADDED,
      createdCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.CATEGORY_NOT_ADDED,
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
        ? API_MESSAGES.SUCCESS.DATA_FETCHED
        : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
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
        ? API_MESSAGES.SUCCESS.DATA_FETCHED
        : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_FETCHED,
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
          ? API_MESSAGES.SUCCESS.DATA_UPDATED
          : API_MESSAGES.SUCCESS.NO_DATA_FOUND +
            " or " +
            API_MESSAGES.SUCCESS.NO_CHANGES_MADE,
      updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_UPDATED,
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
          ? API_MESSAGES.SUCCESS.DATA_DELETED
          : API_MESSAGES.SUCCESS.NO_DATA_FOUND,
      deletedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: API_MESSAGES.ERROR.DATA_NOT_DELETED,
      error,
    });
  }
};
