import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {motion} from 'framer-motion'

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Logged in successfully");
    console.log(loginData);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <motion.div 
        initial={{opacity:0,}}
        animate={{opacity:1,}}
        transition={{duration:1}}
        className="w-full max-w-md p-8 space-y-6 bg-base-200 rounded shadow">
          <h2 className="text-4xl font-bold text-center text-base-content">
            Login
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>
          <p className="text-sm text-center text-secondary">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
