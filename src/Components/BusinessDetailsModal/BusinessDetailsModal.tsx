import React, { useState } from 'react';
import EnterBusinessDetails from './EnterBusinessDetails';

interface BusinessDetailsModalProps {
  onClose: () => void;
}

const BusinessDetailsModal: React.FC<BusinessDetailsModalProps> = ({ onClose }) => {
  const [showBusinessDetails, setShowBusinessDetails] = useState(false);

  const handleProceed = () => {
    setShowBusinessDetails(true); 
  };

  const handleFormClose = () => {
    setShowBusinessDetails(false);
    onClose();
  };

  return (
    <>
      {!showBusinessDetails ? (
        <div className="w-[222px] bg-[#0F3F6F] text-white rounded-lg shadow-lg p-3">
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs font-semibold text-center w-full">
              Complete Your Business <br /> Info
            </p>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 text-lg cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] text-center px-2 font-poppins">
              To download your letterhead, please enter your business details (logo, email, phone, address, etc.).
            </p>
            <p className="text-[10px] text-center px-1">
              This helps personalize your template and enables full access
            </p>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleProceed}
              className="w-24 h-7 bg-[#FF5733] rounded-md font-semibold text-xs cursor-pointer"
            >
              Proceed
            </button>
          </div>
        </div>
      ) : (
        <EnterBusinessDetails onClose={handleFormClose} />
      )}
    </>
  );
};

export default BusinessDetailsModal;
