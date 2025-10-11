import React, { useEffect, useState } from "react";
import Sidebar from "../components/resturantDashboard/Sidebar";
import Overview from "../components/resturantDashboard/Overview";
import Profile from "../components/resturantDashboard/Profile";
import Menu from "../components/resturantDashboard/Menu";
import Orders from "../components/resturantDashboard/Orders";
import Transactions from "../components/resturantDashboard/Transactions";
import Feedback from "../components/resturantDashboard/Feedback";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ResturantDashboard = () => {
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
        <div className="flex min-h-[91vh]">
          <div
            className={`border overflow-hidden ${
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
          <div className="border w-full p-4">
            {active === "overview" && <Overview />}
            {active === "profile" && <Profile />}
            {active === "menu" && <Menu />}
            {active === "orders" && <Orders />}
            {active === "transactions" && <Transactions />}
            {active === "feedback" && <Feedback />}
          </div>
        </div>
      )}
    </>
  );
};

export default ResturantDashboard;
