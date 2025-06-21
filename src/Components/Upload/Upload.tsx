import React, { useState } from 'react'
import searchIcon from "../../assets/Image/search.png"
import imgOne from "../../assets/Image/drive.png"
import imgTwo from "../../assets/Image/upload1.png"
import imgThree from "../../assets/Image/photos.png"

const Upload: React.FC = () => {
  const [mouseOver, setMouseOver] = useState(true)
  return (
    <div>
      <div className="text-[#fff]">
        <form className='relative'>
          <input type="text" placeholder='search for fonts and combination' className='w-full border border-[#fff] py-2 px-2 pl-[2rem] rounded text-[0.8rem] text-[#fff]' />
          <button className='absolute cursor-pointer top-3 left-3 text-[1.5rem]'><img src={searchIcon} alt="Search Icon" /></button>
        </form>
        <div className="w-full flex justify-between items-center py-2 bg-[#FF5733] rounded mt-4 pr-2 cursor-pointer">
          <div className="w-full"><p className='text-center'>Upload files</p></div>
          <div className="flex gap-1 cursor-pointer">
            <div className="bg-white w-1 h-1 rounded-full"></div>
            <div className="bg-white w-1 h-1 rounded-full"></div>
            <div className="bg-white w-1 h-1 rounded-full"></div>
          </div>
        </div>
        <div onMouseEnter={() => setMouseOver(false)} onMouseLeave={() => setMouseOver(true)} className="border border-dashed border-[#fff] mx-2 p-4 pb-8 bg-[#969696ad] mt-5 rounded flex flex-col gap-3 text-center cursor-pointer">
          {mouseOver ? (<div>
            <h4 className='text-[0.8rem]'>Drag media here to upload or connect an account...</h4>
            <div className=" w-full mt-2">
              <div className="flex gap-2 justify-center">
                <img src={imgOne} alt="Image" />
                <img src={imgTwo} alt="Image" />
                <img src={imgThree} alt="Image" />
              </div>
            </div>
          </div>)
            : (<div className="items-center text-center my-[15.3%]">
              <p>Drop Here</p>
            </div>)}
        </div>
        <p className="text-center text-[0.8rem] mt-3">You can upload images</p>
      </div>
    </div>
  )
}

export default Upload
