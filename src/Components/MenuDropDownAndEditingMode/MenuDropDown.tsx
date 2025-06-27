import React, { useState, useRef } from 'react';
import { RiArrowRightSLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { FiSearch } from 'react-icons/fi';
import ShowVersionHistory from './ShowVersionHistory';

const MenuDropDown: React.FC = () => {
  const [showVersion, setShowVersion] = useState(false);
  const [modalStyle, setModalStyle] = useState<React.CSSProperties>({});
  const versionItemRef = useRef<HTMLDivElement | null>(null);

  const handleItemClick = (item: string) => {
    if (item === "Show Version History" && versionItemRef.current) {
      const rect = versionItemRef.current.getBoundingClientRect();
      setModalStyle({
        position: "fixed",
        top: rect.top + window.scrollY,
        left: rect.left + rect.width + 15,
        zIndex: 9999,
      });
      setShowVersion(true);
    }
  };

  const handleModalClose = () => {
    setShowVersion(false);
  };

  const menuItems = [
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
  ];

  return (
    <>
      <div className='w-[90vw] max-w-[197px] rounded-[15px] bg-[#0F3F6F] shadow-[0px_4px_4px_0px_#00000040] p-[10px]'>
        <div className='flex items-center justify-between'>
          <p className='font-[500] text-[14px] text-white'>Chims Project</p>
          <MdEdit size={20} className="text-white" />
        </div>

        <hr className='border-white mt-[30px] mb-[10px]' />

        <div className='flex items-center justify-center gap-2 relative'>
          <input
            type="text"
            placeholder='Quick Search'
            className='w-[172px] h-[27px] rounded-[6px] border border-white text-white text-[10px] px-7 bg-transparent placeholder-white'
          />
          <FiSearch className='absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-[14px]' />
        </div>

        {menuItems.map((item, index) => (
          <div
            key={index}
            ref={item === "Show Version History" ? versionItemRef : null}
            onClick={() => handleItemClick(item)}
            className="flex items-center justify-between pt-[10px] ml-[30px] cursor-pointer"
          >
            <p className="font-[500] text-[10px] text-white">{item}</p>
            <RiArrowRightSLine size={12} className="text-white" />
          </div>
        ))}
      </div>

      {showVersion && (
        <div style={modalStyle}>
          <ShowVersionHistory onClose={handleModalClose} />
        </div>
      )}
    </>
  );
};

export default MenuDropDown;
