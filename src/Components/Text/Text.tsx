import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { TfiText } from "react-icons/tfi";

const fontCombos = [
  {
    name: "Dancing Script + Poppins",
    helloFont: "font-dancing",
    friendFont: "font-poppins",
  },
  {
    name: "Pacifico + Montserrat",
    helloFont: "font-pacifico",
    friendFont: "font-montserrat",
  },
  {
    name: "Poppins + Dancing Script",
    helloFont: "font-poppins",
    friendFont: "font-dancing",
  },
  {
    name: "Montserrat + Pacifico",
    helloFont: "font-montserrat",
    friendFont: "font-pacifico",
  },
];

interface TextProps {
  onFontSelect: (font: string) => void;
}

const Text: React.FC<TextProps> = ({ onFontSelect }) => {
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
        <button className="bg-[#FF5733] w-full mt-5 cursor-pointer rounded-md flex items-center justify-center py-2.5 gap-3">
          <TfiText size={20} /> Add a text box
        </button>
        <button className="w-full mt-5 border cursor-pointer border-[#ffffff] rounded-md py-2.5">
          Add your brand fonts
        </button>

        {/* Default text styling */}
        <div className="pt-16">
          <h2 className="text-white font-medium">Default Text Style</h2>
          <button className="w-full mt-2 border cursor-pointer border-white rounded-md py-2.5 text-3xl">
            Add a heading
          </button>
          <button className="w-full mt-2 border cursor-pointer border-white rounded-md py-3 text-xl">
            Add Subheading
          </button>
          <button className="w-full mt-2 border cursor-pointer border-white rounded-md py-4 text-sm">
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
              className="h-24 bg-[#003366] rounded transition flex flex-col items-center justify-center text-2xl cursor-pointer"
              onClick={() =>
                onFontSelect(`${font.helloFont} ${font.friendFont}`)
              }
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
