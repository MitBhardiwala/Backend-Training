import mongoose, { Schema } from "mongoose";

const BookSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Book name is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    noOfPage: {
      type: Number,
      required: [true, "No of Pages are required"],
      min: 0,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    price: {
      type: Number,
      requred: [true, "Book Price is required"],
      min: 1,
    },
    releaseYear: {
      type: Number,
      required: [true, "Book Release Year is required"],
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
