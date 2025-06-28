import React, { useState } from "react";
import { CopyPlus, Trash2, Unlock } from "lucide-react";
import Add from "../../assets/Image/addbox.png";
import Template_1 from "../Templates/Template_1";

interface TemplatePreviewProps {
  onTextSelect?: (textId: string) => void;
  onBgColorChange?: (color: string) => void;
  selectedTextId?: string | null;
  currentBgColor?: string;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  onTextSelect,
  onBgColorChange,
  selectedTextId,
  currentBgColor,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleTemplateClick = (e: React.MouseEvent) => {
    // Check if we clicked on a text element (contentEditable)
    const target = e.target as HTMLElement;
    const isTextElement =
      target.contentEditable === "true" ||
      target.closest('[contenteditable="true"]');

    if (!isTextElement) {
      setIsSelected(!isSelected);
      onTextSelect?.("template");
    }
  };

  // ALTERNATIVE: Handle template selection from Template_1
  const handleTemplateSelect = () => {
    setIsSelected(!isSelected);
    onTextSelect?.("template");
  };

  return (
    <div className="">
      <div className="flex justify-end mb-3">
        {isSelected && (
          <div className="flex items-center border border-gray-100 rounded-2xl p-2 shadow-md space-x-1">
            <Unlock className="text-[#00000099] cursor-pointer" />
            <img src={Add} alt="" className="text-[#00000099] cursor-pointer" />
            <CopyPlus className="text-[#00000099] cursor-pointer" />
            <Trash2 className="text-[#00000099] cursor-pointer" />
          </div>
        )}
        {!isSelected && (
          <div className="flex space-x-1 text-[#00000099]">
            <img src={Add} alt="" className="text-[#00000099] cursor-pointer" />
            <CopyPlus className="text-[#00000099] cursor-pointer" />
            <Trash2 className="text-[#00000099] cursor-pointer" />
          </div>
        )}
      </div>
      {/* Document Preview */}
      <div className="relative cursor-pointer" onClick={handleTemplateClick}>
        <Template_1
          currentBgColor={currentBgColor}
          onBgColorChange={onBgColorChange}
          isSelected={isSelected}
          onTextSelect={onTextSelect}
          selectedTextId={selectedTextId}
          onTemplateSelect={handleTemplateSelect}
        />
      </div>
    </div>
  );
};

export default TemplatePreview;