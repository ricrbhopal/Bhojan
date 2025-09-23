import jwt from "jsonwebtoken";

export const genToken = (userId, res) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("BhojanLoginKey", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    console.log(token);

    return true;
  } catch (error) {
    return false;
  }
};

export const genForgetPassToken = (email, res) => {
  try {
    const token = jwt.sign({ key: email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });

    res.cookie("BhojanFP", token, {
      maxAge: 1000 * 60 *10,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    console.log(token);

    return true;
  } catch (error) {
    return false;
  }
};
