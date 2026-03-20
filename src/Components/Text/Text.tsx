import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { TfiText } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addTextBox } from "../Templates/slice/template.slice";

const fontCombos = [
  {
    name: "Dancing Script + Poppins",
    helloFont: "font-dancing",
    friendFont: "font-poppins",
    fontFamily: "Dancing Script",
  },
  {
    name: "Pacifico + Montserrat",
    helloFont: "font-pacifico",
    friendFont: "font-montserrat",
    fontFamily: "Pacifico",
  },
  {
    name: "Poppins + Dancing Script",
    helloFont: "font-poppins",
    friendFont: "font-dancing",
    fontFamily: "Poppins",
  },
  {
    name: "Montserrat + Pacifico",
    helloFont: "font-montserrat",
    friendFont: "font-pacifico",
    fontFamily: "Montserrat",
  },
];

interface TextProps {
  onFontSelect: (font: string) => void;
}

const Text: React.FC<TextProps> = ({ onFontSelect }) => {
  const dispatch = useDispatch();
  const templates = useSelector((state: RootState) => state.templates);

  const addText = (
    content: string,
    fontSize: number,
    fontFamily: string = "Arial"
  ) => {
    const targetId = templates.activeTemplateId;
    if (!targetId || !templates[targetId]?.isCreated) {
      alert("Please select a template first.");
      return;
    }
    dispatch(
      addTextBox({
        templateId: targetId,
        textBox: {
          id: crypto.randomUUID(),
          x: 80,
          y: 80,
          width: 180,
          height: fontSize * 2.5,
          content,
          fontSize,
          fontFamily,
          color: "#000000",
          zIndex: Date.now(),
        },
      })
    );
  };

  return (
    <>
      <div>
        {/* Search Input */}
        <div className="relative">
          <BiSearchAlt
            size={20}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-white"
          />
          <input
            type="text"
            placeholder="Search for fonts"
            className="w-full p-2 rounded-md indent-8 border border-white outline-none"
          />
        </div>

        {/* Buttons */}
        <button
          onClick={() => addText("Text box", 14)}
          className="bg-[#FF5733] w-full mt-5 cursor-pointer rounded-md flex items-center justify-center py-2.5 gap-3"
        >
          <TfiText size={20} /> Add a text box
        </button>
        <button className="w-full mt-5 border cursor-pointer border-[#ffffff] rounded-md py-2.5">
          Add your brand fonts
        </button>

        {/* Default text styling */}
        <div className="pt-8">
          <h2 className="text-white font-medium mb-2">Default Text Style</h2>
          <button
            onClick={() => addText("Add a heading", 28, "Arial")}
            className="w-full mt-2 border cursor-pointer border-white rounded-md py-2.5 text-3xl text-white"
          >
            Add a heading
          </button>
          <button
            onClick={() => addText("Add Subheading", 18, "Arial")}
            className="w-full mt-2 border cursor-pointer border-white rounded-md py-3 text-xl text-white"
          >
            Add Subheading
          </button>
          <button
            onClick={() => addText("Add a little bit of body text", 12, "Arial")}
            className="w-full mt-2 border cursor-pointer border-white rounded-md py-4 text-sm text-white"
          >
            Add a little bit of body text
          </button>
        </div>
      </div>

      {/* Font Combination Section */}
      <div className="flex flex-col gap-4 text-white rounded-lg mt-5">
        <h3 className="font-medium">Font Combination</h3>
        <div className="grid grid-cols-2 gap-4">
          {fontCombos.map((font) => (
            <button
              key={font.name}
              className="h-24 bg-[#003366] rounded transition flex flex-col items-center justify-center text-2xl cursor-pointer hover:bg-[#004488]"
              onClick={() => {
                onFontSelect(`${font.helloFont} ${font.friendFont}`);
                addText("Hello friend", 16, font.fontFamily);
              }}
            >
              <span className={`${font.helloFont} text-white`}>Hello</span>
              <span className={`${font.friendFont} text-white`}>friend</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Text;
