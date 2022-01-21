import React from "react";
import presentation from "../assets/AnimatedPresentation.mp4";
function Presentation() {
  return (
    <div className="md:border-8 border-2 border-[#2EE878]">
      <video className="h-[320px] md:w-full md:mx-[10px]" controls>
        <source src={presentation} type="video/mp4" />
      </video>
    </div>
  );
}

export default Presentation;
