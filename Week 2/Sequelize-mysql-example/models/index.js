import User from "./User.js";
import Post from "./Post.js";
import Employee from "./Employee.js";

Post.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Post, { foreignKey: "userId" });

export { User, Post, Employee };
