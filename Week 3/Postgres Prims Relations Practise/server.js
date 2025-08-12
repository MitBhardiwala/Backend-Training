import express from "express";
import apiRoutes from "./routes/index.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
