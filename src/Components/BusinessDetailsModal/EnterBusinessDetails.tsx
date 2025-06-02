import React, { useState } from 'react';
import uploadIcon from '../../assets/image/upload.png';

interface EnterBusinessDetailsProps {
  onClose: () => void;
}

const EnterBusinessDetails: React.FC<EnterBusinessDetailsProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    companyName: '',
    businessEmail: '',
    address: '',
    websiteUrl: '',
    businessLogo: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        businessLogo: e.target.files![0]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="w-[811px] bg-white rounded-[15px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
        >
          ×
        </button>

        <p className="text-[#003366] font-poppins text-[20px] font-[400]">Basic Info</p>
        <hr className="text-[#DFE0E0] w-full h-[1px] my-4" />

        <form onSubmit={handleSubmit} className="space-y-4">
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
                value={(formData as any)[id]}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-[467px] h-[43px] border border-[#ECEEF1] bg-[#ECEEF1] text-[#666768] px-3 text-[14px] font-[300] focus:outline-none"
                required={id !== 'websiteUrl'}
              />
            </div>
          ))}

         
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
              <div className="flex flex-col items-center justify-center pointer-events-none">
                <img src={uploadIcon} alt="Upload" className="w-[28px] h-[23px]" />
                <p className="text-[#545454] text-[16px] font-[400] font-[inter] mt-2">
                  {formData.businessLogo ? formData.businessLogo.name : 'Upload your logo here'}
                </p>
                <p className="text-[14px] text-[#BBC0C8] font-[400]">
                  (Only *.jpeg, *.webp and *.png images will be accepted)
                </p>
              </div>
            </div>
          </div>

        
          <div className="flex justify-end mt-5">
            <button
              type="submit"
              className="w-[97px] h-[27px] bg-[#FF5733] hover:bg-[#E04B2B] text-white text-[10px] font-[600] rounded-[6px] transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnterBusinessDetails;
