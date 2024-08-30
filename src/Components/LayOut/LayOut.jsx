import { useState } from "react";
import Style from "./LayOut.module.css";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function LayOut() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log("Mounting LayOut");
  }, []);
  return (
    <>
      <Navbar />

      <div className="container mx-auto  max-w-screen-xl">
        <Outlet  />
        <Footer />
      </div>
    </>
  );
}

export default LayOut;
