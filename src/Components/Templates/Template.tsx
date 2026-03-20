// import { useState } from "react";
// import Template_1 from "./Template_1";
// import { Template_2 } from "./Template_2";
// import { Plus } from "lucide-react";
// import { UseTemplateSlice } from "./hook/use-template.hook";

// interface TemplateProps {
//   isReadOnly: boolean;
// }

// const Template: React.FC<TemplateProps> = ({ isReadOnly = true }) => {
//   const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
//   const { handleAddTemplate } = UseTemplateSlice(); 

//   return (
//     <div className="flex flex-col items-center cursor-pointer gap-6">
//       {/* Template 1 */}
//       <div
//         className="relative scale-85 -mt-4"
//         onClick={() => setActiveTemplate("template1")}
//       >
//         <Template_1 isReadOnly={isReadOnly} />

//         {activeTemplate === "template1" && (
//           <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent closing when clicking the button
//                 console.log("Template 1 selected ✅");
//                 handleAddTemplate("template_1");
//                 setActiveTemplate(null);
//               }}
//               className="px-6 py-3 bg-white text-black font-medium rounded-lg shadow-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
//             >
//               <Plus size={20}/> Use Template
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Template 2 */}
//       <div
//         className="relative scale-85 -mt-4"
//         onClick={() => setActiveTemplate("template2")}
//       >
//         <Template_2 isReadOnly={isReadOnly} />

//         {activeTemplate === "template2" && (
//           <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 console.log("Template 2 selected ✅");
//                 handleAddTemplate("template_2");
//                 setActiveTemplate(null);
//               }}
//               className="px-6 py-3 bg-white text-black font-medium rounded-lg shadow-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
//             >
//               <Plus size={20}/> Use Template
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Template;


import { useState } from "react";
import Template_1 from "./Template_1";
import { Template_2 } from "./Template_2";
import { Plus } from "lucide-react";
import { UseTemplateSlice } from "./hook/use-template.hook";
import { useDispatch } from "react-redux";
import { setActiveTemplate } from "./slice/template.slice";
import { useTemplate } from "../../Context/TemplateContext";

interface TemplateProps {
  isReadOnly: boolean;
}

const Template: React.FC<TemplateProps> = ({ isReadOnly = true }) => {
  const [overlayTemplate, setOverlayTemplate] = useState<string | null>(null);
  const { handleAddTemplate } = UseTemplateSlice();
  const dispatch = useDispatch();
  const { setIsTemplateOpen, setSelectedTemplate } = useTemplate();

  const handleSelectTemplate = (templateId: "template_1" | "template_2") => {
    dispatch(setActiveTemplate(templateId));
    handleAddTemplate(templateId);
    // Close the drawer after selecting
    setIsTemplateOpen(false);
    setSelectedTemplate("");
  };

  return (
    <div className="flex flex-col items-center cursor-pointer gap-6">
      {/* Template 1 */}
      <div
        className="relative scale-85 -mt-4"
        onClick={() => setOverlayTemplate("template1")}
      >
        <Template_1 isReadOnly={isReadOnly}  templateId="template_1" />

        {overlayTemplate === "template1" && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Template 1 selected ✅");
                handleSelectTemplate("template_1");
                setOverlayTemplate(null); // ✅ no conflict
              }}
              className="px-6 py-3 bg-white text-black font-medium rounded-lg shadow-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Use Template
            </button>
          </div>
        )}
      </div>

      {/* Template 2 */}
      <div
        className="relative scale-85 -mt-4"
        onClick={() => setOverlayTemplate("template2")}
      >
        <Template_2 isReadOnly={isReadOnly}  templateId="template_2" />

        {overlayTemplate === "template2" && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Template 2 selected ✅");
                handleSelectTemplate("template_2");
                setOverlayTemplate(null); // ✅ no conflict
              }}
              className="px-6 py-3 bg-white text-black font-medium rounded-lg shadow-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Use Template
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template;
