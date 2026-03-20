import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShape, ShapeType } from "../Templates/slice/template.slice";
import { RootState } from "../../redux/store";

interface ShapeItem {
  name: string;
  type: ShapeType;
  preview: React.ReactNode;
}

const shapeItems: ShapeItem[] = [
  {
    name: "Square",
    type: "square",
    preview: (
      <svg viewBox="0 0 100 100" width="36" height="36">
        <rect x="5" y="5" width="90" height="90" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Circle",
    type: "circle",
    preview: (
      <svg viewBox="0 0 100 100" width="36" height="36">
        <circle cx="50" cy="50" r="45" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Triangle",
    type: "triangle",
    preview: (
      <svg viewBox="0 0 100 100" width="36" height="36">
        <polygon points="50,5 95,95 5,95" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Star",
    type: "star",
    preview: (
      <svg viewBox="0 0 100 100" width="36" height="36">
        <polygon
          points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Heart",
    type: "heart",
    preview: (
      <svg viewBox="0 0 100 100" width="36" height="36">
        <path
          d="M10,35 A22,22,0,0,1,50,35 A22,22,0,0,1,90,35 Q90,60,50,90 Q10,60,10,35 Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Diamond",
    type: "diamond",
    preview: (
      <svg viewBox="0 0 100 100" width="36" height="36">
        <polygon points="50,5 95,50 50,95 5,50" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Cloud",
    type: "cloud",
    preview: (
      <svg viewBox="0 0 100 70" width="36" height="26">
        <path
          d="M20,60 A18,18,0,0,1,20,25 A18,18,0,0,1,45,10 A20,20,0,0,1,82,20 A18,18,0,0,1,82,55 Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Ellipse",
    type: "ellipse",
    preview: (
      <svg viewBox="0 0 100 60" width="36" height="22">
        <ellipse cx="50" cy="30" rx="48" ry="27" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Pentagon",
    type: "pentagon",
    preview: (
      <svg viewBox="0 0 100 100" width="36" height="36">
        <polygon points="50,5 95,36 76,90 24,90 5,36" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Hexagon",
    type: "hexagon",
    preview: (
      <svg viewBox="0 0 100 100" width="36" height="36">
        <polygon points="50,5 93,28 93,72 50,95 7,72 7,28" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Octagon",
    type: "octagon",
    preview: (
      <svg viewBox="0 0 100 100" width="36" height="36">
        <polygon
          points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

interface LineItem {
  name: string;
  type: ShapeType;
  preview: React.ReactNode;
}

const lineItems: LineItem[] = [
  {
    name: "Line",
    type: "line",
    preview: (
      <svg viewBox="0 0 80 20" width="56" height="14">
        <line x1="2" y1="10" x2="78" y2="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Arrow →",
    type: "arrow-right",
    preview: (
      <svg viewBox="0 0 80 20" width="56" height="14">
        <line x1="2" y1="10" x2="64" y2="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <polygon points="64,4 78,10 64,16" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Arrow ←",
    type: "arrow-left",
    preview: (
      <svg viewBox="0 0 80 20" width="56" height="14">
        <line x1="16" y1="10" x2="78" y2="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <polygon points="16,4 2,10 16,16" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Zigzag",
    type: "zigzag",
    preview: (
      <svg viewBox="0 0 80 24" width="56" height="17">
        <polyline
          points="2,18 16,6 30,18 44,6 58,18 72,6"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

type Category = "shapes" | "lines";

const Elements: React.FC = () => {
  const dispatch = useDispatch();
  const templates = useSelector((state: RootState) => state.templates);
  const [activeCategory, setActiveCategory] = useState<Category>("shapes");

  const handleAddShape = (type: ShapeType) => {
    const targetId = templates.activeTemplateId;
    if (!targetId || !templates[targetId]?.isCreated) {
      alert("Please select a template first.");
      return;
    }

    dispatch(
      addShape({
        templateId: targetId,
        shape: {
          id: crypto.randomUUID(),
          type,
          x: 60,
          y: 60,
          width: 80,
          height: 80,
          color: "#3b82f6",
          zIndex: Date.now(),
        },
      })
    );
  };

  return (
    <div className="text-white">
      {/* Category Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveCategory("shapes")}
          className={`flex-1 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer ${
            activeCategory === "shapes"
              ? "bg-[#FF5733] text-white"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          Shapes
        </button>
        <button
          onClick={() => setActiveCategory("lines")}
          className={`flex-1 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer ${
            activeCategory === "lines"
              ? "bg-[#FF5733] text-white"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          Lines
        </button>
      </div>

      {/* Shapes Grid */}
      {activeCategory === "shapes" && (
        <div className="grid grid-cols-3 gap-3">
          {shapeItems.map((item) => (
            <button
              key={item.type}
              onClick={() => handleAddShape(item.type)}
              className="flex flex-col items-center gap-1 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer group"
              title={item.name}
            >
              <span className="text-white group-hover:text-blue-300 transition-colors">
                {item.preview}
              </span>
              <span className="text-[10px] text-white/70">{item.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Lines Grid */}
      {activeCategory === "lines" && (
        <div className="flex flex-col gap-3">
          {lineItems.map((item) => (
            <button
              key={item.type}
              onClick={() => handleAddShape(item.type)}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer group"
              title={item.name}
            >
              <span className="text-white group-hover:text-blue-300 transition-colors">
                {item.preview}
              </span>
              <span className="text-sm text-white/70">{item.name}</span>
            </button>
          ))}
        </div>
      )}

      <p className="text-white/40 text-[11px] text-center mt-4">
        Click any shape to add it to your active template
      </p>
    </div>
  );
};

export default Elements;
