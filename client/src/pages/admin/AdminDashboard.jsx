import React, { useEffect, useState } from "react";
import Sidebar from "../../components/adminDashboard/Sidebar";
import Overview from "../../components/adminDashboard/Overview";
import ManageResturants from "../../components/adminDashboard/ManageResturants";
import ManageRiders from "../../components/adminDashboard/ManageRiders";
import ManageCustomers from "../../components/adminDashboard/ManageCustomers";
import ManageFeedback from "../../components/adminDashboard/ManageFeedback";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const AdminDashboard = () => {
  const { isLogin, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);

  useEffect(() => {
    !isLogin && !isAdmin && navigate("/");
  }, [isLogin, isAdmin]);

  return (
    <>
      {isLogin && isAdmin && (
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
            {active === "manageResturant" && <ManageResturants />}
            {active === "manageRiders" && <ManageRiders />}
            {active === "manageCustomers" && <ManageCustomers />}
            {active === "manageFeedback" && <ManageFeedback />}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
