import mongoose, { Schema } from "mongoose";

const BookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,

    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    no_of_page: {
      type: Number,
      required: true,
      min: 0,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      requred: true,
      min: 1,
    },
    release_year: {
      type: Number,
      required: true,
      min: 2000,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

//Below code sets the first character of name, author and category to capital letter
// BookSchema.pre("save", function (next) {
//   if (this.name && typeof this.name === "string") {
//     this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
//   }
//   if (this.author && typeof this.author === "string") {
//     this.author = this.author.charAt(0).toUpperCase() + this.author.slice(1);
//   }
//   if (this.category && typeof this.category === "string") {
//     this.category = this.category.charAt(0).toUpperCase() + this.category.slice(1);
//   }
//   next();
// });

export const Book = mongoose.model("Book", BookSchema);
