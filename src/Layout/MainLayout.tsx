// import React from "react";
// import Sidebr from "./Sideber";
// import Header from "./Header";
// import { Outlet } from "react-router-dom";
// import TemplateDrawer from "../Components/TemplateDrawer";
// import Footer from "./Footer";

// const MainLayout: React.FC = () => {
//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <Sidebr />

//       {/* Main Content Area */}
//       <div className="flex flex-col flex-1">
//         {/* Header */}
//         <Header />

//         {/* Page Content */}
//         <div className="flex-1 relative bg-gray-100">
//           <TemplateDrawer />
//           <Footer />
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;



// import React from "react";
// import Sidebr from "./Sideber";
// import Header from "./Header";
// import { Outlet } from "react-router-dom";
// import TemplateDrawer from "../Components/TemplateDrawer";
// import Footer from "./Footer";
// import { useTemplate } from "../Context/TemplateContext";
// import { ZoomProvider } from "../Context/ZoomContext";

// const MainLayout: React.FC = ({ children }: {children: React.ReactNode}) => {
//   const { isTemplateOpen } = useTemplate(); // Get drawer state from context

//   return (
//     <ZoomProvider>
//       <div className="flex h-screen overflow-hidden">
//         {/* Sidebar */}
//         <Sidebr />

//         {/* Main Content Area */}
//         <div className="flex flex-col flex-1">
//           {/* Header */}
//           <Header />

//           {/* Page Content */}
//           <div className="flex-1 relative bg-gray-100 flex flex-col min-h-0">
//             {/* Template Drawer */}
//             <TemplateDrawer />
//             <Outlet />

//             {/* Footer */}
            // <div
            //   className={`flex-1 flex flex-col transition-all duration-300 ${
            //     isTemplateOpen ? "ml-[296px]" : "ml-0"
            //   }`}
            // >
            //   <Footer />
            // </div>
//           </div>
//         </div>
//       </div>
//     </ZoomProvider>
//   );
// };

// export default MainLayout;






import React from "react";
import Sidebr from "./Sideber";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import TemplateDrawer from "../Components/TemplateDrawer";
import Footer from "./Footer";
import { useTemplate } from "../Context/TemplateContext";
import { ZoomProvider } from "../Context/ZoomContext";

const MainLayout: React.FC = () => {
  const { isTemplateOpen } = useTemplate();

  return (
    <ZoomProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebr />

        {/* Main Content Area */}
        <div className="flex relative flex-col flex-1">
          {/* Header */}
          <Header />
          <TemplateDrawer />
          {/* Page Content */}
          <div className="flex-1  bg-gray-100 lg:overflow-y-auto lg:overflow-x-auto flex flex-col">
            <Outlet />
            <div
              className={`flex-1 flex flex-col transition-all duration-300 ${
                isTemplateOpen ? "ml-[296px]" : "ml-0"
              }`}
            >
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </ZoomProvider>
  );
};

export default MainLayout;
