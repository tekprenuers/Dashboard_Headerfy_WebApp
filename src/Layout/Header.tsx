import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiMiniArrowUturnLeft, HiMiniArrowUturnRight } from "react-icons/hi2";
import { IoChatbubbleOutline } from "react-icons/io5";
import { PiCrownLight, PiShareFatThin } from "react-icons/pi";
import { RiArrowDropDownLine } from "react-icons/ri";

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-[#003366] py-4 text-white">
      {/* Left Side: Name & Controls */}
      <div className="flex items-center gap-1">
        <div className="flex items-center">
          <span className="text-sm">Name</span>
          <button className="opacity-80 hover:opacity-100">
            <RiArrowDropDownLine size={24} className="cursor-pointer" />
          </button>
        </div>
        <span className="text-gray-400">|</span>
        <button className="text-sm opacity-80 hover:opacity-100">Resize</button>
        <span className="text-gray-400">|</span>
        <div className="items-center flex gap-2">
          <button className="text-xs opacity-80 hover:opacity-100">
            <HiMiniArrowUturnLeft size={20} className="text-gray-400" />
          </button>
          <button className="text-xs opacity-80 hover:opacity-100">
            <HiMiniArrowUturnRight size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center border border-gray-100  px-3 py-3 rounded-md w-150">
        <FiSearch className="text-white" />
        <input
          type="text"
          placeholder="Letterhead template"
          className="ml-2 text-sm w-full outline-none bg-transparent"
        />
      </div>

      {/* Right Side: Profile, Share, Premium */}
      <div className="flex items-center gap-1 mr-5">
        <div className="flex items-center">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white text-xl font-semibold">
            D
          </button>
          <RiArrowDropDownLine size={24} className="cursor-pointer" />
        </div>
        <button className="border p-2 rounded-md transform scale-x-[-1]">
          <IoChatbubbleOutline size={20} className="" />
        </button>
        <button className="px-3 flex py-2 bg-[#FF5733] gap-1 rounded-md text-white text-sm font-medium">
          <PiShareFatThin size={20} />
          Share
        </button>
        <button className="px-3 flex py-2 gap-2 border rounded-md text-white text-sm font-medium">
          <PiCrownLight size={20} className="text-[#FFD25F]" />
          Get Premium
        </button>
      </div>
    </div>
  );
};

export default Header;
