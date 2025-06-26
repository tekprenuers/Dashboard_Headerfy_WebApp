

import React from 'react'

const MenuDropDown : React.FC = ()=>{
return(
    <div>
        <div className='w-[197px] h-[343px] rounded-[15px] bg-[#0F3F6F] box-shadow-[0px 4px 4px 0px #00000040]
p-[10px]'>
            <div className='flex align-center justify-space-between'>
                <p className='font-[500] text-[14px] text-[#FFFFFF]'>Chims Project</p>
                <i></i>
            </div>
            <hr className='color-[#FFFFFF] mt-[15px] mb-[10px]'/>
            <div><i></i><input type="text" placeholder='Quick Search' className='w-[172px] h-[27px]
rounded-[6px] border border-[#FFFFFF] font[400] text[10px] text-[#FFFFFF]'/></div>
            
            <div className="flex align-center justify-space-around pt-[10px]">
                <p className="font-[500] text-[10px] text-[#FFFFFF]">Home</p>
                <i></i>
            </div>
            <div className="flex align-center justify-space-around pt-[5px]">
                <p className="font-[500] text-[10px] text-[#FFFFFF]">Template</p>
                <i></i>
            </div>
             <div className="flex align-center justify-space-around pt-[10px]">
                <p className="font-[500] text-[10px] text-[#FFFFFF]">Ai content generator</p>
                <i></i>
            </div>
             <div className="flex align-center justify-space-around pt-[10px]">
                <p className="font-[500] text-[10px] text-[#FFFFFF]">Customize</p>
                <i></i>
            </div>
             <div className="flex align-center justify-space-around">
                <p className="font-[500] text-[10px] text-[#FFFFFF]">Export & Download</p>
                <i></i>
            </div>
             <div className="flex align-center justify-space-around">
                <p className="font-[500] text-[10px] text-[#FFFFFF]">Saved Design</p>
                <i></i>
            </div>
             <div className="flex align-center justify-space-around">
                <p className="font-[500] text-[10px] text-[#FFFFFF]">Pricing</p>
                <i></i>
            </div>
             <div className="flex align-center justify-space-around">
                <p className="font-[500] text-[10px] text-[#FFFFFF]">Help & Support</p>
                <i></i>
            </div>
             <div className="flex align-center justify-space-around">
                <p className="font-[500] text-[10px] text-[#FFFFFF]">Trash</p>
                <i></i>
            </div>
             <div className="flex align-center justify-space-around">
                <p className="font-[500] text-[10px] text-[#FFFFFF]">Show Version Histroy</p>
                <i></i>
            </div>
           <div className="flex align-center justify-space-around">
                <p className="font-[500] text-[10px] text-[#FFFFFF]">Suggest improvement</p>
                <i></i>
            </div>
             <div className="flex align-center justify-space-around">
                <p className="font-[500] text-[10px] text-[#FFFFFF]">Log out</p>
                <p>8</p>
            </div>

        </div>
    </div>
)
}
export default MenuDropDown 