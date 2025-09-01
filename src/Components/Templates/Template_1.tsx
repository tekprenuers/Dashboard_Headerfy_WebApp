import type React from "react";
import { useState } from "react";
import { InteriorDesignTemplate } from "../../Components/Templates/editable-text";

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
}

const Template_1: React.FC<Template1Props> = ({
  onTextSelect,
  onTemplateSelect,
  isSelected = false,
  selectedTextId,
  currentBgColor = "#e5e7eb",
  currentSidebarColor = "#1e293b",
  currentShapeColor = "#e5e7eb",
}) => {
  const [textContents, setTextContents] = useState<Record<string, string>>(
    Object.fromEntries(
      InteriorDesignTemplate.map((text) => [text.id, text.defaultText])
    )
  );

  const handleTextClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onTextSelect?.(id);
    const element = document.getElementById(id);
    if (element) {
      element.focus();
    }
  };

  const handleBlur = (id: string, e: React.FocusEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML;
    setTextContents((prev) => ({
      ...prev,
      [id]: content,
    }));
  };

  const getTextClassName = (baseClassName: string, textId: string) => {
    const isSelectedText = selectedTextId === textId;
    return `${baseClassName} cursor-text ${
      isSelectedText ? "ring-2 ring-blue-400" : ""
    }`;
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onTemplateSelect?.();
      }}
      style={{ backgroundColor: currentBgColor || "#e5e7eb" }}
      className={`w-[335px] h-[394.821px] overflow-hidden relative ${
        isSelected ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <div className="flex w-full h-full">
        {/* Left Sidebar */}
        <div
          className={`w-[64px] flex flex-col items-center relative ${
            selectedTextId === "sidebar" ? "ring-2 ring-blue-400" : ""
          }`}
          style={{ backgroundColor: currentSidebarColor}}
          onClick={(e) => {
            e.stopPropagation();
            onTextSelect?.("sidebar");
          }}
        >
          {/* Diamond Shape */}
          <div
            style={{
              backgroundColor: currentShapeColor || "#e5e7eb",
              borderColor: currentShapeColor || "#e5e7eb",
            }}
            className={`absolute top-10 left-16 transform -translate-x-1/2 rotate-45 w-10 h-10 border-2 z-10 flex items-center justify-center ${
              selectedTextId === "shape" ? "ring-2 ring-blue-400" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onTextSelect?.("shape");
            }}
          >
            <div className="w-6 h-6 border-2 border-slate-700 transform rotate-90"></div>
          </div>
        </div>

        {/* Main Content - Right Sidebar */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onTextSelect?.("template");
          }}
          style={{ backgroundColor: currentBgColor }}
          className="flex-1 px-6 py-4 overflow-hidden"
        >
          <div className="mb-2">
            <h1
              id="header-title"
              className={getTextClassName(
                "text-sm font-bold text-slate-800 outline-none",
                "header-title"
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleTextClick(e, "header-title");
              }}
              onBlur={(e) => handleBlur("header-title", e)}
              contentEditable
              dangerouslySetInnerHTML={{ __html: textContents["header-title"] }}
              suppressContentEditableWarning
            />
            <p
              id="header-subtitle"
              className={getTextClassName(
                "text-[8px] text-slate-600 uppercase outline-none",
                "header-subtitle"
              )}
              onClick={(e) => handleTextClick(e, "header-subtitle")}
              onBlur={(e) => handleBlur("header-subtitle", e)}
              contentEditable
              dangerouslySetInnerHTML={{
                __html: textContents["header-subtitle"],
              }}
              suppressContentEditableWarning
            />
          </div>

          {/* Letter Header */}
          <div className="flex justify-between text-[7px] mt-10 mb-2">
            <div>
              <p
                id="recipient-name"
                className={getTextClassName(
                  "text-slate-700 font-bold outline-none",
                  "recipient-name"
                )}
                onClick={(e) => handleTextClick(e, "recipient-name")}
                onBlur={(e) => handleBlur("recipient-name", e)}
                contentEditable
                dangerouslySetInnerHTML={{
                  __html: textContents["recipient-name"],
                }}
                suppressContentEditableWarning
              />
              <p
                id="recipient-phone"
                className={getTextClassName(
                  "text-slate-600 outline-none",
                  "recipient-phone"
                )}
                onClick={(e) => handleTextClick(e, "recipient-phone")}
                onBlur={(e) => handleBlur("recipient-phone", e)}
                contentEditable
                dangerouslySetInnerHTML={{
                  __html: textContents["recipient-phone"],
                }}
                suppressContentEditableWarning
              />
              <p
                id="recipient-email"
                className={getTextClassName(
                  "text-slate-600 outline-none",
                  "recipient-email"
                )}
                onClick={(e) => handleTextClick(e, "recipient-email")}
                onBlur={(e) => handleBlur("recipient-email", e)}
                contentEditable
                dangerouslySetInnerHTML={{
                  __html: textContents["recipient-email"],
                }}
                suppressContentEditableWarning
              />
              <p
                id="recipient-address"
                className={getTextClassName(
                  "text-slate-600 outline-none",
                  "recipient-address"
                )}
                onClick={(e) => handleTextClick(e, "recipient-address")}
                onBlur={(e) => handleBlur("recipient-address", e)}
                contentEditable
                dangerouslySetInnerHTML={{
                  __html: textContents["recipient-address"],
                }}
                suppressContentEditableWarning
              />
            </div>
            <div className="text-right">
              <p
                id="date"
                className={getTextClassName(
                  "text-slate-700 font-bold text-[8px] outline-none",
                  "date"
                )}
                onClick={(e) => handleTextClick(e, "date")}
                onBlur={(e) => handleBlur("date", e)}
                contentEditable
                dangerouslySetInnerHTML={{ __html: textContents["date"] }}
                suppressContentEditableWarning
              />
            </div>
          </div>

          {/* Letter Body */}
          <div className="text-[7px] text-slate-700 leading-snug mb-2 mt-5">
            <p
              id="body-1"
              className={getTextClassName("mb-2 outline-none", "body-1")}
              onClick={(e) => handleTextClick(e, "body-1")}
              onBlur={(e) => handleBlur("body-1", e)}
              contentEditable
              dangerouslySetInnerHTML={{ __html: textContents["body-1"] }}
              suppressContentEditableWarning
            />
            <p
              id="body-2"
              className={getTextClassName("mb-2 outline-none", "body-2")}
              onClick={(e) => handleTextClick(e, "body-2")}
              onBlur={(e) => handleBlur("body-2", e)}
              contentEditable
              dangerouslySetInnerHTML={{ __html: textContents["body-2"] }}
              suppressContentEditableWarning
            />
            <p
              id="closing"
              className={getTextClassName("pt-1 outline-none", "closing")}
              onClick={(e) => handleTextClick(e, "closing")}
              onBlur={(e) => handleBlur("closing", e)}
              contentEditable
              dangerouslySetInnerHTML={{ __html: textContents["closing"] }}
              suppressContentEditableWarning
            />
          </div>

          {/* Signature */}
          <div className="mb-3 mt-3">
            <div
              id="signature"
              className={getTextClassName(
                "text-base font-script text-slate-800 outline-none",
                "signature"
              )}
              style={{ fontFamily: "Brush Script MT" }}
              onClick={(e) => handleTextClick(e, "signature")}
              onBlur={(e) => handleBlur("signature", e)}
              contentEditable
              dangerouslySetInnerHTML={{ __html: textContents["signature"] }}
              suppressContentEditableWarning
            />
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
              <p
                id="footer-phone"
                className={getTextClassName("outline-none", "footer-phone")}
                onClick={(e) => handleTextClick(e, "footer-phone")}
                onBlur={(e) => handleBlur("footer-phone", e)}
                contentEditable
                dangerouslySetInnerHTML={{
                  __html: textContents["footer-phone"],
                }}
                suppressContentEditableWarning
              />
              <p
                id="footer-email"
                className={getTextClassName("outline-none", "footer-email")}
                onClick={(e) => handleTextClick(e, "footer-email")}
                onBlur={(e) => handleBlur("footer-email", e)}
                contentEditable
                dangerouslySetInnerHTML={{
                  __html: textContents["footer-email"],
                }}
                suppressContentEditableWarning
              />
              <p
                id="footer-address"
                className={getTextClassName("outline-none", "footer-address")}
                onClick={(e) => handleTextClick(e, "footer-address")}
                onBlur={(e) => handleBlur("footer-address", e)}
                contentEditable
                dangerouslySetInnerHTML={{
                  __html: textContents["footer-address"],
                }}
                suppressContentEditableWarning
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template_1;