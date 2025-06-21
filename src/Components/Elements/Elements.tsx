import React, {useState} from 'react'
import { BiSearchAlt } from 'react-icons/bi';
import { FaArrowLeft } from 'react-icons/fa';

const elements: Record<
  "shapes" | "lines" | "icons",
  { name: string; svg: React.ReactNode }[]
> = {
  shapes: [
    {
      name: "Square",
      svg: (
        <svg width="40" height="40">
          <rect width="40" height="40" fill="" />
        </svg>
      ),
    },
    {
      name: "Circle",
      svg: (
        <svg width="40" height="40">
          <circle cx="20" cy="20" r="20" fill="" />
        </svg>
      ),
    },
    {
      name: "Triangle",
      svg: (
        <svg width="40" height="40">
          <polygon points="20,0 40,40 0,40" fill="" />
        </svg>
      ),
    },
    {
      name: "Star",
      svg: (
        <polygon
          points="50,10 60,40 90,40 65,60 75,90 50,70 25,90 35,60 10,40 40,40"
          fill=""
        />
      ),
    },
    {
      name: "Heart",
      svg: (
        <path
          d="M10,30 A10,10 0 0,1 30,30 A10,10 0 0,1 50,30 Q50,50 30,70 Q10,50 10,30 Z"
          fill="red"
        />
      ),
    },
    {
      name: "Diamond",
      svg: <polygon points="25,0 50,25 25,50 0,25" fill="" />,
    },
    {
      name: "Cloud",
      svg: (
        <path
          d="M20,10 A10,10 0 0,1 40,10 A10,10 0 0,1 60,10 Q60,30 30,30 Q0,30 0,10 A10,10 0 0,1 20,10 Z"
          fill=""
        />
      ),
    },
    {
      name: "Ellipse",
      svg: <ellipse cx="25" cy="15" rx="20" ry="10" fill="" />,
    },
    {
      name: "Pentagon",
      svg: <polygon points="25,0 50,20 40,50 10,50 0,20" fill="" />,
    },
    {
      name: "Hexagon",
      svg: <polygon points="10,20 30,0 50,20 50,40 30,60 10,40" fill="" />,
    },
    {
      name: "Octagon",
      svg: (
        <polygon
          points="10,20 20,10 40,10 50,20 50,40 40,50 20,50 10,40"
          fill=""
        />
      ),
    },
  ],
  lines: [
    {
      name: "Arrow Right",
      svg: (
        <svg width="40" height="20">
          <line x1="0" y1="10" x2="40" y2="10" stroke="black" strokeWidth="3" />
        </svg>
      ),
    },
    {
      name: "Arrow Left",
      svg: (
        <svg width="40" height="20">
          <line x1="40" y1="10" x2="0" y2="10" stroke="black" strokeWidth="3" />
        </svg>
      ),
    },
    {
      name: "Straight Line",
      svg: (
        <line x1="0" y1="10" x2="40" y2="10" stroke="black" strokeWidth="3" />
      ),
    },
    {
      name: "Arrow Right",
      svg: (
        <line
          x1="0"
          y1="10"
          x2="40"
          y2="10"
          stroke="black"
          strokeWidth="3"
          markerEnd="url(#arrowhead)"
        />
      ),
    },
    {
      name: "Arrow Left",
      svg: (
        <line
          x1="40"
          y1="10"
          x2="0"
          y2="10"
          stroke="black"
          strokeWidth="3"
          markerEnd="url(#arrowhead)"
        />
      ),
    },
    {
      name: "Zigzag Line",
      svg: (
        <polyline
          points="0,10 10,20 20,10 30,20 40,10"
          stroke="black"
          strokeWidth="3"
          fill="none"
        />
      ),
    },
  ],
  icons: [
    {
      name: "Pencil",
      svg: (
        <svg width="40" height="40">
          <path d="M10 10 L30 30" stroke="black" strokeWidth="3" />
        </svg>
      ),
    },
  ],
};

