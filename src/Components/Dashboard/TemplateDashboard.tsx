/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useRef, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import TemplatePreview from "./TemplatePreview";
import AiAssistant from "../../assets/Image/Skull.png";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useZoom } from "../../Context/ZoomContext";
import question from "../../assets/Image/question.png";
import { useTemplate } from "../../Context/TemplateContext";
import { FaPhone, FaTimes, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import RichTextToolbar from "../../general/Rich-text/rich-text-toolbar";
import { UseTemplateSlice } from "../../Components/Templates/hook/use-template.hook";

const TemplateDashboard: React.FC = () => {
  const { zoomLevel } = useZoom();
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { isTemplateOpen } = useTemplate();
  const dashboardRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [activeTemplateId, setActiveTemplateId] = useState<
    "template_1" | "template_2" | null
  >(null);

  const { templates, selectText, updateColors, updateTextStyles, setSelected } =
    UseTemplateSlice();

  // Apply saved styles when component mounts
  useEffect(() => {
    Object.entries(templates.template_1.textStyles).forEach(([id, styles]) => {
      const element = document.getElementById(id);
      if (element && styles) {
        if (styles.bold) element.style.fontWeight = "bold";
        if (styles.italic) element.style.fontStyle = "italic";
        if (styles.underline) element.style.textDecoration = "underline";
        if (styles.color) element.style.color = styles.color;
        if (styles.fontFamily) element.style.fontFamily = styles.fontFamily;
        if (styles.fontSize) element.style.fontSize = styles.fontSize;
      }
    });

    Object.entries(templates.template_2.textStyles).forEach(([id, styles]) => {
      const element = document.getElementById(id);
      if (element && styles) {
        if (styles.bold) element.style.fontWeight = "bold";
        if (styles.italic) element.style.fontStyle = "italic";
        if (styles.underline) element.style.textDecoration = "underline";
        if (styles.color) element.style.color = styles.color;
        if (styles.fontFamily) element.style.fontFamily = styles.fontFamily;
        if (styles.fontSize) element.style.fontSize = styles.fontSize;
      }
    });
  }, [templates]);

  const handleBgColorChange = (
    color: string,
    templateId: "template_1" | "template_2"
  ) => {
    if (!color || !templateId) return;

    const template = templates[templateId];
    const selectedId = template.selectedTextId;

    if (selectedId === "template") {
      updateColors(templateId, { bg: color });
    } else if (selectedId === "sidebar") {
      updateColors(templateId, { sidebar: color });
    } else if (selectedId === "shape") {
      updateColors(templateId, { shape: color });
    }
  };

  const handleTextSelect = (
    textId: string,
    templateId: "template_1" | "template_2"
  ) => {
    setActiveTemplateId(templateId);
    selectText(templateId, textId);

    const element = document.getElementById(textId);
    if (element) {
      const formats = new Set<string>();
      if (window.getComputedStyle(element).fontWeight === "bold")
        formats.add("bold");
      if (window.getComputedStyle(element).fontStyle === "italic")
        formats.add("italic");
      if (
        window.getComputedStyle(element).textDecoration.includes("underline")
      ) {
        formats.add("underline");
      }
      setActiveFormats(formats);
    }
  };

  const handleCommand = (command: string, value?: string) => {
    if (!activeTemplateId) return;

    const template = templates[activeTemplateId];
    const selectedTextId = template.selectedTextId;

    if (!selectedTextId) return;

    const element = document.getElementById(selectedTextId);
    if (element) {
      document.execCommand(command, false, value);

      // Update active formats
      const newFormats = new Set(activeFormats);
      if (command === "bold") {
        element.style.fontWeight === "bold"
          ? newFormats.delete("bold")
          : newFormats.add("bold");
      }
      if (command === "italic") {
        element.style.fontStyle === "italic"
          ? newFormats.delete("italic")
          : newFormats.add("italic");
      }
      if (command === "underline") {
        element.style.textDecoration.includes("underline")
          ? newFormats.delete("underline")
          : newFormats.add("underline");
      }
      setActiveFormats(newFormats);

      // Update styles in store
      const updatedStyles = {
        ...template.textStyles,
        [selectedTextId]: {
          ...template.textStyles[selectedTextId],
          ...(command === "bold" && {
            bold: element.style.fontWeight === "bold",
          }),
          ...(command === "italic" && {
            italic: element.style.fontStyle === "italic",
          }),
          ...(command === "underline" && {
            underline: element.style.textDecoration.includes("underline"),
          }),
          ...(command === "foreColor" && value && { color: value }),
          ...(command === "fontName" && value && { fontFamily: value }),
          ...(command === "fontSize" && value && { fontSize: value }),
        },
      };

      updateTextStyles(activeTemplateId, updatedStyles);
    }
  };

  const getCurrentBgColorForToolbar = () => {
    if (!activeTemplateId) return "#000000";
    const template = templates[activeTemplateId];
    const selectedId = template.selectedTextId;

    if (selectedId === "template") return template.colors.bg;
    if (selectedId === "sidebar") return template.colors.sidebar;
    if (selectedId === "shape") return template.colors.shape;
    return "#000000";
  };

  const handleTemplateSelect = (templateId: "template_1" | "template_2") => {
    setActiveTemplateId(templateId);
    setSelected(templateId, true);
    selectText(templateId, "template");
  };

  return (
    <>
      <div
        ref={dashboardRef}
        className={`relative flex flex-col items-center justify-start p-6 pb-20 transition-all duration-300 min-h-[calc(100vh-80px)] cursor-pointer template ${
          isTemplateOpen ? "ml-74" : "ml-0"
        }`}
      >
        {/* Rich Text Toolbar */}
        {activeTemplateId && (
          <div ref={toolbarRef} className="w-full max-w-4xl mb-4 z-30">
            <RichTextToolbar
              onCommand={handleCommand}
              activeFormats={activeFormats}
              onFontChange={(font) => handleCommand("fontName", font)}
              onFontSizeChange={(size) => handleCommand("fontSize", size)}
              onColorChange={(color) => handleCommand("foreColor", color)}
              onClose={() => {
                setActiveTemplateId(null);
                selectText(activeTemplateId, null);
              }}
              onBgColorChange={(color) =>
                handleBgColorChange(color, activeTemplateId)
              }
              currentBgColor={getCurrentBgColorForToolbar()}
            />
          </div>
        )}

        {!isChatOpen && (
          <div
            onClick={() => setIsChatOpen(true)}
            className="absolute lg:ml-[48%] -left-[44%] bottom-[25%] shadow-md p-3 rounded-full bg-[#003366] border-b-white text-white cursor-pointer"
          >
            <img src={question} alt="" className="w-5 h-5" />
          </div>
        )}

        {isChatOpen && (
          <div className="flex flex-col items-center space-y-3 animate-scale-in absolute lg:ml-[48%] -left-[44%] bottom-[5%]">
            <button className="p-1 rounded-full bg-[#003366] text-white shadow cursor-pointer">
              <FaWhatsapp />
            </button>
            <button className="p-2 rounded-full bg-[#003366] text-white shadow cursor-pointer">
              <MdEmail />
            </button>
            <button className="p-3 rounded-full bg-[#003366] text-white shadow cursor-pointer">
              <FaPhone />
            </button>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-4 rounded-full bg-[#003366] text-white shadow cursor-pointer"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* Document Preview */}
        <div
          className="max-h-[90vh] max-w-full z-20 mb-6"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top center",
            transition: "transform 0.3s ease",
          }}
        >
          <TemplatePreview
            template1State={templates.template_1}
            onTemplate1TextSelect={(textId) =>
              handleTextSelect(textId, "template_1")
            }
            onTemplate1BgColorChange={(color) =>
              handleBgColorChange(color, "template_1")
            }
            onTemplate1Select={() => handleTemplateSelect("template_1")}
            template2State={templates.template_2}
            onTemplate2TextSelect={(textId) =>
              handleTextSelect(textId, "template_2")
            }
            onTemplate2BgColorChange={(color) =>
              handleBgColorChange(color, "template_2")
            }
            onTemplate2Select={() => handleTemplateSelect("template_2")}
          />

          <button className="mt-4 flex items-center justify-center w-[335px] gap-2 bg-white border border-[#000000B0] px-4 py-1 rounded-md shadow hover:bg-gray-100 transition mb-5 cursor-pointer">
            <FiPlus className="text-gray-500" />
            Add page
          </button>
        </div>
        <div className="mt-6 ml-[23%] z-10 mb-20">
          <div
            onClick={() => setIsOpen(true)}
            className="relative lg:ml-[45%] border-3 shadow-2xl p-3 w-40 rounded-3xl bg-[#003366] border-b-white text-white text-center cursor-pointer"
            style={{ backgroundColor: "#003366" }}
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
              initial={{ opacity: 0, scale: 0.5, x: 350, y: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 150, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed top-[45%] right-[4%] transform -translate-x-1/2 -translate-y-1/2 z-80"
            >
              <div className="bg-[#003366] text-white rounded-xl p-6 w-[550px] shadow-2xl relative">
                <button
                  className="absolute top-3 right-3 text-white text-xl cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <X />
                </button>
                <h2 className="text-lg font-bold">Assistant Prompt</h2>
                <p className="text-sm mt-1 mb-6 text-[#FFFFFFC4]">
                  Do you want to write content for your letterhead body but
                  don't know what to write? Write down your prompt and let our
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