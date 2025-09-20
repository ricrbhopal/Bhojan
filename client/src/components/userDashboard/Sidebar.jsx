import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import {
  FiHome,
  FiUser,
  FiShoppingBag,
  FiMapPin,
  FiMail,
  FiLogOut,
} from "react-icons/fi";
import api from "../../config/api";
import toast from "react-hot-toast";

const Sidebar = ({ active, setActive, setIsSideMenuOpen, isSideMenuOpen }) => {
  const { user, setUser, setIsLogin } = useAuth();

  const handleLogout = async () => {
    console.log("calling Logout");
    try {
      const res = await api.get("/auth/logout");
      setUser("");
      setIsLogin(false);
      sessionStorage.removeItem("BhojanUser");
      toast.success("Logout Succesfull");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.status + " | " + error?.response?.data?.message ||
          "Unknown Error From Server"
      );
    }
  };

  const handleClick = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full w-[200px]">
        <div>
          <div className=" p-1">
            <div
              className="flex gap-3 items-center cursor-pointer group"
              onClick={handleClick}
            >
              <div className="h-12 w-12 rounded-full border overflow-hidden group-hover:scale-103">
                <img
                  src={user.photo}
                  alt="userPicture"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <span
                className={`text-primary text-2xl group-hover:font-semibold ${
                  isSideMenuOpen === false ? "hidden" : ""
                }`}
              >
                Dashboard
              </span>
            </div>
            <div
              className={`border-b-2 mt-2 ${
                isSideMenuOpen === true ? "w-full" : "w-12"
              }`}
            ></div>
          </div>
          <div>
            <ul>
              <li
                className={`cursor-pointer py-2 px-6 flex items-center gap-4 ${
                  active === "overview"
                    ? "bg-accent text-accent-content"
                    : "hover:bg-secondary hover:text-secondary-content"
                }`}
                onClick={() => setActive("overview")}
              >
                <FiHome /> Overview
              </li>
              <li
                className={`cursor-pointer py-2 px-6 flex items-center gap-4 ${
                  active === "profile"
                    ? "bg-accent text-accent-content"
                    : "hover:bg-secondary hover:text-secondary-content"
                }`}
                onClick={() => setActive("profile")}
              >
                <FiUser /> Profile
              </li>
              <li
                className={`cursor-pointer py-2 px-6 flex items-center gap-4 ${
                  active === "orders"
                    ? "bg-accent text-accent-content"
                    : "hover:bg-secondary hover:text-secondary-content"
                }`}
                onClick={() => setActive("orders")}
              >
                <FiShoppingBag /> Orders
              </li>
              <li
                className={`cursor-pointer py-2 px-6 flex items-center gap-4 ${
                  active === "address"
                    ? "bg-accent text-accent-content"
                    : "hover:bg-secondary hover:text-secondary-content"
                }`}
                onClick={() => setActive("address")}
              >
                <FiMapPin /> Address
              </li>
              <li
                className={`cursor-pointer py-2 px-6 flex items-center gap-4 ${
                  active === "contact"
                    ? "bg-accent text-accent-content"
                    : "hover:bg-secondary hover:text-secondary-content"
                }`}
                onClick={() => setActive("contact")}
              >
                <FiMail /> Contact Us
              </li>
            </ul>
          </div>
        </div>

        <div className="p-1">
          <div
            className={`border-b-2 mt-2 ${
              isSideMenuOpen === true ? "w-full" : "w-12"
            }`}
          ></div>
          <button
            className={`btn btn-error mt-2 flex ${
              isSideMenuOpen === true ? "w-full" : "w-12"
            }`}
            onClick={handleLogout}
          >
            <FiLogOut className="text-xl" />{" "}
            <span className={`${isSideMenuOpen === false ? "hidden" : ""}`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
