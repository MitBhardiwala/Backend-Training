import fs from "fs/promises";
import path from "path";

const todosFilePath = path.join("todos.json");
console.log(todosFilePath)

export const readTodosFile = async () => {
  const data = await fs.readFile(todosFilePath, "utf-8");
  const jsonData = JSON.parse(data);

  return jsonData;
};

export const writeToTodosFile = async (newData) => {
  const stringData = JSON.stringify(newData, null, 2);
  await fs.writeFile(todosFilePath, stringData, "utf-8");
};
