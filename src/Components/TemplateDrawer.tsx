import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Template_1 from "./Templates/Template";
import { useTemplate } from "../Context/TemplateContext";
import Projects from "./Projects/Projects";
import Draw from "./Draw/Draw";
import Upload from "./Upload/Upload";
import Elements from "./Elements/Elements";
import Text from "./Text/Text";

const TemplateDrawer: React.FC = () => {
  const { isTemplateOpen, setIsTemplateOpen, selectedTemplate, setSelectedTemplate } = useTemplate();

 

  return (
    <div className="">
      {/* 
        Drawer Panel 
        - fixed to the left, full height (h-screen), width 16rem (w-64)
        - slides in/out using translate-x classes
        - overflow-y-auto makes the content scrollable 
      */}
      <div
        className={`absolute top-0  left-0 h-full w-74 bg-[#003366F0] border-r z-20
          shadow-md transform transition-transform duration-300 
          ${isTemplateOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full overflow-y-auto pt-20">
          <h2 className="p-1 font-semibold text-lg text-white"></h2>
          <div className="p-3 text-white">
            {/* Show bars only if selected */}
            {selectedTemplate === "Template" && <Template_1 />}
            {selectedTemplate === "Element" && <Elements />}
            {selectedTemplate === "Text" && (
              <Text onFontSelect={(font: string) => {
                // TODO: handle font selection here
                console.log("Selected font:", font);
              }} />
            )}
            {selectedTemplate === "Upload" && <Upload />}
            {selectedTemplate === "Draw" && <Draw />}
            {selectedTemplate === "Projects" && <Projects />}
          </div>
        </div>
      </div>

      {/* 
        Toggle Button with Angled Shape 
        - fixed position, placed at top-60
        - slides horizontally by 16rem (64 in Tailwind = 16rem = 256px) 
          so it aligns with the drawer’s edge
      */}
      <button
        onClick={() => {
          setIsTemplateOpen(!isTemplateOpen);
          if (isTemplateOpen) {
            setSelectedTemplate(""); // Reset when closing
          }
        }}
        className={`
          absolute top-50 bg-[#003366] border border-l-transparent border-[#003366f] text-white py-4 px-3 z-30
          transition-transform duration-300
          ${isTemplateOpen ? "translate-x-74" : "translate-x-0 "}
        `}
        style={{
          clipPath: "polygon(0% 0%, 100% 20%, 100% 80%, 0% 100%)",
          width: "5px",
          height: "120px",
        }}
      >
        {isTemplateOpen ? (
          <FaAngleLeft size={20} className="pr-3" />
        ) : (
          <FaAngleRight size={20} className="pr-3" />
        )}
      </button>
    </div>
  );
};

export default TemplateDrawer;
