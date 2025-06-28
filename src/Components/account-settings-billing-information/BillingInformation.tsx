import React from 'react';

interface BillingProps {
  onClose: () => void;
}

const BillingInformation: React.FC<BillingProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center  overflow-auto z-50">
      <div className="w-[507px] max-h-[90vh] overflow-y-auto bg-white rounded-[15px] p-6 relative shadow-[0px_4px_4px_0px_#00000040]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
        >
          ×
        </button>

        <p className="font-[500] text-[16px] text-[#000000B2]">Billing Information</p>

        <div className="space-y-4 mt-4">
          <div>
            <p className="font-[500] text-[14px] text-[#666768]">Credit Card Number</p>
            <input
              type="text"
              placeholder="Credit Card Number"
              className="w-full bg-[#F3F4F6] border border-[#ECEEF1] px-2 py-1 rounded"
            />
          </div>

          <div>
            <p className="font-[500] text-[14px] text-[#666768]">Expiration Date</p>
            <input
              type="date"
              className="w-full bg-[#F3F4F6] border border-[#ECEEF1] px-2 py-1 rounded"
            />
          </div>

          <div>
            <p className="font-[500] text-[14px] text-[#666768]">CVC</p>
            <input
              type="text"
              placeholder="CVC"
              className="w-full bg-[#F3F4F6] border border-[#ECEEF1] px-2 py-1 rounded"
            />
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button className="font-[600] text-[10px] text-white bg-[#FF5733] w-[97px] h-[27px] rounded-[6px]">
            Update Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingInformation;
