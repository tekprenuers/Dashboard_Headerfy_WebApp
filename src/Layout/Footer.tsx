// import React, { useRef } from "react";
// import { useZoom } from "../Context/ZoomContext";

// const Footer: React.FC = () => {
//   const { progress, setProgress, setZoomLevel } = useZoom();
//   const sliderRef = useRef<HTMLDivElement>(null);

//   const handleMouseDown = (e: React.MouseEvent) => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     const updateZoom = (clientX: number) => {
//       const rect = slider.getBoundingClientRect();
//       let newProgress = ((clientX - rect.left) / rect.width) * 100;

//       // Clamp progress between 10% and 500%
//       newProgress = Math.max(10, Math.min(newProgress, 100));

//       setProgress(newProgress);
//       setZoomLevel(0.1 + (newProgress / 100) * 4.9);
//     };

//     const handleMouseMove = (event: MouseEvent) => {
//       updateZoom(event.clientX);
//     };

//     const handleMouseUp = () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };

//     updateZoom(e.clientX);
//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);
//   };

//   return (
//     <footer className="bg-[#003366] py-4 px-2 mt-auto fixed bottom-0 right-0 w-full">
//       <div className="flex items-center justify-end text-white gap-2 pr-6">
//         <span>Page 1/1</span>
//         <div
//           ref={sliderRef}
//           className="relative w-40 h-1 bg-[#D9D9D9] rounded-full cursor-pointer"
//           onMouseDown={handleMouseDown}
//         >
//           <div
//             className="absolute top-0 left-0 h-full bg-[#d9d9d9] rounded-full"
//             style={{ width: `${progress}%` }}
//           ></div>

//           <div
//             className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-3 border-[#d9d9d9] rounded-full cursor-pointer"
//             style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
//           ></div>
//         </div>
//         <span>{progress.toFixed(0)}%</span>
//       </div>
//     </footer>
//   );
// };

// export default Footer;





import React, { useRef } from "react";
import { useZoom } from "../Context/ZoomContext";

const Footer: React.FC = () => {
  const { progress, setProgress, setZoomLevel } = useZoom();
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const updateZoom = (clientX: number) => {
      const rect = slider.getBoundingClientRect();
      let newProgress = ((clientX - rect.left) / rect.width) * 100;

      // Clamp progress between 10% and 500%
      newProgress = Math.max(10, Math.min(newProgress, 100));

      setProgress(newProgress);
      setZoomLevel(0.1 + (newProgress / 100) * 4.9);
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateZoom(event.clientX);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    updateZoom(e.clientX);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <footer className="bg-[#003366] py-4 px-2 sticky bottom-0 w-full mt-auto">
      <div className="flex items-center justify-end text-white gap-2 pr-6">
        <span>Page 1/1</span>
        <div
          ref={sliderRef}
          className="relative w-40 h-1 bg-[#D9D9D9] rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          <div
            className="absolute top-0 left-0 h-full bg-[#d9d9d9] rounded-full"
            style={{ width: `${progress}%` }}
          ></div>

          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-3 border-[#d9d9d9] rounded-full cursor-pointer"
            style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
          ></div>
        </div>
        <span>{progress.toFixed(0)}%</span>
      </div>
    </footer>
  );
};

export default Footer;