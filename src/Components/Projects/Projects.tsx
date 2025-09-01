// import React, { useState } from "react";
// import { BiSearchAlt } from "react-icons/bi";
// import Star from "../../assets/Image/Star.png";
// import folder from "../../assets/Image/folder.png";
// import Template_1 from "../Templates/Template_1";
// import Template_2 from "../Templates/Template_2";
// import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
// import { Plus } from "lucide-react";

// const Projects: React.FC = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const templates = [
//     {
//       component: <Template_1 />,
//       title: "Interior Design - Letterhead",
//     },
//     {
//       component: <Template_2 />,
//       title: "Hospital - Letterhead",
//     },
//     // Add more templates here as needed
//   ];

//   const nextSlide = () => {
//     setCurrentSlide((prev) => prev + 1);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => prev - 1);
//   };

//   // Calculate if arrows should be visible
//   const showLeftArrow = currentSlide > 0;
//   const showRightArrow = currentSlide < templates.length - 1;

//   return (
//     <section>
//       {/* Search Input */}
//       <div className="relative">
//         <BiSearchAlt
//           size={20}
//           className="absolute top-1/2 left-4 -translate-y-1/2 text-white"
//         />
//         <input
//           type="text"
//           placeholder="Search for fonts and combinations"
//           className="w-full p-2 rounded-md indent-8 border border-white outline-none"
//         />
//       </div>

//       {/* Designs Section */}
//       <div className="relative mt-10">
//         <h2 className="text-lg font-semibold mb-4">Designs</h2>

//         {/* Navigation Arrows */}
//         {showLeftArrow && (
//           <button
//             onClick={prevSlide}
//             className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-full"
//           >
//             <RiArrowLeftSLine size={30} />
//           </button>
//         )}

//         {showRightArrow && (
//           <button
//             onClick={nextSlide}
//             className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-full"
//           >
//             <RiArrowRightSLine size={30} />
//           </button>
//         )}

//         {/* Template Slider */}
//         <div className="relative overflow-hidden">
//           <div
//             className="flex transition-transform duration-300"
//             style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//           >
//             {/* Group templates in pairs */}
//             {Array.from({ length: Math.ceil(templates.length / 2) }).map(
//               (_, pairIndex) => (
//                 <div key={pairIndex} className="w-full flex-shrink-0 px-">
//                   <div className="grid grid-cols-2 gap-4">
//                     {templates
//                       .slice(pairIndex * 2, pairIndex * 2 + 2)
//                       .map((template, index) => (
//                         <div key={index} className="flex flex-col">
//                           <div className="h-48 overflow-hidden flex items-center justify-center rounded-lg p-2">
//                             <div className="scale-75 origin-top">
//                               {template.component}
//                             </div>
//                           </div>
//                           <p className="mt-2 text-sm">
//                             {template.title}
//                           </p>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Folders Section */}
//       <div className="mt-5">
//         <h2 className="text-lg font-semibold mb-2">Folders</h2>
//         <div className="flex items-center gap-4">
//           <div className="flex justify-center border-2 border-dashed border-gray-400 p-4 rounded-md cursor-pointer hover:bg-white/10">
//             <Plus size={24} />
//           </div>
//           <p className="text-sm">Create folders</p>
//         </div>
//       </div>

//       {/* Starred Section */}
//       <div className="mt-5">
//         <div className="flex items-center gap-4 relative cursor-pointer">
//           <img src={folder} alt="folder" className="w-15 h-15" />
//           <img
//             src={Star}
//             alt="star"
//             className="w-5 h-5 absolute top-6 left-5"
//           />
//           <h2 className="text-sm">Starred</h2>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Projects;











import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import Star from "../../assets/Image/Star.png";
import folder from "../../assets/Image/folder.png";
import Template_1 from "../Templates/Template_1";
import { Template_2 } from "../Templates/Template_2";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Plus } from "lucide-react";

const Projects: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const templates = [
    {
      component: <Template_1 />,
      title: "Interior Design - Letterhead",
    },
    {
      component: <Template_2 />,
      title: "Hospital - Letterhead",
    },
    // Add more templates here as needed
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  // Calculate if arrows should be visible
  const showLeftArrow = currentSlide > 0;
  const showRightArrow = currentSlide < templates.length - 1;

  return (
    <section>
      {/* Search Input */}
      <div className="relative">
        <BiSearchAlt
          size={20}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-white"
        />
        <input
          type="text"
          placeholder="Search for fonts and combinations"
          className="w-full p-2 rounded-md indent-8 border border-white outline-none"
        />
      </div>

      {/* Designs Section */}
      <div className="relative mt-10">
        <h2 className="text-lg font-semibold mb-4">Designs</h2>

        {/* Navigation Arrows */}
        {showLeftArrow && (
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-full"
          >
            <RiArrowLeftSLine size={30} />
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-full"
          >
            <RiArrowRightSLine size={30} />
          </button>
        )}

        {/* Template Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Group templates in pairs */}
            {Array.from({ length: Math.ceil(templates.length / 2) }).map(
              (_, pairIndex) => (
                <div key={pairIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-2 gap-2">
                    {templates
                      .slice(pairIndex * 2, pairIndex * 2 + 2)
                      .map((template, index) => (
                        <div key={index} className="">
                          <div className="h-[220px] w-full overflow-hidden">
                            <div className="scale-[0.40] origin-top w-[3px] ">
                              {template.component}
                            </div>
                          </div>
                          <p className="text-sm -mt-15">
                            {template.title}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Folders Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Folders</h2>
        <div className="flex items-center gap-4">
          <div className="flex justify-center border-2 border-dashed border-gray-400 p-4 rounded-md cursor-pointer hover:bg-white/10">
            <Plus size={24} />
          </div>
          <p className="text-sm">Create folders</p>
        </div>
      </div>

      {/* Starred Section */}
      <div className="mt-5">
        <div className="flex items-center gap-4 relative cursor-pointer">
          <img src={folder} alt="folder" className="w-15 h-15" />
          <img
            src={Star}
            alt="star"
            className="w-5 h-5 absolute top-6 left-5"
          />
          <h2 className="text-sm">Starred</h2>
        </div>
      </div>
    </section>
  );
};

export default Projects;