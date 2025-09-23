import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
import api from "../../config/api";

const ForgetPassModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [isOTPsent, setIsOTPsent] = useState(false);
  const [otp, setOTP] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const [changePass, setChangePass] = useState({
    newpassword: "",
    confirmPassword: "",
  });

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    if (!isOTPsent) {
      try {
        const res = await api.post("/auth/sendOTP", { email });
        toast.success(res.data.message);
        setIsOTPsent(true);
      } catch (error) {
        console.log(error);
        toast.error(
          error?.response?.status + " | " + error?.response?.data?.message ||
            "Unknown Error From Server"
        );
      }
    } else {
      if (!isOTPVerified) {
        try {
          const res = await api.post("/auth/verifyOTP", { email, otp });
          toast.success(res.data.message);
          setIsOTPVerified(true);
        } catch (error) {
          console.log(error);
          toast.error(
            error?.response?.status + " | " + error?.response?.data?.message ||
              "Unknown Error From Server"
          );
        }
      } else {
        try {
          const res = await api.post("/auth/forgetpassword", changePass);
          toast.success(res.data.message);
          handleCloseClick();
        } catch (error) {
          console.log(error);
          toast.error(
            error?.response?.status + " | " + error?.response?.data?.message ||
              "Unknown Error From Server"
          );
        }
      }
    }
  };

  const handleCloseClick = () => {
    setEmail("");
    setIsOTPsent(false);
    setOTP("");
    setIsOTPVerified(false);
    setChangePass({
      newpassword: "",
      confirmPassword: "",
    });
    onClose();
  };

  const handleChangePass = (e) => {
    const { name, value } = e.target;
    setChangePass((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex justify-center bg-base-300/50">
        <div className="w-1/2 max-h-[80vh] m-auto bg-base-200 mt-25 rounded-xl">
          <div className="flex justify-between p-4 border-b-2 sticky top-0">
            <h1>Forget Password</h1>
            <button
              className="text-red-500 text-2xl"
              onClick={handleCloseClick}
            >
              <RxCrossCircled />
            </button>
          </div>
          <div className="p-3">
            <form onSubmit={handleForgetPassword} className="space-y-4">
              <div className="grid grid-cols-[20%_80%] items-center">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  className="input input-bordered"
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isOTPsent}
                />
              </div>
              {isOTPsent && (
                <div className="grid grid-cols-[20%_80%] items-center">
                  <label>OTP</label>
                  <input
                    type="text"
                    name="otp"
                    value={otp}
                    className="input input-bordered"
                    placeholder="Enter your OTP from Email"
                    onChange={(e) => setOTP(e.target.value)}
                    required
                    disabled={isOTPVerified}
                  />
                </div>
              )}

              {isOTPVerified && (
                <div className="grid grid-cols-[20%_80%] items-center space-y-4">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newpassword"
                    value={changePass.newpassword}
                    className="input input-bordered"
                    placeholder="Enter your new password"
                    onChange={handleChangePass}
                    required
                  />
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={changePass.confirmPassword}
                    className="input input-bordered"
                    placeholder="Confirm your new password"
                    onChange={handleChangePass}
                    required
                  />
                </div>
              )}
              <div className="flex justify-center">
                <button type="submit" className="btn btn-primary mt-2">
                  {isOTPsent === true
                    ? isOTPVerified === true
                      ? "Change Password"
                      : "Verifiy Otp"
                    : "Verify Email"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassModal;
