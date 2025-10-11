import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { user, isLogin, isAdmin, isResturant, isRider } = useAuth();
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("BhojanTheme") || "light"
  );

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("BhojanTheme", selectedTheme);
  }, [selectedTheme]);

  
  return (
    <>
      <nav className="bg-primary px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* FlyonUI Logo */}
          <span className="font-bold text-xl text-primary-content">
            FlyonUI
          </span>
        </div>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              to={"/"}
              className="text-primary-content hover:font-bold transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/resturants"}
              className="text-primary-content hover:font-bold transition"
            >
              Resturants
            </Link>
          </li>
          <li>
            <Link
              to={"/about"}
              className="text-primary-content hover:font-bold transition"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={"/contact"}
              className="text-primary-content hover:font-bold transition"
            >
              Contact
            </Link>
          </li>
        </ul>
        <div className="flex gap-4 items-center">
          {isLogin && user ? (
            <div
              className="flex gap-3 items-center cursor-pointer"
              onClick={() =>
                isAdmin
                  ? navigate("/adminDashboard")
                  : isResturant
                  ? navigate("/resturantdashboard")
                  : isRider
                  ? navigate("/riderdashboard")
                  : navigate("/dashboard")
              }
            >
              <div className="h-12 w-12 rounded-full border overflow-hidden">
                <img
                  src={isResturant ? user?.managerImage : user?.photo}
                  alt="userPicture"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <span className="text-primary-content text-2xl">
                {isResturant
                  ? user?.resturantName
                  : user?.fullName?.split(" ")[0]}
              </span>
            </div>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

          <div className="select-floating  bg-transparent">
            <select
              name="theme"
              value={selectedTheme}
              onChange={(e) => {
                setSelectedTheme(e.target.value);
                localStorage.setItem("BhojanTheme", selectedTheme);
              }}
              className="select select-bordered  border-secondary bg-base-100 text-base-content focus:ring focus:ring-secondary"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="claude">Claude</option>
              <option value="corporate">Corporate</option>
              <option value="ghibli">Ghibli</option>
              <option value="gourmet">Gourmet</option>
              <option value="luxury">Luxury</option>
              <option value="pastel">Pastel</option>
              <option value="slack">Slack</option>
              <option value="soft">Soft</option>
              <option value="spotify">Spotify</option>
              <option value="valorant">Valorant</option>
              <option value="vscode">VS Code</option>
            </select>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
