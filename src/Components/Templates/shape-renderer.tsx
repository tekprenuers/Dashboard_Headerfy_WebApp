import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { useDispatch } from "react-redux";
import { updateShape, deleteShape, Shape } from "./slice/template.slice";
import { X } from "lucide-react";

interface ShapeRendererProps {
  shapes: Shape[];
  templateId: "template_1" | "template_2";
  interactive?: boolean;
  isVisible?: boolean;
}

const ShapeSVG: React.FC<{ shape: Shape }> = ({ shape }) => {
  const fill = shape.color || "#3b82f6";
  const stroke = "none";

  switch (shape.type) {
    case "square":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="0" y="0" width="100" height="100" fill={fill} stroke={stroke} />
        </svg>
      );
    case "circle":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill={fill} />
        </svg>
      );
    case "triangle":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,5 95,95 5,95" fill={fill} />
        </svg>
      );
    case "star":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <polygon
            points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
            fill={fill}
          />
        </svg>
      );
    case "heart":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <path
            d="M10,35 A22,22,0,0,1,50,35 A22,22,0,0,1,90,35 Q90,60,50,90 Q10,60,10,35 Z"
            fill={fill}
          />
        </svg>
      );
    case "diamond":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,5 95,50 50,95 5,50" fill={fill} />
        </svg>
      );
    case "cloud":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 70">
          <path
            d="M20,60 A18,18,0,0,1,20,25 A18,18,0,0,1,45,10 A20,20,0,0,1,82,20 A18,18,0,0,1,82,55 Z"
            fill={fill}
          />
        </svg>
      );
    case "ellipse":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 60" preserveAspectRatio="none">
          <ellipse cx="50" cy="30" rx="48" ry="27" fill={fill} />
        </svg>
      );
    case "pentagon":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <polygon points="50,5 95,36 76,90 24,90 5,36" fill={fill} />
        </svg>
      );
    case "hexagon":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <polygon points="50,5 93,28 93,72 50,95 7,72 7,28" fill={fill} />
        </svg>
      );
    case "octagon":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <polygon
            points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
            fill={fill}
          />
        </svg>
      );
    case "line":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
          <line x1="0" y1="10" x2="100" y2="10" stroke={fill} strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
          <line x1="0" y1="15" x2="78" y2="15" stroke={fill} strokeWidth="6" strokeLinecap="round" />
          <polygon points="75,5 100,15 75,25" fill={fill} />
        </svg>
      );
    case "arrow-left":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
          <line x1="22" y1="15" x2="100" y2="15" stroke={fill} strokeWidth="6" strokeLinecap="round" />
          <polygon points="25,5 0,15 25,25" fill={fill} />
        </svg>
      );
    case "zigzag":
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
          <polyline
            points="0,30 17,10 34,30 51,10 68,30 85,10 100,30"
            stroke={fill}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="0" y="0" width="100" height="100" fill={fill} />
        </svg>
      );
  }
};

const ShapeRenderer: React.FC<ShapeRendererProps> = ({
  shapes,
  templateId,
  interactive = true,
  isVisible = true,
}) => {
  const dispatch = useDispatch();
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);

  if (!isVisible) return null;

  return (
    <>
      {shapes.map((shape) => (
        <Rnd
          key={shape.id}
          size={{ width: shape.width, height: shape.height }}
          position={{ x: shape.x, y: shape.y }}
          style={{ zIndex: shape.zIndex ?? 10 }}
          enableResizing={interactive}
          disableDragging={!interactive}
          onDragStart={() => setSelectedShapeId(shape.id)}
          onDragStop={(_e, d) => {
            dispatch(
              updateShape({
                templateId,
                shapeId: shape.id,
                updates: { x: d.x, y: d.y },
              })
            );
          }}
          onResizeStop={(_e, _dir, ref, _delta, position) => {
            dispatch(
              updateShape({
                templateId,
                shapeId: shape.id,
                updates: {
                  width: ref.offsetWidth,
                  height: ref.offsetHeight,
                  ...position,
                },
              })
            );
          }}
          onClick={() => interactive && setSelectedShapeId(shape.id)}
          bounds="parent"
        >
          <div
            style={{ width: "100%", height: "100%", position: "relative" }}
            onClick={(e) => {
              if (interactive) {
                e.stopPropagation();
                setSelectedShapeId(shape.id);
              }
            }}
          >
            <ShapeSVG shape={shape} />
            {/* Delete button when selected */}
            {interactive && selectedShapeId === shape.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteShape({ templateId, shapeId: shape.id }));
                  setSelectedShapeId(null);
                }}
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  background: "#ef4444",
                  border: "none",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 999,
                }}
              >
                <X size={12} color="white" />
              </button>
            )}
          </div>
        </Rnd>
      ))}

      {/* Deselect on canvas click */}
      {interactive && selectedShapeId && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
          onClick={() => setSelectedShapeId(null)}
        />
      )}
    </>
  );
};

export default ShapeRenderer;
