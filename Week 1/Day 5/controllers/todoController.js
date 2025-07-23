import { readTodosFile, writeToTodosFile } from "../utils/fileOperations.js";
import { v4 as uuidv4 } from "uuid";

export async function getAllTodos(req, res) {
  try {
    const data = await readTodosFile();

    if (data.length > 0) {
      return res.status(200).json({
        success: true,
        message: "All todos fetched.",
        totalTodos: data.length,
        data,
      });
    }

    res.status(404).json({
      success: false,
      message: "No todos found",
    });
  } catch (error) {
    console.log("Error in fetching todos : ", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching todos.",
    });
  }
}

export async function getTodoById(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id required",
      });
    }

    const todos = await readTodosFile();
    //check if todo exists
    const existingTodo = todos.filter((todo) => todo.id === id);

    if (existingTodo.length === 0) {
      return res.status(400).json({
        success: false,
        message: `Todo with ${id} does not exist`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo fetched successfully",
      data: existingTodo,
    });
  } catch (error) {
    console.log("Error in fetching todos : ", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching todos.",
    });
  }
}

export async function addTodo(req, res) {
  try {
    
    const { description } = req.body;

   

    if (description.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Description cannot be empty",
      });
    }

    let todos = await readTodosFile();

    //check for existing todo
    const existingTodo = todos.filter(
      (todo) => todo.description.toLowerCase() === description.toLowerCase()
    );

    if (existingTodo.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Todo Already exists",
        data: existingTodo,
      });
    }

    const newTodo = {
      id: uuidv4(),
      description: description.trim(),
      status: "pending",
    };

    todos = [...todos, newTodo];

    await writeToTodosFile(todos);

    res.status(201).json({
      success: true,
      message: "Todo addedd successfully",
      data: newTodo,
    });
  } catch (error) {
    console.log("Error in adding todos : ", error);
    res.status(500).json({
      success: false,
      message: "Error in adding todo.",
      error: error.message,
    });
  }
}

export async function deletTodoById(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id required",
      });
    }
    let todos = await readTodosFile();

    //check if todo exists
    const existingTodo = todos.filter((todo) => todo.id === id);

    if (existingTodo.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Todo with ${id} does not exist`,
      });
    }

    todos = todos.filter((todo) => todo.id !== id);

    await writeToTodosFile(todos);

    res.status(200).json({
      success: true,
      message: "Todo has been successfully deleted",
      data: existingTodo,
    });
  } catch (error) {
    console.log("Error in deleting todo");
    res.status(500).json({
      success: false,
      message: "Error in deleting todo",
    });
  }
}

export async function updateTodoById(req, res) {
  try {
    
    

    const { description, status } = req.body;
    const { id } = req.params;

    if (!description || !status) {
      return res.status(400).json({
        success: false,
        message: "Description or status cannot be empty",
      });
    }

    //validations
    if (description.trim().length === 0 || status.trim().length == 0) {
      return res.status(400).json({
        success: false,
        message: "Description or status cannot be empty",
      });
    }

    if (status.trim() !== "completed" && status.trim() !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Status can either be completed or pending only !",
      });
    }

    // search for that id
    let todos = await readTodosFile();

    const existingTodo = todos.filter((todo) => todo.id === id);

    if (existingTodo.length === 0) {
      return res.status(400).json({
        success: false,
        message: `Todo with ${id} does not exist`,
      });
    }

    const newTodo = {
      ...existingTodo[0],
      description: description.trim(),
      status: status.trim(),
    };

    todos = todos.map((todo) => {
      if (todo === existingTodo[0]) {
        return newTodo;
      }
      return todo;
    });

    await writeToTodosFile(todos);

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: newTodo,
    });
  } catch (error) {
    console.log("Error in updating todo : ", error);
    res.status(500).json({
      success: false,
      message: "Error in deleting todo",
    });
  }
}
