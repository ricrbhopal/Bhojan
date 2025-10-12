import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";

export const Protect = async (req, res, next) => {
  try {
    const token = req.cookies.BhojanLoginKey;

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log(decode);
    if (!decode) {
      const error = new Error("Not Authorized, No Token Found");
      error.statusCode = 401;
      throw error;
    }

    const verifiedUser = await User.findById(decode.id);

    if (!verifiedUser) {
      const error = new Error("Not Authorized, Invalid User");
      error.statusCode = 401;
      throw error;
    }

    console.log(verifiedUser);

    req.user = verifiedUser;
    next();
  } catch (error) {
    next(error);
  }
};

// Forget Password Protect middleware
export const ProtectFP = async (req, res, next) => {
  try {
    const token = req.cookies.BhojanFP;

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log(decode);
    if (!decode) {
      const error = new Error("Not Authorized, No Token Found");
      error.statusCode = 401;
      throw error;
    }

    const { role } = req.body;

    let verifiedUser;
    if (role === "customer") {
      verifiedUser = await User.findOne(decode.email);
    } else if (role === "resturant") {
      verifiedUser = await Resturant.findOne(decode.email);
    } else if (role === "rider") {
      verifiedUser = await Rider.findOne(decode.email);
    }
    
    if (!verifiedUser) {
      const error = new Error("Not Authorized, Invalid User");
      error.statusCode = 401;
      throw error;
    }

    console.log(verifiedUser);

    req.user = verifiedUser;
    next();
  } catch (error) {
    next(error);
  }
};

//Admin protect middleware

export const AdminProtect = async (req, res, next) => {
  try {
    const token = req.cookies.BhojanLoginKey;

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log(decode);
    if (!decode) {
      const error = new Error("Not Authorized, No Token Found");
      error.statusCode = 401;
      throw error;
    }

    const verifiedAdmin = await Admin.findById(decode.id);

    if (!verifiedAdmin) {
      const error = new Error("Not Authorized, Invalid User");
      error.statusCode = 401;
      throw error;
    }

    console.log(verifiedAdmin);

    req.admin = verifiedAdmin;
    next();
  } catch (error) {
    next(error);
  }
};
