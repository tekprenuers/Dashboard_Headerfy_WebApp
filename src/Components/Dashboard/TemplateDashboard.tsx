// TemplateDashboard.tsx
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
import DeleteConfirmationModal from "../Dashboard/modal/delete.modal";
import { useDispatch } from "react-redux";
import { setActiveTemplate } from "../Templates/slice/template.slice";

const TemplateDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { zoomLevel } = useZoom();
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { isTemplateOpen, setSelectedTemplate, setIsTemplateOpen } =
    useTemplate();
  const dashboardRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [activeTemplateId, setActiveTemplateId] = useState<
    "template_1" | "template_2" | null
  >(null);
  const [currentFont, setCurrentFont] = useState("Arial");
  const [currentFontSize, setCurrentFontSize] = useState("14");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    templateId: "template_1" | "template_2" | null;
  }>({
    isOpen: false,
    templateId: null,
  });

  const {
    templates,
    selectText,
    updateColors,
    updateTextStyles,
    setSelected,
    handleDeleteTemplate,  
  } = UseTemplateSlice();

  // Apply saved styles when component mounts
  useEffect(() => {
    Object.entries(templates.template_1?.textStyles || {}).forEach(
      ([id, styles]) => {
        const element = document.getElementById(id);
        if (element && styles) {
          if (styles.bold) element.style.fontWeight = "bold";
          if (styles.italic) element.style.fontStyle = "italic";
          if (styles.underline) element.style.textDecoration = "underline";
          if (styles.color) element.style.color = styles.color;
          if (styles.fontFamily) element.style.fontFamily = styles.fontFamily;
          if (styles.fontSize) element.style.fontSize = styles.fontSize;
        }
      }
    );

    Object.entries(templates.template_2?.textStyles || {}).forEach(
      ([id, styles]) => {
        const element = document.getElementById(id);
        if (element && styles) {
          if (styles.bold) element.style.fontWeight = "bold";
          if (styles.italic) element.style.fontStyle = "italic";
          if (styles.underline) element.style.textDecoration = "underline";
          if (styles.color) element.style.color = styles.color;
          if (styles.fontFamily) element.style.fontFamily = styles.fontFamily;
          if (styles.fontSize) element.style.fontSize = styles.fontSize;
        }
      }
    );
  }, [templates]);

  const handleBgColorChange = (
    color: string,
    templateId: "template_1" | "template_2"
  ) => {
    if (!color || !templateId) return;

    const template = templates[templateId];
    if (!template) return;

    const selectedId = template.selectedTextId;

    if (selectedId === "template") {
      updateColors(templateId, { bg: color });
    } else if (selectedId === "sidebar") {
      updateColors(templateId, { sidebar: color });
    } else if (selectedId === "shape") {
      updateColors(templateId, { shape: color });
    }
  };

  const AREA_IDS = ["template", "sidebar", "shape"];

  const readElementFormats = (element: HTMLElement) => {
    const cs = window.getComputedStyle(element);
    const formats = new Set<string>();
    if (parseInt(cs.fontWeight) >= 700) formats.add("bold");
    if (cs.fontStyle === "italic") formats.add("italic");
    if (cs.textDecoration.includes("underline")) formats.add("underline");
    setActiveFormats(formats);
    const fSize = parseFloat(cs.fontSize);
    setCurrentFontSize(isNaN(fSize) ? "14" : String(Math.round(fSize)));
    setCurrentFont(
      cs.fontFamily.split(",")[0].replace(/['"]/g, "").trim() || "Arial"
    );
  };

  const handleTextSelect = (
    textId: string,
    templateId: "template_1" | "template_2"
  ) => {
    if (!templates[templateId]) return;
    setActiveTemplateId(templateId);
    dispatch(setActiveTemplate(templateId)); // keep Redux in sync so Elements/Text/Upload target the right template
    selectText(templateId, textId);

    if (AREA_IDS.includes(textId)) return;

    const element = document.getElementById(textId);
    if (element) readElementFormats(element);
  };

  const handleCommand = (command: string, value?: string) => {
    if (!activeTemplateId) return;
    const template = templates[activeTemplateId];
    if (!template) return;
    const selectedTextId = template.selectedTextId;
    if (!selectedTextId || AREA_IDS.includes(selectedTextId)) return;

    const element = document.getElementById(selectedTextId);
    if (!element) return;

    // Direct DOM style manipulation — works regardless of focus
    switch (command) {
      case "bold": {
        const bold = parseInt(window.getComputedStyle(element).fontWeight) >= 700;
        element.style.fontWeight = bold ? "normal" : "bold";
        break;
      }
      case "italic":
        element.style.fontStyle =
          element.style.fontStyle === "italic" ? "normal" : "italic";
        break;
      case "underline":
        element.style.textDecoration = element.style.textDecoration.includes(
          "underline"
        )
          ? "none"
          : "underline";
        break;
      case "strikeThrough":
        element.style.textDecoration = element.style.textDecoration.includes(
          "line-through"
        )
          ? "none"
          : "line-through";
        break;
      case "fontName":
        if (value) element.style.fontFamily = value;
        break;
      case "fontSize":
        if (value) element.style.fontSize = parseFloat(value) + "px";
        break;
      case "foreColor":
        if (value) element.style.color = value;
        break;
      case "justifyLeft":
        element.style.textAlign = "left";
        break;
      case "justifyCenter":
        element.style.textAlign = "center";
        break;
      case "justifyRight":
        element.style.textAlign = "right";
        break;
      case "justifyFull":
        element.style.textAlign = "justify";
        break;
      default:
        break;
    }

    // Sync active format indicators
    readElementFormats(element);

    // Persist to Redux
    const cs = window.getComputedStyle(element);
    updateTextStyles(activeTemplateId, {
      ...template.textStyles,
      [selectedTextId]: {
        ...template.textStyles[selectedTextId],
        bold: parseInt(cs.fontWeight) >= 700,
        italic: cs.fontStyle === "italic",
        underline: cs.textDecoration.includes("underline"),
        color: element.style.color || cs.color,
        fontFamily: element.style.fontFamily || cs.fontFamily,
        fontSize: element.style.fontSize || cs.fontSize,
      },
    });
  };

  const getCurrentBgColorForToolbar = () => {
    if (!activeTemplateId) return "#000000";
    const template = templates[activeTemplateId];
    if (!template) return "#000000";

    const selectedId = template.selectedTextId;

    if (selectedId === "template") return template.colors.bg;
    if (selectedId === "sidebar") return template.colors.sidebar;
    if (selectedId === "shape") return template.colors.shape;
    return "#000000";
  };

const handleTemplateSelect = (templateId: "template_1" | "template_2") => {
  if (!templates[templateId]) return;

  // Toggle selection instead of setting one and unselecting the other
  const currentlySelected = templates[templateId]?.isSelected || false;

  // Update Redux - toggle the selection state
  setSelected(templateId, !currentlySelected);

  // Also set this as active template for other operations
  setActiveTemplateId(templateId);
  selectText(templateId, "template");
  setSelectedTemplate(templateId);
  dispatch(setActiveTemplate(templateId));

  console.log(
    "✅ Template selection toggled:",
    templateId,
    "New state:",
    !currentlySelected
  );
};

  // const handleTemplateSelect = (templateId: "template_1" | "template_2") => {
  //   if (!templates[templateId]) return;

  //   // Update local state
  //   setActiveTemplateId(templateId);

  //   // Update Redux slice
  //   setSelected(templateId, true);
  //   selectText(templateId, "template");

  //   // Update Context
  //   setSelectedTemplate(templateId);

  //    dispatch(setActiveTemplate(templateId));
  // };

  const handleTemplateDelete = (templateId: "template_1" | "template_2") => {
    // Open confirmation modal instead of immediately deleting
    setDeleteModal({
      isOpen: true,
      templateId,
    });
  };

  const confirmDelete = () => {
    if (deleteModal.templateId) {
      // Perform the actual deletion
      handleDeleteTemplate(deleteModal.templateId);

      // Reset active template if it's the one being deleted
      if (activeTemplateId === deleteModal.templateId) {
        setActiveTemplateId(null);
      }

      // Close the modal
      setDeleteModal({ isOpen: false, templateId: null });
    }
  };

  const handleTemplateDuplicate = (templateId: "template_1" | "template_2") => {
    // Implement your template duplication logic here
    console.log(`Duplicating template: ${templateId}`);

    // Example implementation:
    // 1. Get the current template data
    const templateToDuplicate = templates[templateId];

    // 2. Create a copy with a new ID (you might need to adjust this based on your state structure)
    const duplicatedTemplate = {
      ...templateToDuplicate,
      id: `template_${Date.now()}`, // Generate a unique ID
      isSelected: false, // Deselect the duplicated template
    };

    // 3. Add the duplicated template to your state
    console.log("Duplicated template:", duplicatedTemplate);
    // Example: dispatch(addTemplateAction(duplicatedTemplate));
  };



  return (
    <>
      <div
        ref={dashboardRef}
        className={`relative flex flex-col items-center justify-start p-6 pb-20 transition-all duration-300 min-h-[calc(100vh-80px)] cursor-pointer template ${
          isTemplateOpen ? "ml-83" : "ml-0"
        }`}
      >
        {/* Rich Text Toolbar */}
        {activeTemplateId && templates[activeTemplateId] && (
          <div ref={toolbarRef} className="w-full max-w-4xl mb-4 z-30">
            <RichTextToolbar
              onCommand={handleCommand}
              activeFormats={activeFormats}
              onFontChange={(font) => handleCommand("fontName", font)}
              onFontSizeChange={(size) => handleCommand("fontSize", size)}
              onColorChange={(color) => handleCommand("foreColor", color)}
              currentFont={currentFont}
              currentFontSize={currentFontSize}
              onClose={() => {
                setActiveTemplateId(null);
                if (activeTemplateId) {
                  selectText(activeTemplateId, null);
                }
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
            className="fixed bottom-24 right-6 shadow-md p-3 rounded-full bg-[#003366] border-b-white text-white cursor-pointer z-50"
          >
            <img src={question} alt="" className="w-5 h-5" />
          </div>
        )}

        {isChatOpen && (
          <div className="flex flex-col items-center space-y-3 animate-scale-in fixed bottom-6 right-6 z-50">
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

        {/* Document Preview - Render templates separately to avoid the undefined error */}
        <div
          className="max-h-[90vh] max-w-full z-20 mb-6"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top center",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Render Template 1 if it exists */}
          {templates.template_1.isCreated && (
            <div className="mb-9">
              <TemplatePreview
                template1State={templates.template_1}
                onTemplate1TextSelect={(textId) =>
                  handleTextSelect(textId, "template_1")
                }
                onTemplate1BgColorChange={(color) =>
                  handleBgColorChange(color, "template_1")
                }
                onTemplate1Select={() => handleTemplateSelect("template_1")}
                onTemplate1Delete={() => handleTemplateDelete("template_1")}
                onTemplate1Duplicate={() =>
                  handleTemplateDuplicate("template_1")
                }
                // Pass null for template2State to avoid the undefined error
                template2State={null}
                onTemplate2TextSelect={() => {}}
                onTemplate2BgColorChange={() => {}}
                onTemplate2Select={() => {}}
                onTemplate2Delete={() => {}}
                onTemplate2Duplicate={() => {}}
              />
            </div>
          )}

          {/* Render Template 2 if it exists */}
          {templates.template_2.isCreated && (
            <div>
              <TemplatePreview
                // Pass null for template1State to avoid the undefined error
                template1State={null}
                onTemplate1TextSelect={() => {}}
                onTemplate1BgColorChange={() => {}}
                onTemplate1Select={() => {}}
                onTemplate1Delete={() => {}}
                onTemplate1Duplicate={() => {}}
                template2State={templates.template_2}
                onTemplate2TextSelect={(textId) =>
                  handleTextSelect(textId, "template_2")
                }
                onTemplate2BgColorChange={(color) =>
                  handleBgColorChange(color, "template_2")
                }
                onTemplate2Select={() => handleTemplateSelect("template_2")}
                onTemplate2Delete={() => handleTemplateDelete("template_2")}
                onTemplate2Duplicate={() =>
                  handleTemplateDuplicate("template_2")
                }
              />
            </div>
          )}

          {!templates.template_1.isCreated &&
            !templates.template_2.isCreated && (
              <div className="flex items-center flex-col justify-center w-[335px] h-[394.821px]  border-3 border-dashed border-gray-600 rounded-lg mt-20">
                <h3 className="text-lg font-semibold text-[#003366] mb-2 text-center text-balance px-2">
                  Start Creating Your Template!
                </h3>

                {/* Subtext */}
                <p className="text-sm text-muted-foreground text-center px-6 text-pretty leading-relaxed">
                  Choose from various options to customize your design and bring
                  your ideas to life.
                </p>
                <button
                 onClick={() => { 
                  setIsTemplateOpen(true)
                  setSelectedTemplate("Template")}}
                 className=" mt-5 px-6 py-2.5 bg-[#003366] rounded-lg cursor-pointer font-medium text-white hover:bg-[#003366]/90 transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  Get Started
                </button>
              </div>
            )}

          <button className="mt-4 flex items-center justify-center w-[335px] gap-2 bg-white/30 border border-[#000000B0] px-4 py-1 rounded-md shadow hover:bg-gray-100 transition mb-5 cursor-pointer">
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

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, templateId: null })}
          onConfirm={confirmDelete}
          templateName={
            deleteModal.templateId
              ? `Template ${deleteModal.templateId.split("_")[1]}`
              : ""
          }
        />
      </div>
    </>
  );
};

export default TemplateDashboard;