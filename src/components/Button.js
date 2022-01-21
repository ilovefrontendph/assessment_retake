import React from "react";

function Button(props) {
  return (
    <button
      type="submit"
      className={`p-6 flex justify-center  rounded-[38px] cursor-pointer transform scale-75 md:scale-100 font-bold ${
        props.size === "small" ? " w-[275px]" : " w-[400px]"
      }
      ${
        props.bg === "light"
          ? " bg-[#71F8A7] text-[#1CC25E]"
          : "  bg-[#2EE878] text-white"
      }`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
