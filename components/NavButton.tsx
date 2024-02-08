import { on } from "events";
import React from "react";

interface props {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavButton({ title, isActive, onClick }: props) {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive && "bg-[#349182]"
      } hover:bg-[#349182] text-[#eff3f3] py-2 px-2 rounded font-bold`}
    >
      {title}
    </button>
  );
}

export default NavButton;
