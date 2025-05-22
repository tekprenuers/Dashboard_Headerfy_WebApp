import React from 'react'

interface EnterBusinessDetailsProps {
  onClose: () => void;
}

const EnterBusinessDetails: React.FC<EnterBusinessDetailsProps> = ({ onClose }) => {
  return (
    <div className="relative opacity-100">
      <div className='w-[711px] h-auto bg-white rounded-[15px] p-6'>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <p className="text-[#003366] font-poppins font-normal text-[20px]">Basic Info</p>
        <hr className='text-[#DFE0E0] w-[742px] h-[1px] rounded-[11px]'/>
        <div className="business-info mt-4 space-y-4">
            <div className="fullName flex justify-between item-center">
                <label className="block text-gray-700 mb-1 text-sm font-bold" htmlFor="fullName">Full Name</label>
                <input 
                  type="text" 
                  id="fullName"
                  placeholder='Clinton Wiliams'
                  className="w-[467px] h-[43px] rounded border border-[#ECEEF1] px-3 bg-[#ECEEF1] font-[poppins] font-[300] text-[14]"
                />
            </div>
            <div className="phoneNumber flex justify-between item-center">
                <label className="block text-gray-700 mb-1 text-sm font-bold" htmlFor="phoneNumber">Phone Number</label>
                <input 
                  type="text" 
                  id="phoneNumber"
                  placeholder='09044523114'
                  className="w-[467px] h-[43px] rounded border border-[#ECEEF1] px-3 bg-[#ECEEF1] font-[poppins] font-[300] text-[14]"
                />
            </div>
            <div className="companyName flex justify-between item-center">
                <label className="block text-gray-700 mb-1 text-sm font-bold" htmlFor="companyName">Company's Name</label>
                <input 
                  type="text" 
                  id="companyName"
                  placeholder='Amazon'
                  className="w-[467px] h-[43px] rounded border border-[#ECEEF1] px-3 bg-[#ECEEF1] font-[poppins] font-[300] text-[14]"
                />
            </div>
            <div className="businessEmail flex justify-between item-center">
                <label className="block text-gray-700 mb-1 text-sm font-bold" htmlFor="businessEmail">Business Email</label>
                <input 
                  type="text" 
                  id="businessEmail"
                  placeholder='Amazon@gmail.com'
                  className="w-[467px] h-[43px] rounded border border-[#ECEEF1] px-3 bg-[#ECEEF1] font-[poppins] font-[300] text-[14]"
                />
            </div>
            <div className="address flex justify-between item-center">
                <label className="block text-gray-700 mb-1 text-sm font-bold" htmlFor="address">Address</label>
                <input 
                  type="text" 
                  id="address"
                  placeholder='20 allen avenue'
                  className="w-[467px] h-[43px] rounded border border-[#ECEEF1] px-3 bg-[#ECEEF1] font-[poppins] font-[300] text-[14]"
                />
            </div>
            <div className="websiteUrl flex justify-between item-center">
                <label className="block text-gray-700 mb-1 text-sm font-bold" htmlFor="websiteUrl">Website URL</label>
                <input 
                  type="text" 
                  id="websiteUrl"
                  placeholder='Add website URL if available'
                  className="w-[467px] h-[43px] rounded border border-[#ECEEF1] px-3 bg-[#ECEEF1] font-[poppins] font-[300] text-[14]"
                />
            </div>
            <div className="BusinessLogo flex justify-between item-center">
                <label className="block text-gray-700 mb-1 text-sm font-bold" htmlFor="businessLogo">Business Logo</label>
                <input 
                  type="file" 
                  id="businessLogo"
                  className="w-[467px] h-[43px] rounded border border-[#ECEEF1] px-3 py-2"
                />
            </div>
        </div>
      </div>
    </div>
  )
}

export default EnterBusinessDetails