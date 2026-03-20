import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { useDispatch } from "react-redux";
import { updateImage, deleteImage, TemplateImage } from "./slice/template.slice";
import { X } from "lucide-react";

interface ImageRendererProps {
  templateId: "template_1" | "template_2";
  images: TemplateImage[];
  interactive?: boolean;
}

const ImageRenderer: React.FC<ImageRendererProps> = ({
  templateId,
  images,
  interactive = true,
}) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      {images.map((img) => (
        <Rnd
          key={img.id}
          size={{ width: img.width, height: img.height }}
          position={{ x: img.x, y: img.y }}
          style={{ zIndex: img.zIndex }}
          enableResizing={interactive}
          disableDragging={!interactive}
          onDragStop={(_e, d) =>
            dispatch(updateImage({ templateId, id: img.id, updates: { x: d.x, y: d.y } }))
          }
          onResizeStop={(_e, _dir, ref, _delta, position) =>
            dispatch(
              updateImage({
                templateId,
                id: img.id,
                updates: { width: ref.offsetWidth, height: ref.offsetHeight, ...position },
              })
            )
          }
          bounds="parent"
          onClick={() => interactive && setSelectedId(img.id)}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img
              src={img.src}
              alt="uploaded"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                outline: interactive && selectedId === img.id ? "1.5px dashed #60a5fa" : "none",
                display: "block",
              }}
              onClick={(e) => {
                if (interactive) {
                  e.stopPropagation();
                  setSelectedId(img.id);
                }
              }}
              draggable={false}
            />
            {interactive && selectedId === img.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteImage({ templateId, id: img.id }));
                  setSelectedId(null);
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
    </>
  );
};

export default ImageRenderer;
