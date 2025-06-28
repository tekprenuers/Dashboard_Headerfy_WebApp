// import React, { useEffect, useState } from "react";
// import Sidebr from "./Sideber";
// import Header from "./Header";
// import { Outlet } from "react-router-dom";
// import TemplateDrawer from "../Components/TemplateDrawer";
// import Footer from "./Footer";
// import { useTemplate } from "../Context/TemplateContext";
// import { ZoomProvider } from "../Context/ZoomContext";
// import DrawTool from "../Components/Draw/Draw-tool";

// const MainLayout: React.FC = () => {
//   const { isTemplateOpen, selectedTemplate, setSelectedTemplate, setIsTemplateOpen } = useTemplate();
//   const [showDrawTool, setShowDrawTool] = useState(false);

//   useEffect(() => {
//     if (selectedTemplate === "Draw") {
//       setShowDrawTool(true);
//       setIsTemplateOpen(false);
//     } else {
//       setShowDrawTool(false);
//     }
//   }, [selectedTemplate, setIsTemplateOpen]);
  
  
//   return (
//     <ZoomProvider>
//       <div className="flex h-screen overflow-hidden">
//         {/* Sidebar */}
//         <Sidebr />

//         {/* Main Content Area */}
//         <div className="flex relative flex-col flex-1">
//           {/* Header */}
//           <Header />
//           <TemplateDrawer showButton={!showDrawTool} />
//           {/* <TemplateDrawer /> */}
//           {/* Page Content */}
//           <div className="flex-1  bg-gray-100 lg:overflow-y-auto lg:overflow-x-auto flex flex-col">
//             <Outlet />
//             <div
//               className={`flex-1 flex flex-col transition-all duration-300 relative ${
//                 isTemplateOpen ? "ml-[296px]" : "ml-0"
//               }`}
//             >
//               {showDrawTool && "Draw" && (
//                 <DrawTool
//                   onClose={() => {
//                     setShowDrawTool(false);
//                     setSelectedTemplate("");
//                   }}
//                 />
//               )}
//               {/* <Footer /> */}
//             </div>
//           </div>
//           <Footer />
//         </div>
//       </div>
//     </ZoomProvider>
//   );
// };

// export default MainLayout;




import React, { useEffect, useState } from "react";
import Sidebr from "./Sideber";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import TemplateDrawer from "../Components/TemplateDrawer";
import Footer from "./Footer";
import { useTemplate } from "../Context/TemplateContext";
import { ZoomProvider } from "../Context/ZoomContext";
import DrawTool from "../Components/Draw/Draw-tool";

const MainLayout: React.FC = () => {
  const {
    isTemplateOpen,
    selectedTemplate,
    setSelectedTemplate,
    setIsTemplateOpen,
  } = useTemplate();
  const [showDrawTool, setShowDrawTool] = useState(false);

  useEffect(() => {
    if (selectedTemplate === "Draw") {
      setShowDrawTool(true);
      setIsTemplateOpen(false);
    } else {
      setShowDrawTool(false);
    }
  }, [selectedTemplate, setIsTemplateOpen]);

  return (
    <ZoomProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebr />

        {/* Main Content Area */}
        <div className="flex relative flex-col flex-1">
          {/* Header */}
          <Header />
          <TemplateDrawer showButton={!showDrawTool} />

          {/* Page Content - with proper padding for footer */}
          <div className="flex-1 bg-gray-100 lg:overflow-y-auto lg:overflow-x-auto flex flex-col pb-16">
            <Outlet />
            <div
              className={`flex-1 transition-all duration-300 relative ${
                isTemplateOpen ? "ml-[296px]" : "ml-0"
              }`}
            >
              {/* <Outlet /> */}

              {showDrawTool && "Draw" && (
                <DrawTool
                  onClose={() => {
                    setShowDrawTool(false);
                    setSelectedTemplate("");
                  }}
                />
              )}
            </div>
          </div>

          {/* Footer positioned properly */}
          <Footer />
        </div>
      </div>
    </ZoomProvider>
  );
};

export default MainLayout;