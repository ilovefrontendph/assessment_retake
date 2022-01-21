import React from "react";
import Logo from "./Logo";
import close_btn from "../assets/close_btn.png";
function Modal(props) {
  return (
    <div className="fixed justify center items-center h-screen w-full md:w-screen bg-black/[0.5] left-0 top-0 z-10">
      {/* Header */}
      <div className="flex w-screen justify-evenly items-center p-[10px] md:p-[50px] bg-[#2EE878] text-white space-x-4">
        <div>
          <Logo />
        </div>
        <div>{props.title}</div>

        <div
          className="cursor-pointer"
          onClick={() => {
            props.setShowModal(!props.showModal);
          }}
        >
          <img src={close_btn} />
        </div>
      </div>
      {/* Body */}
      {props.content}
    </div>
  );
}

export default Modal;
