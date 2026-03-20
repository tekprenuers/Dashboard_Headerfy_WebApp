import React, { useState } from "react";
import { Rnd } from "react-rnd";
import { useDispatch } from "react-redux";
import { updateTextBox, deleteTextBox, TextBox } from "./slice/template.slice";
import { X } from "lucide-react";

interface TextBoxRendererProps {
  templateId: "template_1" | "template_2";
  textBoxes: TextBox[];
  interactive?: boolean;
}

const TextBoxRenderer: React.FC<TextBoxRendererProps> = ({
  templateId,
  textBoxes,
  interactive = true,
}) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (textBoxes.length === 0) return null;

  return (
    <>
      {textBoxes.map((tb) => (
        <Rnd
          key={tb.id}
          size={{ width: tb.width, height: tb.height }}
          position={{ x: tb.x, y: tb.y }}
          style={{ zIndex: tb.zIndex }}
          enableResizing={interactive}
          disableDragging={!interactive}
          onDragStop={(_e, d) =>
            dispatch(updateTextBox({ templateId, id: tb.id, updates: { x: d.x, y: d.y } }))
          }
          onResizeStop={(_e, _dir, ref, _delta, position) =>
            dispatch(
              updateTextBox({
                templateId,
                id: tb.id,
                updates: { width: ref.offsetWidth, height: ref.offsetHeight, ...position },
              })
            )
          }
          bounds="parent"
          onClick={() => interactive && setSelectedId(tb.id)}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <div
              contentEditable={interactive}
              suppressContentEditableWarning
              style={{
                width: "100%",
                height: "100%",
                fontSize: tb.fontSize,
                fontFamily: tb.fontFamily,
                color: tb.color,
                outline: interactive ? "1.5px dashed #60a5fa" : "none",
                padding: "4px 6px",
                cursor: interactive ? "text" : "default",
                overflow: "hidden",
                wordBreak: "break-word",
                boxSizing: "border-box",
              }}
              dangerouslySetInnerHTML={{ __html: tb.content }}
              onBlur={(e) => {
                if (interactive) {
                  dispatch(
                    updateTextBox({
                      templateId,
                      id: tb.id,
                      updates: { content: e.currentTarget.innerHTML },
                    })
                  );
                }
              }}
              onClick={(e) => {
                if (interactive) {
                  e.stopPropagation();
                  setSelectedId(tb.id);
                }
              }}
            />
            {interactive && selectedId === tb.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteTextBox({ templateId, id: tb.id }));
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

export default TextBoxRenderer;
