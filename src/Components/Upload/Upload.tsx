import React, { useRef, useState } from "react";
import searchIcon from "../../assets/Image/search.png";
import imgOne from "../../assets/Image/drive.png";
import imgTwo from "../../assets/Image/upload1.png";
import imgThree from "../../assets/Image/photos.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addImage } from "../Templates/slice/template.slice";

const Upload: React.FC = () => {
  const dispatch = useDispatch();
  const templates = useSelector((state: RootState) => state.templates);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const targetId = templates.activeTemplateId;
    if (!targetId || !templates[targetId]?.isCreated) {
      alert("Please select a template first.");
      return;
    }

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        dispatch(
          addImage({
            templateId: targetId,
            image: {
              id: crypto.randomUUID(),
              src,
              x: 50,
              y: 50,
              width: 120,
              height: 100,
              zIndex: Date.now(),
            },
          })
        );
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <div className="text-[#fff]">
        <form className="relative">
          <input
            type="text"
            placeholder="search for fonts and combination"
            className="w-full border border-[#fff] py-2 px-2 pl-[2rem] rounded text-[0.8rem] text-[#fff]"
          />
          <button className="absolute cursor-pointer top-3 left-3 text-[1.5rem]">
            <img src={searchIcon} alt="Search Icon" />
          </button>
        </form>

        {/* Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex justify-between items-center py-2 bg-[#FF5733] rounded mt-4 pr-2 cursor-pointer hover:bg-[#e04a27] transition-colors"
        >
          <span className="w-full text-center">Upload files</span>
          <div className="flex gap-1 cursor-pointer">
            <div className="bg-white w-1 h-1 rounded-full" />
            <div className="bg-white w-1 h-1 rounded-full" />
            <div className="bg-white w-1 h-1 rounded-full" />
          </div>
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border border-dashed border-[#fff] mx-2 p-4 pb-8 mt-5 rounded flex flex-col gap-3 text-center cursor-pointer transition-colors ${
            isDragging ? "bg-white/20" : "bg-[#969696ad]"
          }`}
        >
          {isDragging ? (
            <div className="items-center text-center my-[15.3%]">
              <p>Drop Here</p>
            </div>
          ) : (
            <div>
              <h4 className="text-[0.8rem]">
                Drag media here to upload or connect an account...
              </h4>
              <div className="w-full mt-2">
                <div className="flex gap-2 justify-center">
                  <img src={imgOne} alt="Drive" />
                  <img src={imgTwo} alt="Upload" />
                  <img src={imgThree} alt="Photos" />
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-[0.8rem] mt-3">
          You can upload images (PNG, JPG, GIF, WebP)
        </p>
      </div>
    </div>
  );
};

export default Upload;
