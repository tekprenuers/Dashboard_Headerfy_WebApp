import type React from "react";
import { useState } from "react";
import { hospitalTemplate } from "../../Components/Templates/editable-text";

interface Template2Props {
  onSidebarColorChange_Template_2?: (color: string) => void;
  onShapeColorChange_Template_2?: (color: string) => void;
  onBgColorChange_Template_2?: (color: string) => void;
  onTemplateSelect_Template_2?: () => void;
  onTextSelect_Template_2?: (
    textId: string | "template" | "sidebar" | "shape"
  ) => void;
  selectedTextId_Template_2?: string | null;
  currentBgColor_Template_2?: string;
  currentSidebarColor_Template_2?: string;
  currentShapeColor_Template_2?: string;
  isSelected_Template_2?: boolean;
}

export const Template_2: React.FC<Template2Props> = ({
  onTextSelect_Template_2,
  onTemplateSelect_Template_2,
  isSelected_Template_2 = false,
  selectedTextId_Template_2,
  currentBgColor_Template_2 = "#126180",
  currentSidebarColor_Template_2 = "#FFFDD0",
  currentShapeColor_Template_2 = "#e5e7eb",
}) => {
  const [textContents, setTextContents] = useState<Record<string, string>>(
    Object.fromEntries(
      hospitalTemplate.map((text) => [text.id, text.defaultText])
    )
  );

  const handleTextClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onTextSelect_Template_2?.(id);
    const element = document.getElementById(id);
    if (element) {
      element.focus();
    }
  };

  const handleBlur = (id: string, e: React.FocusEvent<HTMLElement>) => {
    const content = e.currentTarget.innerHTML;
    setTextContents((prev) => ({
      ...prev,
      [id]: content,
    }));
  };

  const getTextClassName = (baseClassName: string, textId: string) => {
    const isSelectedText = selectedTextId_Template_2 === textId;
    return `${baseClassName} cursor-text ${
      isSelectedText ? "ring-2 ring-blue-400" : ""
    }`;
  };

  // Add this function to handle sidebar background clicks specifically
  const handleSidebarBackgroundClick = (e: React.MouseEvent) => {
    // Check if we clicked directly on the sidebar background (not on child elements)
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      console.log("Template 2 sidebar BACKGROUND clicked");
      onTextSelect_Template_2?.("sidebar");
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onTemplateSelect_Template_2?.();
      }}
      style={{ backgroundColor: currentBgColor_Template_2 }}
      className={`w-[335px] h-[394.821px] overflow-hidden relative ${
        isSelected_Template_2 ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <div className="flex w-full h-full">
        {/* Left Sidebar - UPDATED CLICK HANDLER */}
        <div
          className={`w-[83px] flex flex-col items-center relative ${
            selectedTextId_Template_2 === "sidebar"
              ? "ring-2 ring-blue-400"
              : ""
          }`}
          style={{ backgroundColor: currentSidebarColor_Template_2 }}
          onClick={handleSidebarBackgroundClick} // Use the new handler
        >
          {/* Overlay for catching sidebar background clicks */}
          <div
            className="absolute inset-0 z-10"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Template 2 sidebar overlay clicked");
              onTextSelect_Template_2?.("sidebar");
            }}
            style={{
              pointerEvents:
                selectedTextId_Template_2 === "sidebar" ? "none" : "auto",
            }}
          />
          {/* Circle Logo - This handles its own clicks */}
          <div
            className="absolute top-5 left-3 w-full h-full"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Template 2 shape clicked");
              onTextSelect_Template_2?.("shape");
            }}
          >
            <div
              className={`rounded-full border-2 border-[#126180] w-15 h-15 flex items-center justify-center ${
                selectedTextId_Template_2 === "shape"
                  ? "ring-2 ring-blue-400"
                  : ""
              }`}
              style={{ backgroundColor: currentShapeColor_Template_2 }}
            />
          </div>

          {/* U-BOAT Logo Text - This handles its own clicks */}
          <div
            id="header-logo-2"
            className="absolute top-21 left-1/2 transform -translate-x-1/2 text-[#126180] font-bold text-[10px]"
            onClick={(e) => {
              e.stopPropagation();
              handleTextClick(e, "header-logo-2");
            }}
            onBlur={(e) => handleBlur("header-logo-2", e)}
            contentEditable
            dangerouslySetInnerHTML={{
              __html: textContents["header-logo-2"] || "U-BOAT",
            }}
            suppressContentEditableWarning
          />
        </div>

        {/* Main Content - Right Sidebar */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            console.log("Template 2 main content clicked");
            onTextSelect_Template_2?.("template");
          }}
          style={{ backgroundColor: currentBgColor_Template_2 }}
          className="flex-1 px-4 py-6 overflow-hidden"
        >
          {/* Letter Header */}
          <div className="text-right">
            <p
              id="recipient-phone-2"
              className={getTextClassName(
                "text-gray-100 outline-none text-[7px]",
                "recipient-phone-2"
              )}
              onClick={(e) => handleTextClick(e, "recipient-phone-2")}
              onBlur={(e) => handleBlur("recipient-phone-2", e)}
              contentEditable
              dangerouslySetInnerHTML={{
                __html: textContents["recipient-phone-2"],
              }}
              suppressContentEditableWarning
            />
            <p
              id="recipient-email-2"
              className={getTextClassName(
                "text-gray-100 outline-none text-[7px]",
                "recipient-email-2"
              )}
              onClick={(e) => handleTextClick(e, "recipient-email-2")}
              onBlur={(e) => handleBlur("recipient-email-2", e)}
              contentEditable
              dangerouslySetInnerHTML={{
                __html: textContents["recipient-email-2"],
              }}
              suppressContentEditableWarning
            />
            <p
              id="recipient-address-2"
              className={getTextClassName(
                "text-gray-100 outline-none text-[7px]",
                "recipient-address-2"
              )}
              onClick={(e) => handleTextClick(e, "recipient-address-2")}
              onBlur={(e) => handleBlur("recipient-address-2", e)}
              contentEditable
              dangerouslySetInnerHTML={{
                __html: textContents["recipient-address-2"],
              }}
              suppressContentEditableWarning
            />
          </div>

          {/* UserName */}
          <div className="text-[7px] mt-5 mb-3">
            <div>
              <p
                id="recipient-name-2"
                className={getTextClassName(
                  "text-[#FFFDD0] font-bold outline-none text-[7px]",
                  "recipient-name-2"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTextClick(e, "recipient-name-2");
                }}
                onBlur={(e) => handleBlur("recipient-name-2", e)}
                contentEditable
                dangerouslySetInnerHTML={{
                  __html: textContents["recipient-name-2"],
                }}
                suppressContentEditableWarning
              />
            </div>
          </div>

          {/* Letter Body */}
          <div className="text-[7px] text-gray-100">
            <p
              id="body-1-2"
              className={getTextClassName("mb-4 outline-none", "body-1-2")}
              onClick={(e) => handleTextClick(e, "body-1-2")}
              onBlur={(e) => handleBlur("body-1-2", e)}
              contentEditable
              dangerouslySetInnerHTML={{
                __html: textContents["body-1-2"],
              }}
              suppressContentEditableWarning
            />
            <p
              id="body-2-2"
              className={getTextClassName("mb-4 outline-none", "body-2-2")}
              onClick={(e) => handleTextClick(e, "body-2-2")}
              onBlur={(e) => handleBlur("body-2-2", e)}
              contentEditable
              dangerouslySetInnerHTML={{
                __html: textContents["body-2-2"],
              }}
              suppressContentEditableWarning
            />
            <p
              id="closing-2"
              className={getTextClassName("mb-4 outline-none", "closing-2")}
              onClick={(e) => handleTextClick(e, "closing-2")}
              onBlur={(e) => handleBlur("closing-2", e)}
              contentEditable
              dangerouslySetInnerHTML={{
                __html: textContents["closing-2"],
              }}
              suppressContentEditableWarning
            />
          </div>

          {/* Signature */}
          <div className="">
            <div
              id="signature-2"
              className={getTextClassName(
                "text-lg font-bold text-gray-100 outline-none",
                "signature-2"
              )}
              style={{ fontFamily: "Brush Script MT" }}
              onClick={(e) => handleTextClick(e, "signature-2")}
              onBlur={(e) => handleBlur("signature-2", e)}
              contentEditable
              dangerouslySetInnerHTML={{ __html: textContents["signature-2"] }}
              suppressContentEditableWarning
            />
            <p className="text-[7px] text-gray-600">Manager at U-Boat Corp.</p>
          </div>

          {/* Footer Contact - Simplified */}
          <div className="flex items-center space-x-2 text-[7px] text-gray-100">
            <div>
              <p id="footer-name-2">
                <span
                  className={getTextClassName("outline-none", "footer-name-2")}
                  onClick={(e) => handleTextClick(e, "footer-name-2")}
                  onBlur={(e) => handleBlur("footer-name-2", e)}
                  contentEditable
                  dangerouslySetInnerHTML={{
                    __html: textContents["footer-name-2"],
                  }}
                  suppressContentEditableWarning
                />
              </p>
              <p id="footer-address-2">
                <span
                  className={getTextClassName(
                    "outline-none",
                    "footer-address-2"
                  )}
                  onClick={(e) => handleTextClick(e, "footer-address-2")}
                  onBlur={(e) => handleBlur("footer-address-2", e)}
                  contentEditable
                  dangerouslySetInnerHTML={{
                    __html: textContents["footer-address-2"],
                  }}
                  suppressContentEditableWarning
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};