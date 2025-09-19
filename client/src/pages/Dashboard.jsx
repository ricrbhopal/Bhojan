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

  useEffect(() => {
    !isLogin && navigate("/");
  }, [isLogin]);

  return (
    <>
      {isLogin && (
        <div className="flex min-h-[91vh] ">
          <div className="border border-success w-3/17">
            <Sidebar active={active} setActive={setActive} />
          </div>
          <div className="border border-primary w-14/17">
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
