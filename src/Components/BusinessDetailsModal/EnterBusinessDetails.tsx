import React from 'react'

const EnterBusinessDetails:React.FC = () => {
  return (
    <div>
      <div className='w-[811px] h-[610px] bg-white rounded-[15px]'>
        <p className="text-[#003366] font-poppins font-normal text-[20px]">Basic Info</p>
        <hr className='text-[#DFE0E0] w-[742px] h-[1px] rounded-[11px]'/>
        <div className="business-info">

            <div className="fullName">
                <label className="w-[467px] height-[43px] rounded-[1px] bg-[#ECEEF1 border]" htmlFor="">Full Name</label>
                <input type="text" placeholder='Clinton Wiliams'/>
            </div>
            <div className="phoneNumber">
                <label className="w-[467px] height-[43px] rounded-[1px] bg-[#ECEEF1 border]" htmlFor="">Phone Number</label>
                <input type="text" placeholder='09044523114'/>
            </div>
            <div className="companyName">
                <label className="w-[467px] height-[43px] rounded-[1px] bg-[#ECEEF1 border]" htmlFor="">Company's Name</label>
                <input type="text" placeholder='Amazon'/>
            </div>
            <div className="businessEmail">
                <label className="w-[467px] height-[43px] rounded-[1px] bg-[#ECEEF1 border]" htmlFor="">Business Email</label>
                <input type="text" placeholder='Amazon@gmail.com'/>
            </div>
            <div className="address">
                <label className="w-[467px] height-[43px] rounded-[1px] bg-[#ECEEF1 border]" htmlFor="">Address</label>
                <input type="text" placeholder='20 allen avenue'/>
            </div>
            <div className="websiteUrl">
                <label className="w-[467px] height-[43px] rounded-[1px] bg-[#ECEEF1 border]" htmlFor="">Website URL</label>
                <input type="text" placeholder='Add website URL if available'/>
            </div>
            <div className="BusinessLogo">
                <label className="w-[467px] height-[43px] rounded-[1px] bg-[#ECEEF1 border]" htmlFor="">Business Logo</label>
                <input type="text" placeholder='Clinton Wiliams'/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default EnterBusinessDetails