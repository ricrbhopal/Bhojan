import React, { useEffect, useState } from "react";
import Sidebar from "../components/userDashboard/Sidebar";
import Overview from "../components/userDashboard/Overview";
import Profile from "../components/userDashboard/Profile";
import Orders from "../components/userDashboard/Orders";
import Address from "../components/userDashboard/Address";
import ContactUs from "../components/userDashboard/ContactUs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);

  useEffect(() => {
    !isLogin && navigate("/");
  }, [isLogin]);

  return (
    <>
      {isLogin && (
        <div className="flex min-h-[91vh] ">
          <div
            className={`border border-success overflow-hidden ${
              isSideMenuOpen === true ? "w-[230px]" : "w-[60px]"
            } transition-all duration-200`}
          >
            <Sidebar
              active={active}
              setActive={setActive}
              isSideMenuOpen={isSideMenuOpen}
              setIsSideMenuOpen={setIsSideMenuOpen}
            />
          </div>
          <div className="border border-primary w-full p-3">
            {active === "overview" && <Overview />}
            {active === "profile" && <Profile />}
            {active === "orders" && <Orders />}
            {active === "address" && <Address />}
            {active === "contact" && <ContactUs />}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
