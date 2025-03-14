import React, { useState } from "react";
import { FiPlus } from "react-icons/fi"; // Icon for "Add page" button
import TemplatePreview from "./TemplatePreview";
import AiAssistant from "../../assets/Image/Skull.png";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const TemplateDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-6">
      {/* Document Preview */}
      <TemplatePreview />

      {/* Add Page Button */}
      <button className="mt-4 flex items-center justify-center w-73 gap-2 bg-white border border-[#000000B0] px-4 py-1 rounded-md shadow hover:bg-gray-100 transition">
        <FiPlus className="text-gray-500" />
        Add page
      </button>

      {/* AI Assistant Button */}
      <div
        onClick={() => setIsOpen(true)}
        className="relative  lg:ml-[45%] border-3  shadow-2xl p-3 w-40 rounded-3xl bg-[#003366] border-b-white text-white  text-center"
      >
        Ai Assistant
        <img
          src={AiAssistant}
          alt="Ai Assistant"
          className="absolute -right-7"
        />
      </div>

      {/* AI Assistant Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: -150, y: 50 }} // Start small & from AI button
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }} // Move to the center smoothly
          exit={{ opacity: 0, scale: 0.5, x: 150, y: 50 }} // Animate when closing
          transition={{ duration: 0.4, ease: "easeOut" }} // Smooth transition
          className="fixed top-[45%] right-[-10%] transform -translate-x-1/2 -translate-y-1/2 bg-opacity-50">
          <div className="bg-[#003366] text-white rounded-lg p-6 w-[450px] shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-white text-xl"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            {/* Modal Content */}
            <h2 className="text-lg font-bold">Assistant Prompt</h2>
            <p className="text-sm mt-1 mb-6 text-[#FFFFFFC4]">
              Do you want to write content for your letterhead body but don’t
              know what to write? Write down your prompt and let our AI assist
              you.
            </p>

            {/* Prompt Input */}
            <div className="flex flex-col">
              <label className="text-white font-medium">Prompt</label>
              <textarea className="w-full p-2 h-40 rounded-md bg-gray-200 text-black outline-none"></textarea>
            </div>

            {/* Send Button */}
            <div className="flex justify-end">
              <button className="bg-[#FF5722] text-white px-4 py-1 mt-4 rounded-lg w-25">
                Send
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* The footer */}
      <div className="flex items-center lg:ml-[55%] lg:mt-25 gap-2 text-gray-700 text-sm ">
        <span>page 1/1</span>
        <div className="relative w-40 h-1 bg-[#D9D9D9] rounded-full">
          {/* Dummy progress fill */}
          <div className="absolute top-0 left-0 h-full bg-[#d9d9d9] rounded-full w-[20%]"></div>

          {/* Dummy thumb (rounded indicator) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-[20%] w-3 h-3 bg-white border-3 border-[#d9d9d9] rounded-full"></div>
        </div>
        <span>20%</span>
      </div>
    </div>
  );
};

export default TemplateDashboard;
