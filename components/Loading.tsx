import React from "react";
import { PropagateLoader } from "react-spinners";

function Loading() {
  return (
    <div>
      <div className="bg-neutral-900 h-screen flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2 mb-10">
          <img
            className="roundede-full h-20 w-20"
            src="/images/lotterry.png"
            alt=""
          />
          <h1 className="text-lg text-[#eff3f3] font-bold">
            Loading the MINTBROS LOTTERY
          </h1>
        </div>
        <PropagateLoader color="#d4f1eb" size={30} />
      </div>
    </div>
  );
}

export default Loading;
