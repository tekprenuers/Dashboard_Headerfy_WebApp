import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiMiniArrowUturnLeft, HiMiniArrowUturnRight } from "react-icons/hi2";
import { IoChatbubbleOutline } from "react-icons/io5";
import { PiCrownLight, PiShareFatThin } from "react-icons/pi";
import { RiArrowDropDownLine } from "react-icons/ri";
import BusinessDetailsModal from "../Components/BusinessDetailsModal/BusinessDetailsModal";
import AccountSettings from "../Components/account-settings-billing-information/AccountSettings";
import BillingInformation from "../Components/account-settings-billing-information/BillingInformation";

const Header: React.FC = () => {
  const [modalState, setModalState] = useState<'business' | 'account' | 'billing' | null>(null);

  const closeModal = () => setModalState(null);
  const openBusiness = () => setModalState('business');
  const openAccount = () => setModalState('account');
  // const openBilling = () => setModalState('billing');

  return (
    <>
      <div className="flex items-center justify-between gap-2 bg-[#003366] py-4 px-4 text-white min-w-0">
        {/* Left Side */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <div className="flex items-center">
            <span className="text-sm">Name</span>
            <button className="opacity-80 hover:opacity-100">
              <RiArrowDropDownLine size={24} className="cursor-pointer" />
            </button>
          </div>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <button className="text-sm opacity-80 hover:opacity-100 hidden sm:block">Resize</button>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <div className="items-center flex gap-2">
            <button className="text-xs opacity-80 hover:opacity-100">
              <HiMiniArrowUturnLeft size={20} className="text-gray-400" />
            </button>
            <button className="text-xs opacity-80 hover:opacity-100">
              <HiMiniArrowUturnRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center border border-gray-100 px-3 py-3 rounded-md flex-1 min-w-0 max-w-md">
          <FiSearch className="text-white flex-shrink-0" />
          <input
            type="text"
            placeholder="Letterhead template"
            className="ml-2 text-sm w-full outline-none bg-transparent min-w-0"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <div className="flex items-center">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white text-xl font-semibold">
              D
            </button>
            <RiArrowDropDownLine size={24} className="cursor-pointer" />
          </div>
          <button className="border p-2 rounded-md transform scale-x-[-1] cursor-pointer">
            <IoChatbubbleOutline size={20} />
          </button>
          <button
            className="px-3 flex py-2 bg-[#FF5733] gap-1 rounded-md text-white text-sm font-medium cursor-pointer"
            onClick={openAccount}
          >
            <PiShareFatThin size={20} />
            Share
          </button>
          <button
            className="px-3 flex py-2 gap-2 border rounded-md text-white text-sm font-medium cursor-pointer"
            onClick={openBusiness}
          >
            <PiCrownLight size={20} className="text-[#FFD25F]" />
            Get Premium
          </button>
        </div>
      </div>

      {/* Modals */}
      {modalState === 'business' && (
        <div className="fixed inset-0 flex items-start justify-end z-50">
          <BusinessDetailsModal onClose={closeModal} />
        </div>
      )}
      {modalState === 'account' && (
        <div className="fixed inset-0 flex items-start justify-end z-50">
          <AccountSettings onClose={closeModal} onBillingClick={() => setModalState('billing')} />
        </div>
      )}
      {modalState === 'billing' && (
        <div className="fixed inset-0 flex items-start justify-end z-50">
          <BillingInformation onClose={() => setModalState('account')} />
        </div>
      )}
    </>
  );
};

export default Header;
