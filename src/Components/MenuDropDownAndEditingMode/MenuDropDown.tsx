import React from 'react';
import { RiArrowRightSLine  } from "react-icons/ri";
// import { PiPencilSimpleLine } from 'react-icons/pi';
// import { FiEdit } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { FiSearch } from 'react-icons/fi';





const MenuDropDown: React.FC = () => {
  return (
    <div>
      <div className='w-[197px] h-[auto] rounded-[15px] bg-[#0F3F6F] shadow-[0px_4px_4px_0px_#00000040] p-[10px]'>
        <div className='flex items-center justify-between'>
          <p className='font-[500] text-[14px] text-white'>Chims Project</p>
          <MdEdit size={20} className="text-[#ffffff]" />
        </div>

        <hr className='border-white mt-[30px] mb-[10px]' />

        <div className='flex items-center  justify-center gap-2 relative'>
          <input
    type="text"
    placeholder='Quick Search'
    className='w-[172px] h-[27px] rounded-[6px] border border-white text-white text-[10px] px-7 bg-transparent placeholder-white'
  />
  <FiSearch className='absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-[14px]' />
        </div>

        {[
          "Home",
          "Template",
          "Ai content generator",
          "Customize",
          "Export & Download",
          "Saved Design",
          "Pricing",
          "Help & Support",
          "Trash",
          "Show Version History",
          "Suggest improvement",
          "Log out"
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between pt-[10px] ml-[30px]">
            <p className="font-[500] text-[10px] text-white">{item}</p>
            <RiArrowRightSLine size={12} className="text-white" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuDropDown;
