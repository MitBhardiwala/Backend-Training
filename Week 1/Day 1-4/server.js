import express, { response } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import fs from "fs/promises";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static("test"));
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(__filename);
console.log(__dirname);

const usersFilePath = path.join(__dirname, "users.json");

app.get("/", (req, res) => {
  res.jsonFile(path.join(__dirname, "index.html"));
});

app.get("/process-get", (req, res) => {
  console.log(req.header);
  res.json({
    success: true,
    message: "Form data received",
    data: {
      first_name: req.query.first_name,
      last_name: req.query.last_name,
    },
  });
});

app.post("/process-POST", (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const full_name = first_name + " - " + last_name;
  const data = {
    first_name: first_name,
    last_name: last_name,
    full_name: full_name,
  };

  res.json({
    success: true,
    message: "Post request recieved",
    data,
  });
});

app.get("/users", async (req, res) => {
  try {
    const data = await fs.readFile(usersFilePath, "utf-8");
    const jsonData = JSON.parse(data);
    res.json({
      success: true,
      message: "Users fetched succesfully",
      totalUsers: Object.values(jsonData).length,
      data: jsonData,
    });
  } catch (error) {
    console.log("Error in fetching users :", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching users",
    });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await fs.readFile(usersFilePath, "utf-8");
    const users = JSON.parse(data);
    const user = users["user" + userId];

    if (user) {
      res.json({
        success: true,
        message: `User with id ${userId} fetched successfully`,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `User with id ${userId} does not exist`,
      });
    }
  } catch (error) {
    console.log("Error in fetching user :", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching user details",
    });
  }
});

app.post("/user/add", async (req, res) => {
  try {
    const user = req.body;
    const data = await fs.readFile(usersFilePath, "utf-8");
    const users = JSON.parse(data);

    //search for user
    const existingUser = users["user" + user.id];

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: `User with id ${user.id} already exists`,
      });
    }

    users["user" + user.id] = user;

    const jsonString = JSON.stringify(users, null, 2);

    await fs.writeFile(usersFilePath, jsonString, "utf-8");

    res.status(201).json({
      success: true,
      message: `User with id ${user.id} added succesfully`,
    });
  } catch (error) {
    console.log("Error in adding user : ", error);
    res.status(500).send({
      success: false,
      message: "Error in adding user",
    });
  }
});

app.delete("/user/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    //check for  user
    const data = await fs.readFile(usersFilePath, "utf-8");
    const users = JSON.parse(data);

    const existingUser = users["user" + userId];

    console.log(existingUser);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: `User with ${userId} does not exist`,
      });
    }

    //delete if user exists

    delete users["user" + userId];

    const jsonString = JSON.stringify(users, null, 2);
    await fs.writeFile(usersFilePath, jsonString, "utf-8");

    res.status(200).json({
      success: true,
      message: `User with ${userId} has been deleted successfully`,
    });
  } catch (error) {
    console.log("Error in deleting user :", error);
    res.status(500).json({
      success: false,
      message: "Error in deleting user",
    });
  }
});

app.put("/user/update/:id", async (req, res) => {
  try {
    console.log("hello");
    const userId = req.params.id;
    const newUserData = req.body;
    const data = await fs.readFile(usersFilePath, "utf-8");
    const jsonData = JSON.parse(data);

    //check if user exists

    const existingUser = jsonData["user" + userId];
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: `User with ${userId} does not exist`,
      });
    }

    const existingUserData = jsonData["user" + userId];
    jsonData["user" + userId] = { ...existingUserData, ...newUserData };

    const jsonString = JSON.stringify(jsonData, null, 2);

    await fs.writeFile(usersFilePath, jsonString, "utf-8");

    res.status(200).json({
      success: true,
      message: `User data of user id ${userId} has been updated successfully ! `,
    });
  } catch (error) {
    console.log("Error in updating user : ", error);

    res.status(500).json({
      success: false,
      message: "Error in updating data",
    });
  }
});

//middleware

const authenticate = (req, res, next) => {
  const { password } = req.body;

  if (password === "123456") {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized user !",
    });
  }
};

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

app.post("/valid-user", logRequest, authenticate, (req, res) => {
  try {
    const { user } = req.body;

    res.status(200).json({
      success: true,
      message: `${user} is a valid user`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in authentication",
    });
  }
});

app.listen(3000, () => {
  console.log("App sucessfully running on port 3000");
});
