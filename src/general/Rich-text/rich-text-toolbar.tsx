import { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Type,
  Plus,
  Minus,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/pop-over";
import { X , Circle} from "lucide-react"; 
import Edit from "../../assets/Image/edit_logo.png";

interface RichTextToolbarProps {
  onClose?: () => void;
  onCommand?: (command: string, value?: string) => void;
  onFontChange?: (font: string) => void;
  onFontSizeChange?: (size: string) => void;
  onColorChange?: (color: string) => void;
  onBgColorChange?: (color: string) => void;
  activeFormats?: Set<string>;
  currentFont?: string;
  currentFontSize?: string;
  className?: string;
  currentBgColor?: string;
}

export default function RichTextToolbar({
  onBgColorChange,
  onClose,
  onCommand,
  onFontChange,
  onFontSizeChange,
  onColorChange,
  activeFormats = new Set(),
  currentFont = "Helvetica World",
  currentFontSize = "10.3",
  className = "",
}: RichTextToolbarProps) {
  const [currentBgColor, setCurrentBgColor] = useState("");
  const [fontSize, setFontSize] = useState(currentFontSize);
  const [fontFamily, setFontFamily] = useState(currentFont);

  const fonts = [
    // Standard fonts
    "Helvetica World",
    "Arial",
    "Times New Roman",
    "Georgia",
    "Verdana",
    "Courier New",
    "Comic Sans MS",
    "Inter",
    "Roboto",
    "Open Sans",

    // Signature/handwriting style fonts
    "Brush Script MT",
    "Lucida Handwriting",
    "Bradley Hand",
    "Segoe Script",
    "Monotype Corsiva",
    "Apple Chancery",
    "French Script MT",
    "Edwardian Script ITC",
    "Mistral",
    "Vivaldi",
    "Rage Italic",
    "Freestyle Script",
    "Script MT Bold",
    "Kunstler Script",
    "Blackadder ITC",
    "Pristina",
    "Viner Hand ITC",
    "Segoe Print",
    "MV Boli",
    "Ink Free",

    // Modern calligraphy/handwriting fonts
    "Allura",
    "Alex Brush",
    "Great Vibes",
    "Dancing Script",
    "Pacifico",
    "Lobster",
    "Satisfy",
    "Cookie",
    "Tangerine",
    "Sacramento",
    "Parisienne",
    "La Belle Aurore",
    "Mr Dafoe",
    "Mrs Saint Delafield",
    "Petit Formal Script",
  ];
  const backgroundColors = [
    "#FFFFFF",
    "#F3F4F6",
    "#E5E7EB",
    "#D1D5DB",
    "#9CA3AF",
    "#6B7280",
    "#4B5563",
    "#374151",
    "#FEE2E2",
    "#FECACA",
    "#FCA5A5",
    "#F87171",
    "#FEF3C7",
    "#FDE68A",
    "#FCD34D",
    "#FBBF24",
    "#D1FAE5",
    "#A7F3D0",
    "#6EE7B7",
    "#34D399",
  ];

  const colors = [
    "#FFFFFF",
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#008000",
    "#FF69B4",
    "#8B4513",
    "#2E8B57",
    "#4169E1",
    "#DC143C",
    "#32CD32",
    "#FF1493",
    "#00CED1",
    "#FFD700",
    "#9370DB",
  ];

  const handleCommand = (command: string, value?: string) => {
    onCommand?.(command, value);
  };

  const handleFontChange = (font: string) => {
    setFontFamily(font);
    onFontChange?.(font);
    handleCommand("fontName", font);
  };

  const handleFontSizeChange = (increment: boolean) => {
    const currentSize = Number.parseFloat(fontSize);
    const newSize = increment ? currentSize + 0.1 : currentSize - 0.1;
    const clampedSize = Math.max(6, Math.min(72, newSize));
    const newSizeStr = clampedSize.toFixed(1);
    setFontSize(newSizeStr);
    onFontSizeChange?.(newSizeStr);
    handleCommand("fontSize", newSizeStr);
  };

  const handleColorChange = (color: string) => {
    onColorChange?.(color);
    handleCommand("foreColor", color);
  };

  const handleFontSelection = (font: string) => {
    handleFontChange(font);
  };

  const handleColorSelection = (color: string, e: React.MouseEvent) => {
    e.stopPropagation();
    handleColorChange(color);
  };

  return (
    <div
      className={`flex justify-evenly items-center gap-1 p-2 rounded-lg shadow-sm bg-gray-50 flex-wrap border border-gray-200 keep-selection ${className}`}
    >
      {/* Edit Button */}
      <Button variant="ghost" size="sm" className="flex items-center gap-2">
        <img src={Edit} alt="Edit" className="" />
        <h1 className="text-sm"> Edit</h1>
      </Button>

      <Separator orientation="vertical" className="h-6 bg-gray-400" />

      {/* Background Color Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="light" size="sm" className="h-8 w-8 p-0 cursor-pointer" onClick={()=> onBgColorChange?.(currentBgColor)}>
            <div className="relative">
              <Circle className='w-8 h-8 text-gray-50'  fill={currentBgColor} />
              <div
                className="absolute inset-0 rounded-sm w-3 h-3 m-auto"
                style={{ backgroundColor: currentBgColor }}
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3">
          <div className="grid grid-cols-5 gap-2">
            {backgroundColors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => {
                  setCurrentBgColor(color);
                  onBgColorChange?.(color);
                }}
                title={color}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover> 


      <Separator orientation="vertical" className="h-6 bg-gray-400" />

      {/* Font Family */}
      <Select
        value={fontFamily}
        onValueChange={handleFontSelection}
        onOpenChange={(open) => !open}
      >
        <SelectTrigger className="w-32 h-8 text-xs border border-gray-400 cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem key={font} value={font} className="text-xs">
              <span style={{ fontFamily: font }}>{font}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Font Size Controls */}
      <div className="flex items-center border border-gray-300 rounded cursor-pointer">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-6 p-0"
          onClick={() => handleFontSizeChange(false)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <div className="px-2 text-xs min-w-[2.5rem] text-center border-x">
          {fontSize}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-6 p-0"
          onClick={() => handleFontSizeChange(true)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 bg-gray-400" />

      {/* Text Color */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 cursor-pointer"
          >
            <Type className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3">
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform shadow-sm"
                style={{ backgroundColor: color }}
                onClick={(e) => handleColorSelection(color, e)}
                title={color}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Formatting Buttons */}
      <Button
        variant={activeFormats.has("bold") ? "default" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0 cursor-pointer"
        onClick={() => handleCommand("bold")}
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        variant={activeFormats.has("italic") ? "default" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0 cursor-pointer"
        onClick={() => handleCommand("italic")}
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        variant={activeFormats.has("underline") ? "default" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0 cursor-pointer"
        onClick={() => handleCommand("underline")}
      >
        <Underline className="h-4 w-4" />
      </Button>

      <Button
        variant={activeFormats.has("strikethrough") ? "default" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0 cursor-pointer"
        onClick={() => handleCommand("strikeThrough")}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 bg-gray-400" />

      {/* Alignment */}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 cursor-pointer"
        onClick={() => handleCommand("justifyLeft")}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 cursor-pointer"
        onClick={() => handleCommand("justifyCenter")}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 cursor-pointer"
        onClick={() => handleCommand("justifyRight")}
      >
        <AlignRight className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 cursor-pointer"
        onClick={() => handleCommand("justifyFull")}
      >
        <AlignJustify className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 bg-gray-400" />

      {/* Lists */}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 cursor-pointer"
        onClick={() => handleCommand("insertUnorderedList")}
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 cursor-pointer"
        onClick={() => handleCommand("insertOrderedList")}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 bg-gray-400" />

      {/* More Options */}
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      <button
        onClick={onClose}
        className="p-1 cursor-pointer bg-red-400 rounded-full hover:bg-red-500 text-white transition"
        aria-label="Close toolbar"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}