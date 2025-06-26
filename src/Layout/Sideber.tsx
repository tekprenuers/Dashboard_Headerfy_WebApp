import React, { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import {
  PiFileArrowUp,
  PiPencilSimpleLine,
  PiShapesLight,
} from "react-icons/pi";
import { TfiText } from "react-icons/tfi";
import { CgFolder } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import Logo from "../assets/Image/Header_Logo.png";
import { useTemplate } from "../Context/TemplateContext";
import MenuDropDown from "../Components/MenuDropDownAndEditingMode/MenuDropDown";
import { div } from "framer-motion/client";


// Define the sidebar items in an array
const sidebarItems = [
  { name: "Template", icon: MdOutlineDashboard },
  { name: "Element", icon: PiShapesLight },
  { name: "Text", icon: TfiText },
  { name: "Upload", icon: PiFileArrowUp },
  { name: "Draw", icon: PiPencilSimpleLine },
  { name: "Projects", icon: CgFolder },
];

const Sidebar: React.FC = () => {
  const { setIsTemplateOpen, setSelectedTemplate, selectedTemplate } =
    useTemplate(); // Get drawer state
    const [showMenu,setShowMenu] = useState(false);

  // Handle sidebar item click
  const handleClick = (sidebar: string) => {
    setIsTemplateOpen(true);
    setSelectedTemplate(sidebar); 
  };
  const toggleMenu = () =>{
        setShowMenu(!showMenu);
  }

  return (
    <>
    <div className="h-screen px-5 bg-[#003366] text-white flex flex-col py-8 items-center z-30">
      {/* Sidebar Items */}
      <div className="flex flex-col items-center gap-4">
        {/* Logo and Dropdown */}
        <div className="flex items-center pl-4 cursor-pointer" onClick={toggleMenu}>
          <img src={Logo} alt="logo" className="w-5 h-7" />
          <RiArrowDropDownLine size={24} className="cursor-pointer" />
        </div>
     
       

        {/* Sidebar Links */}
        <div className="flex flex-col items-center gap-4 mt-6">
        {sidebarItems.map((item , i) => (
          <div
            key={i}
            onClick={() => handleClick(item.name)}
            className="flex flex-col items-center cursor-pointer"
          >
            <item.icon
              size={selectedTemplate === item.name ? 30 : 15}
              className={`opacity-80 hover:opacity-100 ${
                selectedTemplate === item.name
                  ? "text-[#FF5733] rounded-md p-1 border inline-flex items-center justify-center border-white"
                  : "text-white"
              }`}
            />
            <p className="text-[12px]">{item.name}</p>
          </div>
        ))}
        </div>
      </div>
    </div>
    {showMenu && 
    <div className="fixed inset-0  flex items-start justify-end top-17 right-285 z-50">
       <MenuDropDown/>
    </div>
     
      }
  </>);
};

export default Sidebar;
