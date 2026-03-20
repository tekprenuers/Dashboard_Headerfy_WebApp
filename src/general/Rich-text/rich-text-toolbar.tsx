import { useEffect, useState } from "react";
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
  X,
  Circle,
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

const fonts = [
  "Arial", "Helvetica", "Times New Roman", "Georgia", "Verdana",
  "Courier New", "Comic Sans MS", "Inter", "Roboto", "Open Sans",
  "Brush Script MT", "Lucida Handwriting", "Bradley Hand", "Segoe Script",
  "Monotype Corsiva", "Dancing Script", "Pacifico", "Lobster", "Satisfy",
  "Cookie", "Tangerine", "Sacramento", "Great Vibes",
];

const backgroundColors = [
  "#FFFFFF", "#F3F4F6", "#E5E7EB", "#D1D5DB", "#9CA3AF",
  "#6B7280", "#4B5563", "#374151", "#FEE2E2", "#FECACA",
  "#FCA5A5", "#F87171", "#FEF3C7", "#FDE68A", "#FCD34D",
  "#FBBF24", "#D1FAE5", "#A7F3D0", "#6EE7B7", "#34D399",
];

const textColors = [
  "#000000", "#FFFFFF", "#FF0000", "#00CC00", "#0000FF",
  "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
  "#008000", "#FF69B4", "#8B4513", "#2E8B57", "#4169E1",
  "#DC143C", "#32CD32", "#FF1493", "#00CED1", "#FFD700",
];

export default function RichTextToolbar({
  onBgColorChange,
  onClose,
  onCommand,
  onFontChange,
  onFontSizeChange,
  onColorChange,
  activeFormats = new Set(),
  currentFont = "Arial",
  currentFontSize = "14",
  className = "",
  currentBgColor = "#FFFFFF",
}: RichTextToolbarProps) {
  const [fontSize, setFontSize] = useState(currentFontSize);
  const [fontFamily, setFontFamily] = useState(currentFont);
  const [bgColor, setBgColor] = useState(currentBgColor);

  // Sync toolbar state whenever the selected element changes
  useEffect(() => {
    setFontSize(currentFontSize);
  }, [currentFontSize]);

  useEffect(() => {
    setFontFamily(currentFont);
  }, [currentFont]);

  useEffect(() => {
    setBgColor(currentBgColor);
  }, [currentBgColor]);

  const cmd = (command: string, value?: string) => {
    onCommand?.(command, value);
  };

  const handleFontChange = (font: string) => {
    setFontFamily(font);
    onFontChange?.(font);
    // onFontChange already calls handleCommand("fontName", font) in the parent
  };

  const handleFontSizeChange = (increment: boolean) => {
    const current = Math.round(parseFloat(fontSize)) || 14;
    const next = Math.max(6, Math.min(96, increment ? current + 1 : current - 1));
    setFontSize(String(next));
    onFontSizeChange?.(String(next));
    // onFontSizeChange already triggers parent handleCommand("fontSize", next)
  };

  const handleColorChange = (color: string) => {
    onColorChange?.(color);
  };

  return (
    <div
      className={`flex justify-evenly items-center gap-1 p-2 rounded-lg shadow-sm bg-gray-50 flex-wrap border border-gray-200 ${className}`}
    >
      {/* Edit label */}
      <Button variant="ghost" size="sm" className="flex items-center gap-2">
        <img src={Edit} alt="Edit" />
        <span className="text-sm">Edit</span>
      </Button>

      <Separator orientation="vertical" className="h-6 bg-gray-400" />

      {/* Background / Area Color Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="light" size="sm" className="h-8 w-8 p-0 cursor-pointer">
            <div className="relative">
              <Circle className="w-8 h-8 text-gray-200" fill={bgColor} />
              <div
                className="absolute inset-0 rounded-sm w-3 h-3 m-auto"
                style={{ backgroundColor: bgColor }}
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3">
          <p className="text-xs text-gray-500 mb-2">Background / Area color</p>
          <div className="grid grid-cols-5 gap-2">
            {backgroundColors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => {
                  setBgColor(color);
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
      <Select value={fontFamily} onValueChange={handleFontChange}>
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
      <div className="flex items-center border border-gray-300 rounded">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-7 p-0 cursor-pointer"
          onMouseDown={(e) => { e.preventDefault(); handleFontSizeChange(false); }}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <div className="px-2 text-xs min-w-[2.5rem] text-center border-x select-none">
          {fontSize}px
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-7 p-0 cursor-pointer"
          onMouseDown={(e) => { e.preventDefault(); handleFontSizeChange(true); }}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 bg-gray-400" />

      {/* Text Color */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
            <Type className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-3">
          <p className="text-xs text-gray-500 mb-2">Text color</p>
          <div className="grid grid-cols-5 gap-2">
            {textColors.map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform shadow-sm"
                style={{ backgroundColor: color }}
                onMouseDown={(e) => { e.preventDefault(); handleColorChange(color); }}
                title={color}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Separator orientation="vertical" className="h-6 bg-gray-400" />

      {/* Bold */}
      <Button
        variant={activeFormats.has("bold") ? "default" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0 cursor-pointer font-bold"
        onMouseDown={(e) => { e.preventDefault(); cmd("bold"); }}
      >
        <Bold className="h-4 w-4" />
      </Button>

      {/* Italic */}
      <Button
        variant={activeFormats.has("italic") ? "default" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0 cursor-pointer"
        onMouseDown={(e) => { e.preventDefault(); cmd("italic"); }}
      >
        <Italic className="h-4 w-4" />
      </Button>

      {/* Underline */}
      <Button
        variant={activeFormats.has("underline") ? "default" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0 cursor-pointer"
        onMouseDown={(e) => { e.preventDefault(); cmd("underline"); }}
      >
        <Underline className="h-4 w-4" />
      </Button>

      {/* Strikethrough */}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 cursor-pointer"
        onMouseDown={(e) => { e.preventDefault(); cmd("strikeThrough"); }}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 bg-gray-400" />

      {/* Alignment */}
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer"
        onMouseDown={(e) => { e.preventDefault(); cmd("justifyLeft"); }}>
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer"
        onMouseDown={(e) => { e.preventDefault(); cmd("justifyCenter"); }}>
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer"
        onMouseDown={(e) => { e.preventDefault(); cmd("justifyRight"); }}>
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer"
        onMouseDown={(e) => { e.preventDefault(); cmd("justifyFull"); }}>
        <AlignJustify className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 bg-gray-400" />

      {/* Lists */}
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer"
        onMouseDown={(e) => { e.preventDefault(); cmd("insertUnorderedList"); }}>
        <List className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer"
        onMouseDown={(e) => { e.preventDefault(); cmd("insertOrderedList"); }}>
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 bg-gray-400" />

      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {/* Close */}
      <button
        onMouseDown={(e) => { e.preventDefault(); onClose?.(); }}
        className="p-1 cursor-pointer bg-red-400 rounded-full hover:bg-red-500 text-white transition"
        aria-label="Close toolbar"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
