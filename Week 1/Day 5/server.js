import express from "express";
import { fileURLToPath } from "url";
import path, { dirname, join } from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const todosFilePath = path.join(__dirname, "/todos.json");

const readTodosFile = async () => {
  const data = await fs.readFile(todosFilePath, "utf-8");
  const jsonData = JSON.parse(data);

  return jsonData;
};

const writeToTodosFile = async (newData) => {
  const stringData = JSON.stringify(newData, null, 2);
  await fs.writeFile(todosFilePath, stringData, "utf-8");
};

app.get("/check", (req, res) => {
  res.json({
    success: true,
    message: "Server is running properly",
  });
});

app.get("/todos", async (req, res) => {
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
  } catch (error) {
    console.log("Error in fetching todos : ", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching todos.",
    });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id)
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
});

app.post("/todos/add", async (req, res) => {
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
        data:existingTodo
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
});

app.delete("/todos/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    console.log(id);
    let todos = await readTodosFile();

    //check if todo exists
    const existingTodo = todos.filter((todo) => todo.id === id);

    if (existingTodo.length === 0) {
      return res.status(400).json({
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
});

app.put("/todos/update/:id", async (req, res) => {
  try {
    const { description, status } = req.body;
    const { id } = req.params;

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

    

    todos=todos.map(todo=>{
      if(todo===existingTodo[0]){
        return newTodo
      }
      return todo;
    })

  
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
});

app.listen(port, () => {
  console.log(`Server running at port ${3000}`);
});
