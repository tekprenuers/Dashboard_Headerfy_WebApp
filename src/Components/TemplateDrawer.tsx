import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Template from "./Templates/Template";
import { useTemplate } from "../Context/TemplateContext";
import Projects from "./Projects/Projects";
import Upload from "./Upload/Upload";
import Elements from "./Elements/Elements";
import Text from "./Text/Text";
interface TemplateDrawerProps {
  showButton?: boolean;
}

const TemplateDrawer: React.FC<TemplateDrawerProps> = ({
  showButton = true,
}) => {
  const {
    isTemplateOpen,
    setIsTemplateOpen,
    selectedTemplate,
    setSelectedTemplate,
  } = useTemplate();

  return (
    <div className="">
      <div
        className={`absolute md:top-[89px] left-0 md:h-[82%] lg:top-[89px] lg:h-[82%] xl:top-[77px] xl:h-[86.9%] 2xl:h-[88.8%] 3xl:h-[93.2%] w-83 bg-[#003366F0] border-r z-20 
          shadow-md transform transition-transform duration-300 
          ${isTemplateOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full overflow-y-auto">
          <h2 className="p-1 font-semibold text-lg text-white"></h2>
          <div className="p-3 text-white">
            {/* Show bars only if selected */}
            {selectedTemplate === "Template" && <Template />}
            {selectedTemplate === "Element" && <Elements />}
            {selectedTemplate === "Text" && (
              <Text
                onFontSelect={(font: string) => {
                  console.log("Selected font:", font);
                }}
              />
            )}
            {selectedTemplate === "Upload" && <Upload />}
            {selectedTemplate === "Projects" && <Projects />}
          </div>
        </div>
      </div>

      {showButton && (
        <button
          onClick={() => {
            setIsTemplateOpen(!isTemplateOpen);
            if (isTemplateOpen) {
              setSelectedTemplate("");
            }
          }}
          className={`
          absolute top-70 bg-[#003366] border border-l-transparent border-[#003366f] text-white py-4 px-3 z-30
          transition-transform duration-300
          ${isTemplateOpen ? "translate-x-83" : "translate-x-0 "}
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
      )}
    </div>
  );
};

export default TemplateDrawer;
