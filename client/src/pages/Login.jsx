import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import api from "../config/api";
import { useAuth } from "../context/authContext";
import ForgetPassModal from "../components/pageModals/ForgetPassModal";
import { useGoogleAuth } from "../context/GoogleAuth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { setUser, setIsLogin } = useAuth();
  const { isLoading, error, isInitialized, signInWithGoogle } = useGoogleAuth();
  const [isForgetpasswordModalOpen, setIsForgetpasswordModalOpen] =
    useState(false);

  const navigate = useNavigate();

  const GoogleLogin = () => {
    if (!loginData.role) {
      return toast.error("Please select a role to continue with Google");
    }
    signInWithGoogle(handleGoogleSuccess, handleGoogleFailure);
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
    toast.error("Google login failed. Please try again.");
  };

  const handleGoogleSuccess = async (userData) => {
    try {
      const res = await api.post("/auth/googlelogin", userData);
      toast.success(res.data.message);
      setUser(res.data.data);
      setIsLogin(true);
      sessionStorage.setItem("BhojanUser", JSON.stringify(res.data.data));
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const [loginData, setLoginData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginData);
    try {
      const res = await api.post("/auth/login", loginData);
      toast.success(res.data.message);
      setUser(res.data.data);
      setIsLogin(true);
      sessionStorage.setItem("BhojanUser", JSON.stringify(res.data.data));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.status + " | " + error?.response?.data?.message ||
          "Unknown Error From Server"
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md p-8 space-y-6 bg-base-200 rounded shadow"
        >
          <h2 className="text-4xl font-bold text-center text-base-content">
            Login
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="mb-4 flex justify-between items-center">
              <label className="mb-1 text-md font-medium text-base-content">
                I'm
              </label>
              <div className="flex gap-4 justify-between items-center mb-2">
                <div>
                  <input
                    type="radio"
                    id="user"
                    name="role"
                    value="user"
                    onChange={handleChange}
                    checked={loginData.role === "user"}
                  />
                  <label htmlFor="user" className="ml-2 text-base-content">
                    User
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="restaurant"
                    name="role"
                    value="restaurant"
                    onChange={handleChange}
                    checked={loginData.role === "restaurant"}
                  />
                  <label
                    htmlFor="restaurant"
                    className="ml-2 text-base-content"
                  >
                    Restaurant
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="rider"
                    name="role"
                    value="rider"
                    onChange={handleChange}
                    checked={loginData.role === "rider"}
                  />
                  <label htmlFor="rider" className="ml-2 text-base-content">
                    Rider
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-base-content">
                Email
              </label>
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-base-content">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberme"
                  id="rememberme"
                  className="accent-primary"
                />
                <label
                  htmlFor="rememberme"
                  className="ml-2 text-sm text-base-content"
                >
                  Remember me
                </label>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsForgetpasswordModalOpen(true);
                  }}
                  className="text-sm text-secondary hover:underline hover:text-primary"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          {(loginData.role === "user" || loginData.role === "") && (
            <div>
              <div className="divider mb-4">OR</div>
              {error ? (
                <button
                  className="btn btn-outline btn-error font-sans flex items-center justify-center gap-2 m-2 w-full"
                  disabled
                >
                  <FcGoogle className="text-xl" />
                  {error}
                </button>
              ) : (
                <button
                  onClick={GoogleLogin}
                  className="btn btn-outline font-sans flex items-center justify-center gap-2 m-2 w-full"
                  disabled={!isInitialized || isLoading}
                >
                  <FcGoogle className="text-xl" />
                  {isLoading
                    ? "Loading..."
                    : isInitialized
                    ? "Continue with Google"
                    : "Google Auth Error"}
                </button>
              )}
            </div>
          )}
          <div className="divider">OR</div>
          <p className="text-sm text-center text-secondary">
            {(loginData.role === "restaurant" || loginData.role === "rider") ? (
              <a href="mailto:support@example.com">Please contact support@example.com to create an account.</a>
            ) : (
              <>
                "Don't have an account?{" "}
                <Link to={"/register"} className="text-primary hover:underline">
                  Register with us
                </Link>
              </>
            )}
          </p>
        </motion.div>
      </div>

      <ForgetPassModal
        isOpen={isForgetpasswordModalOpen}
        onClose={() => setIsForgetpasswordModalOpen(false)}
      />
    </>
  );
};

export default Login;
