import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import TemplatePreview from "./TemplatePreview";
import AiAssistant from "../../assets/Image/Skull.png";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useZoom } from "../../Context/ZoomContext";
import question from "../../assets/Image/question.png";
import { useTemplate } from "../../Context/TemplateContext";

const TemplateDashboard: React.FC = () => {
  const { zoomLevel } = useZoom();
  const [isOpen, setIsOpen] = useState(false);
  const { isTemplateOpen } = useTemplate();

  return (
    <>
      <div
        className={`relative flex flex-col items-center justify-center p-6 transition-all duration-300 ${
          isTemplateOpen ? "ml-74" : "ml-0"
        }`}
      >
        <div className="absolute lg:ml-[45%] -left-[40%] bottom-[5%]  border-1 shadow-xl p-3 rounded-full bg-[#003366] border-b-white text-white text-center cursor-pointer">
          <img src={question} alt="" className="" />
        </div>

        {/* Document Preview */}
        <div
          className="max-h-[90vh] max-w-full overflow-auto z-20"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top center",
            transition: "transform 0.3s ease",
          }}
        >
          <TemplatePreview />
          {/* Add Page Button */}
          <button className="mt-4 flex items-center justify-center w-73 gap-2 bg-white border border-[#000000B0] px-4 py-1 rounded-md shadow hover:bg-gray-100 transition mb-5">
            <FiPlus className="text-gray-500" />
            Add page
          </button>
        </div>

        {/* AI Assistant Button */}
        <div className="mt-6 ml-[23%] z-10">
          <div
            onClick={() => setIsOpen(true)}
            className="relative lg:ml-[45%] border-3 shadow-2xl p-3 w-40 rounded-3xl bg-[#003366] border-b-white text-white text-center cursor-pointer"
          >
            Ai Assistant
            <img
              src={AiAssistant}
              alt="Ai Assistant"
              className="absolute -right-7"
            />
          </div>
        </div>

        {/* AI Assistant Modal */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-70"
              onClick={() => setIsOpen(false)}
            ></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: 150, y: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 150, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed top-[45%] right-[4%] transform -translate-x-1/2 -translate-y-1/2 z-80"
            >
              <div className="bg-[#003366] text-white rounded-xl p-6 w-[550px] shadow-2xl relative">
                <button
                  className="absolute top-3 right-3 text-white text-xl"
                  onClick={() => setIsOpen(false)}
                >
                  <X />
                </button>
                <h2 className="text-lg font-bold">Assistant Prompt</h2>
                <p className="text-sm mt-1 mb-6 text-[#FFFFFFC4]">
                  Do you want to write content for your letterhead body but
                  don’t know what to write? Write down your prompt and let our
                  AI assist you.
                </p>
                <div className="flex flex-col">
                  <label className="text-white font-medium">Prompt</label>
                  <textarea className="w-full p-2 h-40 rounded-md bg-gray-200 text-black outline-none"></textarea>
                </div>
                <div className="flex justify-end">
                  <button className="bg-[#FF5722] text-white px-4 py-1 mt-4 rounded-lg w-25">
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
};

export default TemplateDashboard;




// import React, { useState } from "react";
// import { FiPlus } from "react-icons/fi";
// import TemplatePreview from "./TemplatePreview";
// import AiAssistant from "../../assets/Image/Skull.png";
// import { X } from "lucide-react";
// import { motion } from "framer-motion";
// import { useZoom } from "../../Context/ZoomContext";
// import question from "../../assets/Image/question.png";
// import { useTemplate } from "../../Context/TemplateContext";

// const TemplateDashboard: React.FC = () => {
//   const { zoomLevel } = useZoom();
//   const [isOpen, setIsOpen] = useState(false);
//   const { isTemplateOpen } = useTemplate();

//   return (
//     <>
//       <div
//         className={`relative flex flex-col items-center justify-center p-6 transition-all duration-300  max-h-[90vh] max-w-full ${
//           isTemplateOpen ? "ml-74" : "ml-0"
//         }`}
//       >
//         <div className="absolute lg:ml-[45%] -left-[40%] bottom-[5%] border-1 shadow-xl p-3 rounded-full bg-[#003366] border-b-white text-white text-center cursor-pointer">
//           <img src={question} alt="" className="" />
//         </div>

//         {/* Container with zoom transformation */}
//         <div
//           className=""
//           style={{
//             transform: `scale(${zoomLevel})`,
//             transformOrigin: "top center",
//             transition: "transform 0.3s ease",
//           }}
//         >
//           <TemplatePreview />
//           {/* Add Page Button */}
//           <button className="mt-4 flex items-center justify-center w-73 gap-2 bg-white border border-[#000000B0] px-4 py-1 rounded-md shadow hover:bg-gray-100 transition mb-5">
//             <FiPlus className="text-gray-500" />
//             Add page
//           </button>

//           {/* AI Assistant Button - Moved inside the zoomed container */}
//           <div className="mt-6 ml-[100%]">
//             <div
//               onClick={() => setIsOpen(true)}
//               className="relative lg:ml-[45%] border-3 shadow-2xl p-3 w-40 rounded-3xl bg-[#003366] border-b-white text-white text-center cursor-pointer"
//             >
//               Ai Assistant
//               <img
//                 src={AiAssistant}
//                 alt="Ai Assistant"
//                 className="absolute -right-7"
//               />
//             </div>
//           </div>
//         </div>

//         {/* AI Assistant Modal - Kept outside the zoomed container */}
//         {isOpen && (
//           <>
//             <div
//               className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-70"
//               onClick={() => setIsOpen(false)}
//             ></div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.5, x: 150, y: 50 }}
//               animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
//               exit={{ opacity: 0, scale: 0.5, x: 150, y: 50 }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//               className="fixed top-[45%] right-[4%] transform -translate-x-1/2 -translate-y-1/2 z-80"
//             >
//               <div className="bg-[#003366] text-white rounded-xl p-6 w-[550px] shadow-2xl relative">
//                 <button
//                   className="absolute top-3 right-3 text-white text-xl"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   <X />
//                 </button>
//                 <h2 className="text-lg font-bold">Assistant Prompt</h2>
//                 <p className="text-sm mt-1 mb-6 text-[#FFFFFFC4]">
//                   Do you want to write content for your letterhead body but
//                   don't know what to write? Write down your prompt and let our
//                   AI assist you.
//                 </p>
//                 <div className="flex flex-col">
//                   <label className="text-white font-medium">Prompt</label>
//                   <textarea className="w-full p-2 h-40 rounded-md bg-gray-200 text-black outline-none"></textarea>
//                 </div>
//                 <div className="flex justify-end">
//                   <button className="bg-[#FF5722] text-white px-4 py-1 mt-4 rounded-lg w-25">
//                     Send
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default TemplateDashboard;