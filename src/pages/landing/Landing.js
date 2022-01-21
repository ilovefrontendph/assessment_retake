// Packages
import React, { useContext, useState } from "react";

// Pages, Comp
import Banner from "../../components/Banner";
import Button from "../../components/Button";
import Modal from "./../../components/Modal";
import LandingHandleModal from "./LandingHandleModal";

import { UserContext } from "../../shared/contexts/UserContext";
import Client from "../client/Client";
import Admin from "../admin/Admin";

function Landing() {
  const { showUser, setShowUser } = useContext(UserContext);
  // No User
  if (showUser === 0) {
    return <LandingWithoutUser />;
  }

  if (showUser === 1) {
    return <Client />;
  }

  if (showUser === 2) {
    return <Admin />;
  }
}

function LandingWithoutUser() {
  const [clientSignIn, setClientSignIn] = useState(false);
  const [adminSignIn, setAdminSignIn] = useState(false);
  const [userRegister, setUserRegister] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center h-full pt-[50px] space-y-5 ">
      {/* Modal Register */}
      {userRegister ? (
        <Modal
          content={<LandingHandleModal type={"register"} />}
          type={"register"}
          showModal={userRegister}
          setShowModal={setUserRegister}
          title={"User Register "}
        />
      ) : (
        ""
      )}
      {/* Modal Admin Signin */}
      {adminSignIn ? (
        <Modal
          content={<LandingHandleModal />}
          type={"admin"}
          showModal={adminSignIn}
          setShowModal={setAdminSignIn}
          title={"Admin Login "}
        />
      ) : (
        ""
      )}
      {/* Modal Client Signin */}
      {clientSignIn ? (
        <Modal
          content={<LandingHandleModal />}
          type={"client"}
          showModal={clientSignIn}
          setShowModal={setClientSignIn}
          title={"Client Login "}
        />
      ) : (
        ""
      )}
      <Banner />
      {/* register */}
      <Button
        text={"Create an Account Now!"}
        onClick={() => {
          setUserRegister(!userRegister);
        }}
      />
      {/* separator */}
      <div className="border-t-4  border-[#2EE878] flex justify-center w-[275px] md:w-[400px]">
        or
      </div>
      <div className="md:flex md:space-x-4">
        {/* login client */}
        <Button
          text={"Client Login"}
          size="small"
          onClick={() => {
            setClientSignIn(!clientSignIn);
          }}
        />
        {/* login admin */}
        <Button
          text={"Admin Login"}
          size="small"
          onClick={() => {
            setAdminSignIn(!adminSignIn);
          }}
        />
      </div>
    </div>
  );
}
export default Landing;
