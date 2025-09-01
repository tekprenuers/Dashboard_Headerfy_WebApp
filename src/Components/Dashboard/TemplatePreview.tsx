import React from "react";
import { CopyPlus, Trash2, Unlock } from "lucide-react";
import Add from "../../assets/Image/addbox.png";
import Template_1 from "../Templates/Template_1";
import { Template_2 } from "../Templates/Template_2";
import { TemplateState } from "../../Components/Templates/slice/template.slice";

interface TemplatePreviewProps {
  // Template 1
  template1State: TemplateState;
  onTemplate1TextSelect: (textId: string) => void;
  onTemplate1BgColorChange: (color: string) => void;
  onTemplate1Select: () => void;

  // Template 2
  template2State: TemplateState;
  onTemplate2TextSelect: (textId: string) => void;
  onTemplate2BgColorChange: (color: string) => void;
  onTemplate2Select: () => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  template1State,
  onTemplate1TextSelect,
  onTemplate1BgColorChange,
  onTemplate1Select,

  template2State,
  onTemplate2TextSelect,
  onTemplate2BgColorChange,
  onTemplate2Select,
}) => {
  return (
    <div className="">
      <div className="flex justify-end mb-3">
        {template1State.isSelected && (
          <div className="flex items-center border border-gray-100 rounded-2xl p-2 shadow-md space-x-1">
            <Unlock className="text-[#00000099] cursor-pointer" />
            <img src={Add} alt="" className="text-[#00000099] cursor-pointer" />
            <CopyPlus className="text-[#00000099] cursor-pointer" />
            <Trash2 className="text-[#00000099] cursor-pointer" />
          </div>
        )}
        {!template1State.isSelected && (
          <div className="flex space-x-1 text-[#00000099]">
            <img src={Add} alt="" className="text-[#00000099] cursor-pointer" />
            <CopyPlus className="text-[#00000099] cursor-pointer" />
            <Trash2 className="text-[#00000099] cursor-pointer" />
          </div>
        )}
      </div>

      {/* Template 1 */}
      <div className="relative cursor-pointer mb-9">
        <Template_1
          currentBgColor={template1State.colors.bg}
          currentSidebarColor={template1State.colors.sidebar}
          currentShapeColor={template1State.colors.shape}
          onBgColorChange={onTemplate1BgColorChange}
          isSelected={template1State.isSelected}
          onTextSelect={onTemplate1TextSelect}
          selectedTextId={template1State.selectedTextId}
          onTemplateSelect={onTemplate1Select}
        />
      </div>

      {/* Template 2 */}
      <Template_2
        currentBgColor_Template_2={template2State.colors.bg}
        currentSidebarColor_Template_2={template2State.colors.sidebar}
        currentShapeColor_Template_2={template2State.colors.shape}
        onBgColorChange_Template_2={onTemplate2BgColorChange}
        onTextSelect_Template_2={onTemplate2TextSelect}
        selectedTextId_Template_2={template2State.selectedTextId}
        onTemplateSelect_Template_2={onTemplate2Select}
        isSelected_Template_2={template2State.isSelected}
      />
    </div>
  );
};

export default TemplatePreview;
