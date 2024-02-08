import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
// import { useMetamask } from "@thirdweb-dev/react";

function Login() {
  // const connect = ConnectWallet()
  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col items-center justify-center text-center">
      <div className="flex flex-col items-center mb-10">
        <img
          className="rounded-full h-56 w-56 mb-10"
          src=" /images/lotterry.png"
          alt=""
        />
        <h1 className="text-6xl text-[#eff3f3] font-bold">
          THE MINTBROS LOTTERY
        </h1>
        <h2 className="text-[#eff3f3]">
          Get on board by connecting with your Web3 Wallet
        </h2>
        {/* <button className="text-[#eff3f3] bg-[#349182] px-8 py-5 rounded-lg shadow-lg font-bold mt-10">
          Connect with your wallet
        </button> */}
        <div className="bg-neutral-900 px-5 py-4 rounded-lg shadow-lg font-bold mt-10">
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
}

export default Login;
