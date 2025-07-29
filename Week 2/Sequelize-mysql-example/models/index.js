import User from "./User.js";
import Post from "./Post.js";

Post.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Post, { foreignKey: "userId" });

export { User, Post };
