import React from "react";
import logo from "../assets/logo.png";

function Logo() {
  return (
    <img
      className="h-[80px] w-[80px] transform scale-75 md:scale-100"
      src={logo}
    />
  );
}

export default Logo;
