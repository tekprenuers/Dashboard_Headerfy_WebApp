import React from 'react';
import uploadIcon from '../../assets/image/upload.png';

interface EnterBusinessDetailsProps {
  onClose: () => void;
}

const EnterBusinessDetails: React.FC<EnterBusinessDetailsProps> = ({ onClose }) => {
  return (
    <div className="relative opacity-100">
      <div className="w-[811px] h-[auto] bg-white rounded-[15px] p-6 flex flex-col justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <p className="text-[#003366] font-poppins font-normal text-[20px] font-[400]">Basic Info</p>
        <hr className="text-[#DFE0E0] w-[742px] h-[1px] rounded-[11px]" />
        <div className="business-info pr-[20px] space-y-3 mt-[30px]">
          {/* Existing Inputs */}
          
          <div className="fullName flex justify-between item-center">
            <label
              className="text-[#000000B2] mb-1 text-[16px] font-[500]"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Clinton Wiliams"
              className="w-[467px] h-[43px] border-[1px] text-[#666768] border-[#ECEEF1] px-3 bg-[#ECEEF1] font-[300] text-[14px]"
            />
          </div>

          <div className="phoneNumber flex justify-between item-center">
            <label
              className="text-[#000000B2] mb-1 text-[16px] font-[500]"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="09044523114"
              className="w-[467px] h-[43px] rounded border-[1px] text-[#666768] border-[#ECEEF1] px-3 bg-[#ECEEF1] font-[300] text-[14px]"
            />
          </div>

          <div className="companyName flex justify-between item-center">
            <label
              className="text-[#000000B2] mb-1 text-[16px] font-[500]"
              htmlFor="companyName"
            >
              Company's Name
            </label>
            <input
              type="text"
              id="companyName"
              placeholder="Amazon"
              className="w-[467px] h-[43px] border-[1px] text-[#666768] border-[#ECEEF1] px-3 bg-[#ECEEF1] font-[300] text-[14px]"
            />
          </div>

          <div className="businessEmail flex justify-between item-center">
            <label
              className="text-[#000000B2] mb-1 text-[16px] font-[500]"
              htmlFor="businessEmail"
            >
              Business Email
            </label>
            <input
              type="text"
              id="businessEmail"
              placeholder="Amazon@gmail.com"
              className="w-[467px] h-[43px] border-[1px] text-[#666768] border-[#ECEEF1] px-3 bg-[#ECEEF1] font-[300] text-[14px]"
            />
          </div>

          <div className="address flex justify-between item-center">
            <label
              className="text-[#000000B2] mb-1 text-[16px] font-[500]"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="20 allen avenue"
              className="w-[467px] h-[43px] border-[1px] text-[#666768] border-[#ECEEF1] px-3 bg-[#ECEEF1] font-[300] text-[14px]"
            />
          </div>

          <div className="websiteUrl flex justify-between item-center">
            <label
              className="text-[#000000B2] mb-1 text-[16px] font-[500]"
              htmlFor="websiteUrl"
            >
              Website URL
            </label>
            <input
              type="text"
              id="websiteUrl"
              placeholder="Add website URL if available"
              className="w-[467px] h-[43px] border-[1px] text-[#666768] border-[#ECEEF1] px-3 bg-[#ECEEF1] font-[300] text-[14px]"
            />
          </div>

          
          <div className="BusinessLogo flex items-center justify-between">
            <label
              className="text-[#000000B2] mb-1 text-[16px] font-[500]"
              htmlFor="businessLogo"
            >
              Business Logo
            </label>
            <div className="w-[461px] h-[104px] border-[1px] border-[#E7E9EC] rounded px-3 py-5  relative bg-white cursor-pointer">
              <input
                type="file"
                id="businessLogo"
                accept=".jpeg, .webp, .png"
                className="absolute inset-0 opacity-0 cursor-pointer w-[467px] h-[43px]"
              />
              <div className="flex flex-col items-center justify-center space-x-3 pointer-events-none">
                <img src={uploadIcon} alt="Upload" className="w-[28px] h-[23px]" />
                <div className="text-gray-500 text-sm text-center">
                  <p className="text-[16px] text-[#545454] font-[400] font-[inter]">Upload your logo here</p>
                  <p className="text-[14px] text-[#BBC0C8] font-[400]">
                    (Only *.jpeg, *.webp and *.png images will be accepted)
                  </p>
                </div>
              </div>
            </div>
          </div>
        <div className='flex items-center mt-[20px] justify-end '>
                  <button className=' w-[97px] h-[27px] rounded-[6px] font-[600] text-[10px] text-white bg-[#FF5733] cursor-pointer'>Send</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EnterBusinessDetails;
