import React from "react";
import NavButton from "./NavButton";
import { Bars3BottomRightIcon } from "@heroicons/react/16/solid";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { disconnect } from "process";

function Header() {
  const address = useAddress();
  const disconnect = useDisconnect();

  console.log(address);
  return (
    <header className=" bg-[#36a390] grid grid-cols-2 md:grid-cols-5 justify-between items-center">
      <div className="flex items-center space-x-2">
        <img
          className="rounded-full h-20 w-20"
          src=" /images/lotterry.png"
          alt=""
        />
        <div>
          <h1 className="text-lg text-[#eff3f3] font-bold">MINTBROS LOTTERY</h1>
          <p className="text-xs text-[#d4f1eb] truncate font-bold">
            Wallet: {address?.substring(0, 5)}...
            {address?.substring(address.length, address.length - 5)}
          </p>
        </div>
      </div>
      <div className="hidden md:flex md:col-span-3 items-center justify-center rounded-md">
        <div className="bg-[#29aa94] p-4 space-x-2">
          <NavButton isActive title="Enter Lottery" />
          <NavButton onClick={disconnect} title="Disconnet" />
        </div>
      </div>
      <div className="flex flex-col ml-auto text-right">
        <Bars3BottomRightIcon className="h-8 w-8 mx-auto text-[#eff3f3] cursor-pointer" />

        <span className="md:hidden">
          <NavButton onClick={disconnect} title="Disconnet" />
        </span>
      </div>
    </header>
  );
}

export default Header;
