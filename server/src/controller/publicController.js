import Resturant from "../models/resturantModel.js";
import Menu from "../models/menuModal.js";

export const ShowAllResturants = async (req, res, next) => {
  try {
    const resturants = await Resturant.find().sort({ createdAt: -1 });

    if (!resturants || resturants.length === 0) {
      const error = new Error("No Resturants Found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: "All Restaurants Fetched Successfully",
      data: resturants,
    });
  } catch (error) {
    next(error);
  }
};


export const GetResturantMenu = async (req, res, next) => {
  try {
    const { resturantId } = req.params;
    const menu = await Menu.findOne({ resturantId });
    if (!menu) {
      const error = new Error("Menu Not Found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: "Restaurant Menu Fetched Successfully",
      data: menu,
    });
  } catch (error) {
    next(error);
  }
};