const Elements: React.FC = () => {
   const [selectedElements, setSelectedElements] = useState<string[]>([]);
   const [activeCategory, setActiveCategory] = useState<
     keyof typeof elements | null
   >(null);

   const addElement = (element: string) => {
     setSelectedElements([...selectedElements, element]);
   };
  return (
    <div className="text-white">
      {activeCategory ? (
        <div>
          <button
            onClick={() => setActiveCategory(null)}
            className="mb-2 text-white"
          >
            <div className="flex items-center gap-2">
              {" "}
              <FaArrowLeft size={15} /> <span>Back</span>
            </div>
          </button>
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
          <h3 className="font-semibold capitalize mb-2 mt-5">{activeCategory}</h3>
          <div className="flex flex-wrap gap-7">
            {elements[activeCategory].map((item) => (
              <div
                key={item.name}
                onClick={() => addElement(item.name)}
                className="p-2 cursor-pointer"
              >
                {item.svg}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
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
          {Object.entries(elements).map(([category, items]) => (
            <div key={category} className="mt-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium capitalize">
                  {category.replace("_", " & ")}
                </h3>
                <button
                  onClick={() =>
                    setActiveCategory(category as keyof typeof elements)
                  }
                >
                  see all
                </button>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {items.slice(0, 3).map((item) => (
                  <div
                    key={item.name}
                    onClick={() => addElement(item.name)}
                    className="p-2 cursor-pointer"
                  >
                    {item.svg}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Elements





// import React, { useState } from "react";
// import { BiSearchAlt } from "react-icons/bi";
// import { FaArrowLeft } from "react-icons/fa";

// const elements: Record<
//   "shapes" | "lines" | "icons",
//   { name: string; svg: React.ReactNode }[]
// > = {
//   shapes: [
//     {
//       name: "Square",
//       svg: (
//         <svg width="40" height="40">
//           <rect width="40" height="40" fill="blue" />
//         </svg>
//       ),
//     },
//     {
//       name: "Circle",
//       svg: (
//         <svg width="40" height="40">
//           <circle cx="20" cy="20" r="20" fill="red" />
//         </svg>
//       ),
//     },
//     {
//       name: "Triangle",
//       svg: (
//         <svg width="40" height="40">
//           <polygon points="20,0 40,40 0,40" fill="green" />
//         </svg>
//       ),
//     },
//     {
//       name: "Star",
//       svg: (
//         <svg width="40" height="40">
//           <polygon
//             points="20,0 25,15 40,15 28,25 32,40 20,30 8,40 12,25 0,15 15,15"
//             fill="yellow"
//           />
//         </svg>
//       ),
//     },
//     {
//       name: "Heart",
//       svg: (
//         <svg width="40" height="40">
//           <path
//             d="M10,30 A10,10 0 0,1 30,30 A10,10 0 0,1 50,30 Q50,50 30,70 Q10,50 10,30 Z"
//             fill="red"
//           />
//         </svg>
//       ),
//     },
//   ],
//   lines: [
//     {
//       name: "Arrow Right",
//       svg: (
//         <svg width="40" height="20">
//           <line x1="0" y1="10" x2="40" y2="10" stroke="black" strokeWidth="3" />
//         </svg>
//       ),
//     },
//     {
//       name: "Arrow Left",
//       svg: (
//         <svg width="40" height="20">
//           <line x1="40" y1="10" x2="0" y2="10" stroke="black" strokeWidth="3" />
//         </svg>
//       ),
//     },
//     {
//       name: "Straight Line",
//       svg: (
//         <svg width="40" height="20">
//           <line x1="0" y1="10" x2="40" y2="10" stroke="black" strokeWidth="3" />
//         </svg>
//       ),
//     },
//   ],
//   icons: [
//     {
//       name: "Pencil",
//       svg: (
//         <svg width="40" height="40">
//           <path d="M10 10 L30 30" stroke="black" strokeWidth="3" />
//         </svg>
//       ),
//     },
//   ],
// };

// const Elements: React.FC = () => {
//   const [selectedElements, setSelectedElements] = useState<string[]>([]);
//   const [activeCategory, setActiveCategory] = useState<
//     keyof typeof elements | null
//   >(null);

//   const addElement = (element: string) => {
//     setSelectedElements((prev) => [...prev, element]);
//   };

//   return (
//     <div className="text-white">
//       {activeCategory ? (
//         <div>
//           <button
//             onClick={() => setActiveCategory(null)}
//             className="mb-2 text-white"
//           >
//             <div className="flex items-center gap-2">
//               <FaArrowLeft size={15} /> <span>Back</span>
//             </div>
//           </button>
//           <div className="relative">
//             <BiSearchAlt
//               size={20}
//               className="absolute top-1/2 left-4 -translate-y-1/2 text-white"
//             />
//             <input
//               type="text"
//               placeholder="Search for fonts"
//               className="w-full p-2 rounded-md indent-8 border border-white outline-none"
//             />
//           </div>
//           <h3 className="font-semibold capitalize mb-2 mt-5">
//             {activeCategory}
//           </h3>
//           <div className="flex flex-wrap gap-7">
//             {elements[activeCategory].map((item) => (
//               <div
//                 key={item.name}
//                 onClick={() => addElement(item.name)}
//                 className="p-2 cursor-pointer"
//               >
//                 {item.svg}
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <div className="relative">
//             <BiSearchAlt
//               size={20}
//               className="absolute top-1/2 left-4 -translate-y-1/2 text-white"
//             />
//             <input
//               type="text"
//               placeholder="Search for fonts"
//               className="w-full p-2 rounded-md indent-8 border border-white outline-none"
//             />
//           </div>
//           {Object.entries(elements).map(([category, items]) => (
//             <div key={category} className="mt-4">
//               <div className="flex justify-between items-center">
//                 <h3 className="font-bold capitalize">
//                   {category.replace("_", " & ")}
//                 </h3>
//                 <button
//                   onClick={() =>
//                     setActiveCategory(category as keyof typeof elements)
//                   }
//                 >
//                   See All
//                 </button>
//               </div>
//               <div className="flex gap-2 overflow-x-auto">
//                 {items.slice(0, 3).map((item) => (
//                   <div
//                     key={item.name}
//                     onClick={() => addElement(item.name)}
//                     className="p-2 cursor-pointer"
//                   >
//                     {item.svg}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Elements;

