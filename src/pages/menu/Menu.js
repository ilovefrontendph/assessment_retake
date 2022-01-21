import React from "react";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import Presentation from "../../components/Presentation";

function Menu() {
  return (
    <div className="flex flex-col justify-center items-center h-full pt-[50px] space-y-5 ">
      <Banner />
      <Presentation />

      {/* separator */}
      <div className="border-b-4 pt-[100px] border-[#2EE878] flex justify-center w-[275px] md:w-[400px]"></div>
      <Link to="/placeorder">
        <Button text={"Order Now"} />
      </Link>
    </div>
  );
}

export default Menu;
