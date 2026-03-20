import type React from "react";
import { useState } from "react";
import { InteriorDesignTemplate } from "../../Components/Templates/editable-text";
import ShapeRenderer from "./shape-renderer";
import TextBoxRenderer from "./text-box-renderer";
import ImageRenderer from "./image-renderer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setActiveTemplate } from "./slice/template.slice";


interface Template1Props {
  onSidebarColorChange?: (color: string) => void;
  onShapeColorChange?: (color: string) => void;
  onBgColorChange?: (color: string) => void;
  onTemplateSelect?: () => void;
  onTextSelect?: (textId: string | "template" | "sidebar" | "shape") => void;
  selectedTextId?: string | null;
  currentBgColor?: string;
  currentSidebarColor?: string;
  currentShapeColor?: string;
  isSelected?: boolean;
  isReadOnly?: boolean;
  templateId: "template_1" | "template_2";
}

const Template_1: React.FC<Template1Props> = ({
  onTextSelect,
  onTemplateSelect,
  isSelected = false,
  selectedTextId,
  currentBgColor = "#e5e7eb",
  currentSidebarColor = "#1e293b",
  currentShapeColor = "#e5e7eb",
  isReadOnly = true,
  templateId,
}) => {
  const [textContents, setTextContents] = useState<Record<string, string>>(
    Object.fromEntries(
      InteriorDesignTemplate.map((text) => [text.id, text.defaultText])
    )
  );

const activeTemplateId = useSelector(
  (state: RootState) => state.templates.activeTemplateId
);

const shapes = useSelector(
  (state: RootState) => state.templates[templateId]?.shapes ?? []
);

const textBoxes = useSelector(
  (state: RootState) => state.templates[templateId]?.textBoxes ?? []
);

const images = useSelector(
  (state: RootState) => state.templates[templateId]?.images ?? []
);

// const shapes = useSelector(
//   (state: RootState) => state.templates[templateId]?.shapes ?? []
// );

  // Handle clicks in read-only mode
  const handleReadOnlyClick = (e: React.MouseEvent) => {
    if (isReadOnly) {
      // e.stopPropagation();
      e.preventDefault(); // Prevent any default behavior
    }
  };

  const handleTextClick = (e: React.MouseEvent, id: string) => {
    if (isReadOnly) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    e.stopPropagation();
    onTextSelect?.(id);
    const element = document.getElementById(id);
    if (element) {
      element.focus();
    }
  };

  const handleBlur = (id: string, e: React.FocusEvent<HTMLDivElement>) => {
    if (isReadOnly) return;

    const content = e.currentTarget.innerHTML;
    setTextContents((prev) => ({
      ...prev,
      [id]: content,
    }));
  };

  const getTextClassName = (baseClassName: string, textId: string) => {
    if (isReadOnly) return baseClassName;

    const isSelectedText = selectedTextId === textId;
    return `${baseClassName} cursor-text ${
      isSelectedText ? "ring-2 ring-blue-400" : ""
    }`;
  };

  // Render text element differently based on read-only mode
  const renderTextElement = (
    id: string,
    className: string,
    content: string,
    style?: React.CSSProperties
  ) => {
    if (isReadOnly) {
      // For read-only mode, use a regular div instead of contentEditable
      return (
        <div
          className={className}
          dangerouslySetInnerHTML={{ __html: content }}
          style={style}
        />
      );
    } else {
      // For editable mode, use the contentEditable element
      return (
        <div
          id={id}
          className={className}
          style={style}
          onClick={(e) => handleTextClick(e, id)}
          onBlur={(e) => handleBlur(id, e)}
          contentEditable
          dangerouslySetInnerHTML={{ __html: content }}
          suppressContentEditableWarning
        />
      );
    }
  };

  const dispatch = useDispatch();

  return (
    <div
      onClick={
        isReadOnly
          ? handleReadOnlyClick
          : (e) => {
              e.stopPropagation();
              dispatch(setActiveTemplate(templateId));
              onTemplateSelect?.();
            }
      }
      style={{ backgroundColor: currentBgColor || "#e5e7eb" }}
      className={`w-[335px] relative ${
        isReadOnly
          ? "h-[394.821px] overflow-hidden"
          : "min-h-[394.821px]"
      } ${isSelected && !isReadOnly ? "ring-2 ring-blue-400" : ""}`}
    >
      <div className={`flex w-full ${isReadOnly ? "h-full" : "min-h-[394.821px]"}`}>
        {/* Left Sidebar */}
        <div
          className={`w-[64px] flex flex-col items-center relative ${
            selectedTextId === "sidebar" && !isReadOnly
              ? "ring-2 ring-blue-400"
              : ""
          }`}
          style={{ backgroundColor: currentSidebarColor || "#1e293b" }}
          onClick={
            isReadOnly
              ? handleReadOnlyClick
              : (e) => {
                  e.stopPropagation();
                  onTextSelect?.("sidebar");
                }
          }
        >
          {/* Diamond Shape */}
          <div
            style={{
              backgroundColor: currentShapeColor || "#e5e7eb",
              borderColor: currentShapeColor || "#e5e7eb",
            }}
            className={`absolute top-10 left-16 transform -translate-x-1/2 rotate-45 w-10 h-10 border-2 z-10 flex items-center justify-center ${
              selectedTextId === "shape" && !isReadOnly
                ? "ring-2 ring-blue-400"
                : ""
            }`}
            onClick={
              isReadOnly
                ? handleReadOnlyClick
                : (e) => {
                    e.stopPropagation();
                    onTextSelect?.("shape");
                  }
            }
          >
            <div className="w-6 h-6 border-2 border-slate-700 transform rotate-90"></div>
          </div>
        </div>

        {/* Main Content - Right Sidebar */}
        <div
          onClick={
            isReadOnly
              ? handleReadOnlyClick
              : (e) => {
                  e.stopPropagation();
                  onTextSelect?.("template");
                }
          }
          style={{ backgroundColor: currentBgColor }}
          className="flex-1 px-6 py-4 overflow-hidden"
        >
          {/* Header */}
          <div className="mb-2">
            {renderTextElement(
              "header-title",
              getTextClassName(
                "text-sm font-bold text-slate-800 outline-none",
                "header-title"
              ),
              textContents["header-title"]
            )}
            {renderTextElement(
              "header-subtitle",
              getTextClassName(
                "text-[8px] text-slate-600 uppercase outline-none",
                "header-subtitle"
              ),
              textContents["header-subtitle"]
            )}
          </div>

          {/* Letter Header */}
          <div className="flex justify-between text-[7px] mt-10 mb-2">
            <div>
              {renderTextElement(
                "recipient-name",
                getTextClassName(
                  "text-slate-700 font-bold outline-none",
                  "recipient-name"
                ),
                textContents["recipient-name"]
              )}
              {renderTextElement(
                "recipient-phone",
                getTextClassName(
                  "text-slate-600 outline-none",
                  "recipient-phone"
                ),
                textContents["recipient-phone"]
              )}
              {renderTextElement(
                "recipient-email",
                getTextClassName(
                  "text-slate-600 outline-none",
                  "recipient-email"
                ),
                textContents["recipient-email"]
              )}
              {renderTextElement(
                "recipient-address",
                getTextClassName(
                  "text-slate-600 outline-none",
                  "recipient-address"
                ),
                textContents["recipient-address"]
              )}
            </div>
            <div className="text-right">
              {renderTextElement(
                "date",
                getTextClassName(
                  "text-slate-700 font-bold text-[8px] outline-none",
                  "date"
                ),
                textContents["date"]
              )}
            </div>
          </div>

          {/* Letter Body */}
          <div className="text-[7px] text-slate-700 leading-snug mb-2 mt-5">
            {renderTextElement(
              "body-1",
              getTextClassName("mb-2 outline-none", "body-1"),
              textContents["body-1"]
            )}
            {renderTextElement(
              "body-2",
              getTextClassName("mb-2 outline-none", "body-2"),
              textContents["body-2"]
            )}
            {renderTextElement(
              "closing",
              getTextClassName("pt-1 outline-none", "closing"),
              textContents["closing"]
            )}
          </div>

          {/* Signature */}
          <div className="mb-3 mt-3">
            {renderTextElement(
              "signature",
              getTextClassName(
                "text-base font-script text-slate-800 outline-none",
                "signature"
              ),
              textContents["signature"],
              { fontFamily: "Brush Script MT" }
            )}
            <p className="text-[7px] text-slate-700 font-medium">
              Donald Collins
            </p>
            <p className="text-[7px] text-slate-600">
              CEO of XTO Interior Design
            </p>
          </div>

          {/* Footer Contact */}
          <div className="flex items-center space-x-2 text-[9px] text-slate-600 border-t-2 border-gray-400 py-4">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-slate-700 transform rotate-45"></div>
            </div>
            <div>
              {renderTextElement(
                "footer-phone",
                getTextClassName("outline-none", "footer-phone"),
                textContents["footer-phone"]
              )}
              {renderTextElement(
                "footer-email",
                getTextClassName("outline-none", "footer-email"),
                textContents["footer-email"]
              )}
              {renderTextElement(
                "footer-address",
                getTextClassName("outline-none", "footer-address"),
                textContents["footer-address"]
              )}
            </div>
          </div>
        </div>
 
          <ShapeRenderer
            templateId={templateId}
            shapes={shapes}
            interactive={activeTemplateId === templateId && !isReadOnly}
            isVisible={!isReadOnly}
          />
          <TextBoxRenderer
            templateId={templateId}
            textBoxes={textBoxes}
            interactive={activeTemplateId === templateId && !isReadOnly}
          />
          <ImageRenderer
            templateId={templateId}
            images={images}
            interactive={activeTemplateId === templateId && !isReadOnly}
          />
        
        
      </div>
    </div>
  );
};

export default Template_1;