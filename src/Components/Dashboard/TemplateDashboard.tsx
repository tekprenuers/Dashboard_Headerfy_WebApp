import React, { useState, useRef, useEffect } from "react";
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

interface TextStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
}

const TemplateDashboard: React.FC = () => {
  const { zoomLevel } = useZoom();
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { isTemplateOpen } = useTemplate();
  const [isSelected, setIsSelected] = useState(false);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const dashboardRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [currentBgColor, setCurrentBgColor] = useState<string>(() => {
    const savedColor = localStorage.getItem("templateBgColor");
    return savedColor || "";
  });
  const [textStyles, setTextStyles] = useState<Record<string, TextStyle>>(
    () => {
      const savedStyles = localStorage.getItem("textStyles");
      return savedStyles ? JSON.parse(savedStyles) : {};
    }
  );

  // Apply all saved styles when component mounts
  useEffect(() => {
    Object.entries(textStyles).forEach(([id, styles]) => {
      const element = document.getElementById(id);
      if (element) {
        if (styles.bold) element.style.fontWeight = "bold";
        if (styles.italic) element.style.fontStyle = "italic";
        if (styles.underline) element.style.textDecoration = "underline";
        if (styles.color) element.style.color = styles.color;
        if (styles.fontFamily) element.style.fontFamily = styles.fontFamily;
        if (styles.fontSize) element.style.fontSize = styles.fontSize;
      }
    });
  }, []);

  const handleBgColorChange = (color: string) => {
    if (!color) return;
    setCurrentBgColor(color);
    localStorage.setItem("templateBgColor", color);
  };

  const handleTextSelect = (textId: string) => {
    setSelectedTextId(textId);
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
    if (!selectedTextId) return;

    const element = document.getElementById(selectedTextId);
    if (element) {
      document.execCommand(command, false, value);

      // Update active formats
      const newFormats = new Set(activeFormats);
      if (command === "bold") {
        newFormats[element.style.fontWeight === "bold" ? "add" : "delete"](
          "bold"
        );
      }
      if (command === "italic") {
        newFormats[element.style.fontStyle === "italic" ? "add" : "delete"](
          "italic"
        );
      }
      if (command === "underline") {
        newFormats[
          element.style.textDecoration.includes("underline") ? "add" : "delete"
        ]("underline");
      }
      setActiveFormats(newFormats);

      // Update and save styles
      setTextStyles((prev) => {
        const updatedStyles = {
          ...prev,
          [selectedTextId]: {
            ...prev[selectedTextId],
            ...(command === "bold" && { bold: !prev[selectedTextId]?.bold }),
            ...(command === "italic" && {
              italic: !prev[selectedTextId]?.italic,
            }),
            ...(command === "underline" && {
              underline: !prev[selectedTextId]?.underline,
            }),
            ...(command === "foreColor" && { color: value }),
            ...(command === "fontName" && { fontFamily: value }),
            ...(command === "fontSize" && { fontSize: value }),
          },
        };
        localStorage.setItem("textStyles", JSON.stringify(updatedStyles));
        return updatedStyles;
      });
    }
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
        {selectedTextId && (
          <div ref={toolbarRef} className="w-full max-w-4xl mb-4 z-30">
            <RichTextToolbar
              onCommand={handleCommand}
              activeFormats={activeFormats}
              onFontChange={(font) => handleCommand("fontName", font)}
              onFontSizeChange={(size) => handleCommand("fontSize", size)}
              onColorChange={(color) => handleCommand("foreColor", color)}
              onClose={() => setSelectedTextId(null)}
              onBgColorChange={handleBgColorChange}
              currentBgColor={currentBgColor}
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
          onClick={() => setIsSelected(!isSelected)}
          className="max-h-[90vh] max-w-full z-20 mb-6"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top center",
            transition: "transform 0.3s ease",
          }}
        >
          <TemplatePreview
            currentBgColor={currentBgColor}
            onBgColorChange={handleBgColorChange}
            onTextSelect={handleTextSelect}
            selectedTextId={selectedTextId}
            // onTextSelect={(id) => {
            //   console.log("TemplateDashboard - onTextSelect called with:", id);
            //   handleTextSelect(id);
            // }}
          />
          {/* Add Page Button */}
          <button className="mt-4 flex items-center justify-center w-[335px] gap-2 bg-white border border-[#000000B0] px-4 py-1 rounded-md shadow hover:bg-gray-100 transition mb-5 cursor-pointer">
            <FiPlus className="text-gray-500" />
            Add page
          </button>
        </div>

        {/* AI Assistant Button */}
        <div className="mt-6 ml-[23%] z-10 mb-20">
          <div
            onClick={() => setIsOpen(true)}
            className="relative lg:ml-[45%] border-3 shadow-2xl p-3 w-40 rounded-3xl bg-[#003366] border-b-white text-white text-center cursor-pointer"
          >
            Ai Assistant
            <img
              src={AiAssistant}
              alt="Ai Assistant"
              className="absolute -right-7"
            />
          </div>
        </div>

        {/* ++++++++++++++++++++++++++ AI Assistant Modal +++++++++++++++++++++++++ */}
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
