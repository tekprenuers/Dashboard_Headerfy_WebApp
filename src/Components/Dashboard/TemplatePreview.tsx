import React from 'react'
import { CopyPlus, Trash2 } from "lucide-react";
import Add from "../../assets/Image/addbox.png"

const TemplatePreview:React.FC = () => {
  return (
    <div className="">
      <div className="flex justify-end text-[#00000099] mb-2">
        {/* <PlusSquare /> */}
        <img src={Add} alt="" className='text-[#00000099]'/>
        <CopyPlus className='text-[#00000099]'/>
        <Trash2 className='text-[#00000099]'/>
      </div>
      {/* Document Preview */}
      <div className='h-90 bg-amber-800 w-73 rounded-lg text-center text-white'>template preview</div>
    </div>
  );
}

export default TemplatePreview
