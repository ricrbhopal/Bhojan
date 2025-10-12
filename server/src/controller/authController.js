import bcrypt from "bcrypt";

import { genToken, genForgetPassToken } from "../utils/jsonWebTokens.js";
import sendEmail from "../utils/sendEmail.js";

// Import models
import OTP from "../models/OTPModel.js";
import User from "../models/userModel.js";
import Resturant from "../models/resturantModel.js";
import Rider from "../models/riderModel.js";

export const Register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      const error = new Error("All Feilds Required");
      error.statusCode = 404;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User Already Exists, Please Login");
      error.statusCode = 409;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const photo = `https://placehold.co/600x400/EEE/31343C?font=poppins&text=${fullName.charAt(
      0
    )}`;
    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      photo,
      registrationType: "email",
    });

    res.status(200).json({
      message: `🙏 Namaste ${fullName}, Apke liye 56 bhog tyar hai 😊`,
    });
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All Feilds Required");
      error.statusCode = 404;
      return next(error);
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (!existingUser) {
      const error = new Error("User Not Found, Please Register");
      error.statusCode = 404;
      return next(error);
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      return next(error);
    }

    if (!genToken(existingUser._id, res)) {
      const error = new Error("Unable to Login");
      error.statusCode = 403;
      return next(error);
    }

    res.status(200).json({
      message: `Welcome back, ${existingUser.fullName}`,
      data: {
        fullName: existingUser.fullName,
        email: existingUser.email,
        photo: existingUser.photo,
        gender: existingUser.gender,
        phone: existingUser.phone,
        dob: existingUser.dob,
        foodType: existingUser.foodType,
        registrationType: existingUser.registrationType,
        role: existingUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const Logout = (req, res, next) => {
  try {
    console.log("Performimg Logout");

    res.clearCookie("BhojanLoginKey");
    console.log("cookies Cleared");

    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    next(error);
  }
};

export const ResetPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const currentUser = req.user;

    console.log(currentPassword, newPassword, currentUser);

    if (!currentPassword || !newPassword) {
      const error = new Error("All Fields Required");
      error.statusCode = 404;
      return next(error);
    }

    let isVerified = true;
    if (currentPassword !== "N/A") {
      isVerified = await bcrypt.compare(currentPassword, currentUser.password);
    }

    if (!isVerified) {
      const error = new Error("Current Password is Incorrect");
      error.statusCode = 401;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    currentUser.password = hashedPassword;
    await currentUser.save();

    res.status(200).json({ message: "Password Reset Successful" });
  } catch (error) {
    next(error);
  }
};

export const SendOTP = async (req, res, next) => {
  try {
    const { email, role } = req.body;

    let existingUser;

    if (role === "user") {
      existingUser = await User.findOne({ email });
    } else if (role === "resturant") {
      existingUser = await Resturant.findOne({ email });
    } else if (role === "rider") {
      existingUser = await Rider.findOne({ email });
    }

    if (!existingUser) {
      const error = new Error("User Not Found, Please Register");
      error.statusCode = 404;
      return next(error);
    }

    const isOTPSent = await OTP.findOne({ email });
    if (isOTPSent) {
      await isOTPSent.deleteOne({ email });
    }

    const otp = Math.floor(Math.random() * 900000 + 100000);

    const message = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background: #f7f7f7; padding: 20px; }
            .container { background: #fff; border-radius: 8px; padding: 24px; max-width: 400px; margin: auto; box-shadow: 0 2px 8px rgba(0,0,0,0.05);}
            .otp { font-size: 2em; color: #e63946; letter-spacing: 4px; margin: 16px 0; }
            .title { font-size: 1.2em; color: #222; margin-bottom: 8px; }
            .footer { font-size: 0.9em; color: #888; margin-top: 24px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="title">Your Bhojan App OTP Code</div>
            <p>Dear ${existingUser.fullName},</p>
            <p>Use the following One-Time Password (OTP) to verify your email address:</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
            <div class="footer">If you did not request this, please ignore this email.</div>
          </div>
        </body>
      </html>
    `;

    const emailStatus = await sendEmail(email, "OTP for Verification", message);

    const hashOTP = await bcrypt.hash(otp.toString(), 10);
    console.log("Hashed OTP:", hashOTP);

    await OTP.create({
      email,
      otp: hashOTP,
    });

    if (emailStatus) {
      res.status(200).json({ message: "OTP sent Succesfully on Email" });
    } else {
      res.status(404).json({ message: "Unable to sent OTP" });
    }
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const isOTPAvailable = await OTP.findOne({ email });
    if (!isOTPAvailable) {
      const error = new Error("OTP expired. Try Again");
      error.statusCode = 401;
      return next(error);
    }

    const isValid = await bcrypt.compare(otp.toString(), isOTPAvailable.otp);
    console.log("OTP validation result:", isValid);
    if (!isValid) {
      const error = new Error("Invalid OTP. Try Again");
      error.statusCode = 401;
      return next(error);
    }

    if (!genForgetPassToken(email, res)) {
      const error = new Error("Unable to Complete the Process");
      error.statusCode = 403;
      return next(error);
    }

    await OTP.deleteOne({ email });

    res.status(200).json({ message: "OTP Verification Successfull" });
  } catch (error) {
    next(error);
  }
};

export const ForgetPassword = async (req, res, next) => {
  try {
    const { newpassword } = req.body;
    const currentUser = req.user;

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    currentUser.password = hashedPassword;
    await currentUser.save();

    res.clearCookie("BhojanFP");
    res.status(200).json({ message: "Password Change Successful" });
  } catch (error) {
    next(error);
  }
};

export const GoogleLogin = async (req, res, next) => {
  try {
    let { email, name, id, imageUrl } = req.body;
    if (!email || !name || !id) {
      const error = new Error("All Fields Required");
      error.statusCode = 404;
      return next(error);
    }

    if (!imageUrl) {
      imageUrl = `https://placehold.co/600x400/EEE/31343C?font=poppins&text=${name.charAt(
        0
      )}`;
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const hashedGoogelId = await bcrypt.hash(id, 10);
      const newUser = await User.create({
        fullName: name,
        email: email.toLowerCase(),
        googleId: hashedGoogelId,
        photo: imageUrl,
        registrationType: "google",
      });

      if (!genToken(newUser._id, res)) {
        const error = new Error("Unable to Login");
        error.statusCode = 403;
        return next(error);
      }

      res.status(200).json({
        message: `Welcome, ${newUser.fullName}`,
        data: {
          fullName: newUser.fullName,
          email: newUser.email,
          photo: newUser.photo,
          gender: newUser.gender,
          phone: newUser.phone,
          dob: newUser.dob,
          foodType: newUser.foodType,
          registrationType: newUser.registrationType,
        },
      });
    } else if (existingUser && registrationType === "email") {
      const hashedGoogelId = await bcrypt.hash(id, 10);
      existingUser.googleId = hashedGoogelId;
      existingUser.registrationType = "google";
      await existingUser.save();

      if (!genToken(existingUser._id, res)) {
        const error = new Error("Unable to Login");
        error.statusCode = 403;
        return next(error);
      }

      res.status(200).json({
        message: `Welcome back, ${existingUser.fullName}`,
        data: {
          fullName: existingUser.fullName,
          email: existingUser.email,
          photo: existingUser.photo,
          gender: existingUser.gender,
          phone: existingUser.phone,
          dob: existingUser.dob,
          foodType: existingUser.foodType,
          registrationType: existingUser.registrationType,
          role: existingUser.role,
        },
      });
    } else {
      const isgoogleIdCorrect = await bcrypt.compare(id, existingUser.googleId);
      if (!isgoogleIdCorrect) {
        const error = new Error("Invalid Credentials");
        error.statusCode = 401;
        return next(error);
      }

      if (!genToken(existingUser._id, res)) {
        const error = new Error("Unable to Login");
        error.statusCode = 403;
        return next(error);
      }

      res.status(200).json({
        message: `Welcome back, ${existingUser.fullName}`,
        data: {
          fullName: existingUser.fullName,
          email: existingUser.email,
          photo: existingUser.photo,
          gender: existingUser.gender,
          phone: existingUser.phone,
          dob: existingUser.dob,
          foodType: existingUser.foodType,
          registrationType: existingUser.registrationType,
          role: existingUser.role,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const ResturantLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Email and Password are required");
      error.statusCode = 400;
      return next(error);
    }
    const existingResturant = await Resturant.findOne({ email });
    if (!existingResturant) {
      const error = new Error("Resturant not found");
      error.statusCode = 404;
      return next(error);
    }

    const isVerified = await bcrypt.compare(
      password,
      existingResturant.password
    );
    if (!isVerified) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      return next(error);
    }

    //manually add the role field
    existingResturant.role = "resturant";

    if (!genToken(existingResturant._id, res)) {
      const error = new Error("Unable to Login");
      error.statusCode = 403;
      return next(error);
    }

    console.log(existingResturant);
    

    res.status(200).json({
      message: "Resturant Logged In Successfully",
      data: existingResturant,
    });
  } catch (error) {
    next(error);
  }
};

export const RiderLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Email and Password are required");
      error.statusCode = 400;
      return next(error);
    }
    const existingRider = await Rider.findOne({ email });
    if (!existingRider) {
      const error = new Error("Rider not found");
      error.statusCode = 404;
      return next(error);
    }
    const isVerified = await bcrypt.compare(password, existingRider.password);
    if (!isVerified) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      return next(error);
    }
    if (!genToken(existingRider._id, res)) {
      const error = new Error("Unable to Login");
      error.statusCode = 403;
      return next(error);
    }

    existingRider.role = "rider";
    res.status(200).json({
      message: "Rider Logged In Successfully",
      data: existingRider,
    });
  } catch (error) {
    next(error);
  }
};
