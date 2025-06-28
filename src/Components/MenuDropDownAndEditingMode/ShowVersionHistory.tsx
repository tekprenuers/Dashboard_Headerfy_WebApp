import React from 'react';
import { RiCloseLine } from "react-icons/ri";

const ShowVersionHistory: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  return (
    <div className='w-[193px] h-[55px] rounded-[15px] bg-[#0F3F6F] shadow-[0px_4px_4px_0px_#00000040] flex justify-between items-start px-3 py-3'>
      <p className='font-[500] text-[10px] text-[#FFFFFF]'>
        This is version 1.2 launched June 14, 2025
      </p>
     
        <RiCloseLine
          size={16}
          onClick={onClose}
          className="text-white cursor-pointer"
        />
     
    </div>
  );
};

export default ShowVersionHistory;
