import React from "react";
import { useAuth } from "../../context/authContext";
import { FiLogOut } from "react-icons/fi";
import api from "../../config/api";
import toast from "react-hot-toast";

const Sidebar = ({ active, setActive }) => {
  const { user, setUser, setIsLogin } = useAuth();

  const handleLogout = async () => {
    console.log("calling Logout")
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

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className=" p-3">
            <div
              className="flex gap-3 items-center cursor-pointer group"
              onClick={() => naviagte("/dashboard")}
            >
              <div className="h-12 w-12 rounded-full border overflow-hidden group-hover:scale-103">
                <img
                  src={user.photo}
                  alt="userPicture"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <span className="text-primary text-2xl group-hover:font-semibold">
                Dashboard
              </span>
            </div>
            <div className="border-b-2 mt-2"></div>
          </div>
          <div>
            <ul>
              <li
                className={`cursor-pointer py-2 px-4  ${
                  active === "overview"
                    ? "bg-accent text-accent-content"
                    : "hover:bg-secondary hover:text-secondary-content"
                }`}
                onClick={() => setActive("overview")}
              >
                Overview
              </li>
              <li
                className={`cursor-pointer py-2 px-4  ${
                  active === "profile"
                    ? "bg-accent text-accent-content"
                    : "hover:bg-secondary hover:text-secondary-content"
                }`}
                onClick={() => setActive("profile")}
              >
                Profile
              </li>
              <li
                className={`cursor-pointer py-2 px-4  ${
                  active === "orders"
                    ? "bg-accent text-accent-content"
                    : "hover:bg-secondary hover:text-secondary-content"
                }`}
                onClick={() => setActive("orders")}
              >
                Orders
              </li>
              <li
                className={`cursor-pointer py-2 px-4  ${
                  active === "address"
                    ? "bg-accent text-accent-content"
                    : "hover:bg-secondary hover:text-secondary-content"
                }`}
                onClick={() => setActive("address")}
              >
                Address
              </li>
              <li
                className={`cursor-pointer py-2 px-4  ${
                  active === "contact"
                    ? "bg-accent text-accent-content"
                    : "hover:bg-secondary hover:text-secondary-content"
                }`}
                onClick={() => setActive("contact")}
              >
                Contact Us
              </li>
            </ul>
          </div>
        </div>

        <div className="p-3 grid">
          <div className="border-t-2 mt-2"></div>
          <button className="btn btn-error m-3 flex g-3" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
