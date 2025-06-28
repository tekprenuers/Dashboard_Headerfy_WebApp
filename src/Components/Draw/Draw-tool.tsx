import { LuMousePointer2 } from "react-icons/lu";
import { VscChromeClose } from "react-icons/vsc";

type Props = {
  onClose: () => void;
};

export default function DrawTool({onClose}: Props) {
  return (
    <>
      <section className=" absolute bottom-65 left-[5%] translate-x-[-60%]">
        <button
          onClick={onClose}
          className="flex items-center ml-3 justify-center p-4 bg-[#0F3F6F] rounded-full cursor-pointer mb-1"
        >
          <VscChromeClose className="text-white" size={20} />
        </button>
        <div className="flex w-20 flex-col items-center bg-white border-4 border-[#0F3F6F] rounded-2xl py-4 shadow-lg">
          {/* Blue pencils */}
          <div className="mb-4 flex w-12 flex-col space-y-2 items-center">
            {/* Blue pencil 1 */}
            {/* <div className="flex items-center cursor-pointer">
              <div className="h-2 w-4 bg-blue-600 rounded-l-full border border-blue-700"></div>
              <div className="h-2 w-3 bg-gray-100 border-t border-b border-gray-200"></div>
              <div className="h-1.5 w-2 bg-blue-500 rounded-r-full"></div>
              <div className="h-1 w-1 bg-blue-800 rounded-full"></div>
            </div> */}

            <div className="flex items-center cursor-pointer">
              <div className="h-5  bg-gray-200 rounded-l-full border-4 border-gray-100" />
              <div className="h-5 w-3 bg-blue-900 border-t-4 border-b-4 border-blue-800" />
              <div className="h-5 w-8 bg-gray-100 rounded-r-full" />
              <div className="h-2 w-2 bg-blue-800 rounded-sm" />
            </div>
          </div>

          {/* Red pencils */}
          <div className="mb-4 flex w-12 flex-col items-center space-y-2">
            {/* Red diamond tool */}
            <div className="h-2 w-2 rotate-45 bg-red-500 border border-red-600"></div>
            {/* Red pencil with arrow */}
            <div className="flex items-center">
              <div className="h-2 w-4 bg-red-600 rounded-l-full border border-red-700"></div>
              <div className="h-2 w-3 bg-gray-100 border-t border-b border-gray-200"></div>
              <div className="h-1.5 w-2 bg-red-500 rounded-r-full"></div>
              <div className="h-0 w-0 border-l-[3px] border-r-0 border-t-[2px] border-b-[2px] border-l-red-600 border-t-transparent border-b-transparent"></div>
            </div>
          </div>

          {/* Yellow pencils */}
          <div className="mb-4 flex w-12 flex-col space-y-2 items-center">
            {/* Yellow pencil 1 */}
            <div className="flex items-center">
              <div className="h-2 w-3 bg-yellow-400 rounded-l-full border border-yellow-500"></div>
              <div className="h-2 w-3 bg-gray-100 border-t border-b border-gray-200"></div>
              <div className="h-1.5 w-2 bg-yellow-500 rounded-r-full"></div>
              <div className="h-1 w-1 bg-yellow-700 rounded-full"></div>
            </div>
            {/* green pencil 2 */}
            <div className="flex items-center">
              <div className="h-2 w-4 bg-green-400 rounded-l-full border border-green-500"></div>
              <div className="h-2 w-3 bg-gray-100 border-t border-b border-gray-200"></div>
              <div className="h-1.5 w-2 bg-green-500 rounded-r-full"></div>
              <div className="h-1 w-1 bg-green-700 rounded-full"></div>
            </div>
          </div>

          {/* Pink eraser */}
          <div className="mb-8 h-8 w-15 bg-pink-300 rounded-md border border-pink-400 relative shadow-sm">
            <div className="absolute inset-1 bg-pink-200 rounded-sm"></div>
            <div className="absolute top-1 left-1 h-1 w-2 bg-pink-100 rounded-sm opacity-60"></div>
          </div>

          {/* Bottom drawing tools */}
          <div className="flex flex-col items-center space-y-4">
            {/* Cursor/Selection tool */}
            <button className="flex h-8 w-8 items-center justify-center text-gray-600 hover:text-gray-800 transition-colors">
              <LuMousePointer2 size={20} className="cursor-pointer" />
            </button>

            {/* Color picker - red */}
            <button className="h-4 w-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors border border-gray-300 shadow-sm"></button>

            {/* Menu/More tools */}
            <button className="flex flex-col space-y-1 hover:opacity-70 transition-opacity p-1">
              <div className="h-0.5 w-4 bg-gray-700 rounded-full"></div>
              <div className="h-0.5 w-4 bg-gray-700 rounded-full"></div>
              <div className="h-0.5 w-4 bg-gray-700 rounded-full"></div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}




{/* <div className="flex items-center cursor-pointer" onClick={() => setSelectedTool("Pencil")}> */}