import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("BhojanUser")) || ""
  );
  const [isLogin, setIsLogin] = useState(!!user);
  const [isAdmin, setIsAdmin] = useState(user?.role === "admin");
  const [isResturant, setIsResturant] = useState(user?.role === "resturant");
  const [isRider, setIsRider] = useState(user?.role === "rider");

  useEffect(() => {
    // if (user) {
    //   setIsLogin(true);
    // } else {
    //   setIsLogin(false);
    // }

    setIsLogin(!!user);

    // if (user && user.role === "admin") {
    //   setIsAdmin(true);
    // } else {
    //   setIsAdmin(false);
    // }

    setIsAdmin(user?.role === "admin");
    setIsResturant(user?.role === "resturant");
    setIsRider(user?.role === "rider");
  }, [user]);

  const value = {
    user,
    setUser,
    isLogin,
    setIsLogin,
    isAdmin,
    setIsAdmin,
    isResturant,
    setIsResturant,
    isRider,
    setIsRider,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
