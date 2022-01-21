import React, { useContext } from "react";
import { Link } from "react-router-dom";
import exit_btn from "../assets/close_btn.png";
import { UserContext } from "../shared/contexts/UserContext";

function Sidebar(props) {
  const { showUser, setShowUser } = useContext(UserContext);
  return (
    <div className="fixed w-full md:w-[497px] bg-[#2EE878] h-screen bottom-0 left-0 shadow-2xl z-20">
      {/* header */}
      <div className="flex justify-end p-4">
        <div
          className="cursor-pointer"
          onClick={() => {
            props.setShowModal(!props.showModal);
          }}
        >
          <img src={exit_btn} />
        </div>
      </div>
      {/* body */}
      <div className="flex flex-col justify-center md:pl-10 w-full h-full space-y-10 overflow-y-auto transform scale-75 md:scale-100 py-[100px]">
        {showUser === 1 && (
          <div className="text-[24px] font-bold text-white cursor-pointer">
            <Link to="/changecredentials">Change Credentials</Link>
          </div>
        )}

        <div className="text-[24px] font-bold text-white cursor-pointer">
          <Link to="/menu">Menu</Link>
        </div>
        <div className="text-[24px] font-bold text-white cursor-pointer">
          <Link to="/contact">Contact</Link>
        </div>
        <div className="text-[24px] font-bold text-white cursor-pointer">
          <Link to="/tech">TechStack</Link>
        </div>
        <div className="text-[24px] font-bold text-white cursor-pointer">
          <Link to="/placeorder">PlaceOrder</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
