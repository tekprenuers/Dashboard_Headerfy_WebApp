import React, { useState } from 'react';
import uploadIcon from '../../assets/image/upload.png';

interface AccountSettingsProps {
  onClose: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ onClose }) => {
  const [logo, setLogo] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
      <div className="w-[811px] bg-white rounded-[15px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer "
        >
          ×
        </button>

        <div className="space-y-4 mt-[30px]">
          {/* Input Fields */}
          {[
            { id: 'fullName', label: 'Full Name', placeholder: 'Clinton Williams', type: 'text' },
            { id: 'phoneNumber', label: 'Phone Number', placeholder: '09044523114', type: 'tel' },
            { id: 'companyName', label: "Company's Name", placeholder: 'Amazon', type: 'text' },
            { id: 'businessEmail', label: 'Business Email', placeholder: 'amazon@gmail.com', type: 'email' },
            { id: 'address', label: 'Address', placeholder: '20 Allen Avenue', type: 'text' },
            { id: 'websiteUrl', label: 'Website URL', placeholder: 'Add website URL if available', type: 'url' }
          ].map(({ id, label, placeholder, type }) => (
            <div key={id} className="flex justify-between items-center">
              <label htmlFor={id} className="text-[#000000B2] text-[16px] font-[500]">
                {label}
              </label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                className="w-[467px] h-[43px] border border-[#ECEEF1] bg-[#ECEEF1] text-[#666768] px-3 text-[14px] font-[300] focus:outline-none"
                required={id !== 'websiteUrl'}
              />
            </div>
          ))}

          {/* Business Logo Upload */}
          <div className="flex items-center justify-between">
            <label htmlFor="businessLogo" className="text-[#000000B2] text-[16px] font-[500]">
              Business Logo
            </label>
            <div className="w-[461px] h-[104px] border border-[#E7E9EC] rounded px-3 py-5 relative bg-white cursor-pointer">
              <input
                type="file"
                id="businessLogo"
                accept=".jpeg,.jpg,.webp,.png"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              {!logo ? (
                <div className="flex flex-col items-center justify-center pointer-events-none">
                  <img src={uploadIcon} alt="Upload" className="w-[28px] h-[23px]" />
                  <p className="text-[#545454] text-[16px] font-[400] mt-2">
                    Upload your logo here
                  </p>
                  <p className="text-[14px] text-[#BBC0C8] font-[400]">
                    (Only *.jpeg, *.webp and *.png images will be accepted)
                  </p>
                </div>
              ) : (
                <div className="relative w-[96px] h-[92px] border border-[#F53434]">
                  <img
                    src={logo}
                    alt="Business Logo"
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    onClick={handleRemoveLogo}
                    className="absolute top-[-6px] right-[-6px] w-[18px] h-[18px] bg-white border border-[#F53434] text-[#F53434] text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Billing & Delete Buttons */}
          <hr className="text-[#DFE0E0] w-full h-[1px] my-4" />
          <div className="flex items-center gap-[230px]">
            <label htmlFor="">Billings</label>
            <button className="text-[#000000B0] font-[500] text-[14px] w-[149px] h-[43px] border border-[#ECEEF1] rounded-[10px] bg-[#F3F4F6]">
              Billing Information
            </button>
          </div>
          <div className="flex items-center gap-[120px]">
            <label htmlFor="">Delete your Account</label>
            <button className="text-[#A91C1CE8] text-[16px] font-[500] w-[155px] h-[43px] border border-[#ECEEF1] rounded-[10px] bg-[#FE000014]">
              Delete Account
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-5">
            <button
              type="submit"
              className="w-[97px] h-[27px] bg-[#FF5733] hover:bg-[#E04B2B] text-white text-[10px] font-[600] rounded-[6px] transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
