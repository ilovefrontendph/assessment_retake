import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import nav_icon from "../assets/nav_icon.png";
import { UserContext } from "../shared/contexts/UserContext";
import { getAuth, signOut } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";

function Header() {
  const { showUser, setShowUser } = useContext(UserContext);
  const [showSideBar, setShowSideBar] = useState(false);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setShowUser(0);
        toast("Logout Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex w-screen justify-between items-center p-[50px] bg-[#2EE878] text-white">
      <Toaster />
      {showSideBar && (
        <Sidebar showModal={showSideBar} setShowModal={setShowSideBar} />
      )}
      <div className="flex items-center space-x-[10px]">
        <div
          className="flex lg:hidden w-[57px] md:w-[100px] pr-6 border-r-2 cursor-pointer"
          onClick={() => {
            setShowSideBar(true);
          }}
        >
          <img src={nav_icon} />
        </div>

        <Link to="/" className="cursor-pointer">
          <Logo />
        </Link>
      </div>
      <div className="hidden lg:flex lg:flex-row lg:space-x-4">
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
      {showUser === 1 || showUser === 2 ? (
        <Link
          to="/"
          className="text-[24px] font-bold text-white cursor-pointer"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
