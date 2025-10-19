import Resturant from "../models/resturantModel.js";
import Menu from "../models/menuModal.js";
import cloudinary from "../config/cloudinary.js";

export const AddMenuItems = async (req, res, next) => {
  try {
    const { itemName, itemDescription, itemPrice, itemCategory } = req.body;
    const CurrentResturant = req.resturant;

    const image = req.file;
    if (!image) {
      res.status(400);
      throw new Error("Image is required");
    }
    if (!itemName || !itemDescription || !itemPrice || !itemCategory) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const b64 = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${b64}`;
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: `BhojanAdmin/Resturants/${CurrentResturant.resturantName}/MenuItems`,
      width: 500,
      height: 500,
      crop: "fill",
    });
    if (!result) {
      const error = new Error("Image Upload Failed");
      error.statusCode = 500;
      return next(error);
    }

    const imageUrl = result.secure_url;
    const imagePublicId = result.public_id;

    const menuItem = {
      name: itemName,
      description: itemDescription,
      price: itemPrice,
      category: itemCategory,
      image: imageUrl,
      imagePublicId: imagePublicId,
      isAvailable: "true",
    };

    let menu = await Menu.findOne({ resturantId: CurrentResturant._id });
    if (menu) {
      menu.items.push(menuItem);
      await menu.save();
    } else {
      menu = new Menu({
        resturantId: CurrentResturant._id,
        items: [menuItem],
      });
      await menu.save();
    }
  } catch (error) {
    next(error);
  }
};
