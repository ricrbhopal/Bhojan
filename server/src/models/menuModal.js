import mongoose from "mongoose";

const menuSchema = mongoose.Schema(
  {
    resturantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
      required: true,
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        imagePublicId: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
