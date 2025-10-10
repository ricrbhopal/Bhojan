import React from "react";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Bhojan | Home";
  }, []);
  
  return <div>Home</div>;
};

export default Home;
