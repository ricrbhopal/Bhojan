import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log(registerData);
    // Further submission logic here
    try {
      const res = await api.post("/auth/register", registerData);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.status + " | " + error?.response?.data?.message ||
          "Unknown Error From Server"
      );
    }
  };

  useEffect(() => {
    document.title = "Bhojan | Register";
  }, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-base-200 rounded shadow">
          <h2 className="text-4xl font-bold text-center text-base-content">
            Register
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm font-medium text-base-content">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                className="input"
                placeholder="Enter your full name"
                value={registerData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-base-content">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Enter your email"
                value={registerData.email}
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
                value={registerData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-base-content">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="input"
                placeholder="Confirm your password"
                value={registerData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>
          <p className="text-sm text-center text-secondary">
            Already have an account?{" "}
            <Link to={"/login"} className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
