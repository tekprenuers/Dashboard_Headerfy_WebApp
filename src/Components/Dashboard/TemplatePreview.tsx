// TemplatePreview.tsx
import React from "react";
import { CopyPlus, Trash2, Unlock } from "lucide-react";
import Add from "../../assets/Image/addbox.png";
import Template_1 from "../Templates/Template_1";
import { Template_2 } from "../Templates/Template_2";
import { TemplateState } from "../../Components/Templates/slice/template.slice";

interface TemplatePreviewProps {
  // Template 1
  template1State: TemplateState | null;
  onTemplate1TextSelect: (textId: string) => void;
  onTemplate1BgColorChange: (color: string) => void;
  onTemplate1Select: () => void;
  onTemplate1Delete: () => void;
  onTemplate1Duplicate: () => void;

  // Template 2
  template2State: TemplateState | null;
  onTemplate2TextSelect: (textId: string) => void;
  onTemplate2BgColorChange: (color: string) => void;
  onTemplate2Select: () => void;
  onTemplate2Delete: () => void;
  onTemplate2Duplicate: () => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  template1State,
  onTemplate1TextSelect,
  onTemplate1BgColorChange,
  onTemplate1Select,
  onTemplate1Delete,
  onTemplate1Duplicate,

  template2State,
  onTemplate2TextSelect,
  onTemplate2BgColorChange,
  onTemplate2Select,
  onTemplate2Delete,
  onTemplate2Duplicate,
}) => {
  return (
    <div className="">
      {/* Template 1 with controls - Only render if template1State exists */}
      {template1State && (
        <div className="relative cursor-pointer mb-9">
          <div className="flex justify-end mb-3">
            <div className={`flex items-center border border-gray-100 rounded-2xl p-2 shadow-md space-x-1 ${template1State.isSelected ? 'bg-white' : 'bg-gray-50'}`}>
              {template1State.isSelected ? (
                <>
                  <Unlock className="text-[#00000099] cursor-pointer" />
                  <img src={Add} alt="Add" className="text-[#00000099] cursor-pointer" />
                  <CopyPlus 
                    className="text-[#00000099] cursor-pointer hover:text-blue-500" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemplate1Duplicate();
                    }} 
                  />
                  <Trash2 
                    className="text-[#00000099] cursor-pointer hover:text-red-500" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemplate1Delete();
                    }} 
                  />
                </>
              ) : (
                <>
                  <img src={Add} alt="Add" className="text-[#00000099] cursor-pointer opacity-50" />
                  <CopyPlus 
                    className="text-[#00000099] cursor-pointer opacity-50 hover:opacity-100" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemplate1Duplicate();
                    }} 
                  />
                  <Trash2 
                    className="text-[#00000099] cursor-pointer opacity-50 hover:opacity-100 hover:text-red-500" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemplate1Delete();
                    }} 
                  />
                </>
              )}
            </div>
          </div>
          
          <Template_1
            currentBgColor={template1State.colors.bg}
            currentSidebarColor={template1State.colors.sidebar}
            currentShapeColor={template1State.colors.shape}
            onBgColorChange={onTemplate1BgColorChange}
            isSelected={template1State.isSelected}
            onTextSelect={onTemplate1TextSelect}
            selectedTextId={template1State.selectedTextId}
            onTemplateSelect={onTemplate1Select}
            isReadOnly={false}
            templateId="template_1"
          />
        </div>
      )}

      {/* Template 2 with controls - Only render if template2State exists */}
      {template2State && (
        <div className="relative cursor-pointer">
          <div className="flex justify-end mb-3">
            <div className={`flex items-center border border-gray-100 rounded-2xl p-2 shadow-md space-x-1 ${template2State.isSelected ? 'bg-white' : 'bg-gray-50'}`}>
              {template2State.isSelected ? (
                <>
                  <Unlock className="text-[#00000099] cursor-pointer" />
                  <img src={Add} alt="Add" className="text-[#00000099] cursor-pointer" />
                  <CopyPlus 
                    className="text-[#00000099] cursor-pointer hover:text-blue-500" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemplate2Duplicate();
                    }} 
                  />
                  <Trash2 
                    className="text-[#00000099] cursor-pointer hover:text-red-500" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemplate2Delete();
                    }} 
                  />
                </>
              ) : (
                <>
                  <img src={Add} alt="Add" className="text-[#00000099] cursor-pointer opacity-50" />
                  <CopyPlus 
                    className="text-[#00000099] cursor-pointer opacity-50 hover:opacity-100" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemplate2Duplicate();
                    }} 
                  />
                  <Trash2 
                    className="text-[#00000099] cursor-pointer opacity-50 hover:opacity-100 hover:text-red-500" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onTemplate2Delete();
                    }} 
                  />
                </>
              )}
            </div>
          </div>
          
          <Template_2
            currentBgColor_Template_2={template2State.colors.bg}
            currentSidebarColor_Template_2={template2State.colors.sidebar}
            currentShapeColor_Template_2={template2State.colors.shape}
            onBgColorChange_Template_2={onTemplate2BgColorChange}
            onTextSelect_Template_2={onTemplate2TextSelect}
            selectedTextId_Template_2={template2State.selectedTextId}
            onTemplateSelect_Template_2={onTemplate2Select}
            isSelected_Template_2={template2State.isSelected}
            isReadOnly={false}
            templateId="template_2"
          />
        </div>
      )}
    </div>
  );
};

export default TemplatePreview;