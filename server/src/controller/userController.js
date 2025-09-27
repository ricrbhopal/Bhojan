import cloudinary from "../config/cloudinary.js";

export const Update = async (req, res, next) => {
  try {
    const { fullName, gender, phone, dob, foodType } = req.body;
    if (!fullName || !gender || !phone || !dob || !foodType) {
      const error = new Error("All Fields are Required");
      error.statusCode = 404;
      return next(error);
    }
    console.log("Update Request Body:", req.body);
    const currentUser = req.user;
    console.log("Current User:", currentUser);
    const uploadedPicture = req.file || "";
    if (uploadedPicture) {
      // Upload to Cloudinary
      if (currentUser.PhotoPublicId) {
        await cloudinary.uploader.destroy(currentUser.PhotoPublicId);
      }
      const b64 = Buffer.from(uploadedPicture.buffer).toString("base64");
      const dataURI = `data:${uploadedPicture.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "BhojanUser/profile",
        width: 500,
        height: 500,
        crop: "fill",
      });
      if (result) {
        currentUser.photo = result.secure_url;
        currentUser.PhotoPublicId = result.public_id;
      } else {
        const error = new Error("Photo Upload Failed");
        error.statusCode = 500;
        return next(error);
      }
    }

    currentUser.fullName = fullName;
    currentUser.gender = gender;
    currentUser.phone = phone;
    currentUser.dob = dob;
    currentUser.foodType = foodType;

    await currentUser.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      data: {
        fullName: currentUser.fullName,
        email: currentUser.email,
        photo: currentUser.photo,
        gender: currentUser.gender,
        phone: currentUser.phone,
        dob: currentUser.dob,
        foodType: currentUser.foodType,
        registrationType: currentUser.registrationType,
      },
    });
  } catch (error) {
    next(error);
  }
};
