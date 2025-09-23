import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    phone: {
      type: String,
      required: true,
      default: "9876543210",
    },
    dob: {
      type: String,
      required: true,
      default: "01/01/2000",
    },
    foodType: {
      type: String,
      required: true,
      enum: ["veg", "non-veg", "eggetarian", "jain", "vegan", "any"],
      default: "veg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
