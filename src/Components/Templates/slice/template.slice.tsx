import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TextStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
}

export interface TemplateState {
  id: string;
  selectedTextId: string | null;
  colors: {
    bg: string;
    sidebar: string;
    shape: string;
  };
  textStyles: Record<string, TextStyle>;
  textContents: Record<string, string>;
  isSelected: boolean;
  shapes: Shape[];
  textBoxes: TextBox[];
  images: TemplateImage[];
  isCreated: boolean;
}

export type ShapeType =
  | "square" | "circle" | "triangle"
  | "star" | "heart" | "diamond" | "cloud"
  | "ellipse" | "pentagon" | "hexagon" | "octagon"
  | "line" | "arrow-right" | "arrow-left" | "zigzag";

export interface Shape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  zIndex?: number;
}

export interface TextBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  zIndex: number;
}

export interface TemplateImage {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

interface TemplatesState {
  template_1: TemplateState;
  template_2: TemplateState;
  activeTemplateId: "template_1" | "template_2";
}

// Initial state for each template
const initialTemplateState: Omit<TemplateState, "id"> = {
  selectedTextId: null,
  colors: {
    bg: "#e5e7eb",
    sidebar: "#1e293b",
    shape: "#e5e7eb",
  },
  textStyles: {},
  textContents: {},
  isSelected: false,
  shapes: [],
  textBoxes: [],
  images: [],
  isCreated: false,
};

// Load from localStorage
const loadTemplateState = (templateId: string): Partial<TemplateState> => {
  try {
    const saved = localStorage.getItem(`template_${templateId}_state`);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};
const initialState: TemplatesState = {
  
  template_1: {
    id: "template_1",
    ...initialTemplateState,
    colors: {
      bg: localStorage.getItem("template1BgColor") || "#e5e7eb",
      sidebar: localStorage.getItem("template1SidebarColor") || "#1e293b",
      shape: localStorage.getItem("template1ShapeColor") || "#e5e7eb",
    },
    textStyles: JSON.parse(
      localStorage.getItem("textStyles_template_1") || "{}"
    ),
    ...loadTemplateState("1"),
  },

  template_2: {
    id: "template_2",
    ...initialTemplateState,
    colors: {
      bg: localStorage.getItem("template2BgColor") || "#126180",
      sidebar: localStorage.getItem("template2SidebarColor") || "#FFFDD0",
      shape: localStorage.getItem("template2ShapeColor") || "#e5e7eb",
    },
    textStyles: JSON.parse(
      localStorage.getItem("textStyles_template_2") || "{}"
    ),
    ...loadTemplateState("2"),
  },
  activeTemplateId: "template_1",
};

export const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    setSelectedTextId: (
      state,
      action: PayloadAction<{
        templateId: "template_1" | "template_2";
        textId: string | null;
      }>
    ) => {
      const { templateId, textId } = action.payload;
      state[templateId].selectedTextId = textId;
    },

    setTemplateColors: (
      state,
      action: PayloadAction<{
        templateId: "template_1" | "template_2";
        colors: Partial<TemplateState["colors"]>;
      }>
    ) => {
      const { templateId, colors } = action.payload;
      state[templateId].colors = { ...state[templateId].colors, ...colors };

      // Save to localStorage
      if (colors.bg) localStorage.setItem(`${templateId}BgColor`, colors.bg);
      if (colors.sidebar)
        localStorage.setItem(`${templateId}SidebarColor`, colors.sidebar);
      if (colors.shape)
        localStorage.setItem(`${templateId}ShapeColor`, colors.shape);
    },

    setTextStyles: (
      state,
      action: PayloadAction<{
        templateId: "template_1" | "template_2";
        styles: TemplateState["textStyles"];
      }>
    ) => {
      const { templateId, styles } = action.payload;
      state[templateId].textStyles = styles;
      localStorage.setItem(`textStyles_${templateId}`, JSON.stringify(styles));
    },

    setTextContent: (
      state,
      action: PayloadAction<{
        templateId: "template_1" | "template_2";
        textId: string;
        content: string;
      }>
    ) => {
      const { templateId, textId, content } = action.payload;
      state[templateId].textContents[textId] = content;
    },

    setTemplateSelected: (
      state,
      action: PayloadAction<{
        templateId: "template_1" | "template_2";
        isSelected: boolean;
      }>
    ) => {
      const { templateId, isSelected } = action.payload;
      state[templateId].isSelected = isSelected;
    },

    // Save entire template state
    saveTemplateState: (
      state,
      action: PayloadAction<{ templateId: "template_1" | "template_2" }>
    ) => {
      const { templateId } = action.payload;
      const templateState = state[templateId];
      localStorage.setItem(
        `template_${templateId}_state`,
        JSON.stringify({
          colors: templateState.colors,
          textStyles: templateState.textStyles,
          textContents: templateState.textContents,
        })
      );
    },

    deleteTemplate: (
      state,
      action: PayloadAction<{ templateId: "template_1" | "template_2" }>
    ) => {
      const { templateId } = action.payload;
      state[templateId] = {
        ...initialTemplateState,
        id: templateId,
        isCreated: false,
      };

      // Remove from localStorage
      localStorage.removeItem(`template_${templateId}_state`);
      localStorage.removeItem(`textStyles_${templateId}`);
      localStorage.removeItem(`${templateId}BgColor`);
      localStorage.removeItem(`${templateId}SidebarColor`);
      localStorage.removeItem(`${templateId}ShapeColor`);

      // Reset activeTemplateId if the deleted one was active
      if (state.activeTemplateId === templateId) {
        state.activeTemplateId =
          templateId === "template_1" ? "template_2" : "template_1";
      }
    },

    // In your slice
    addTemplate: (
      state,
      action: PayloadAction<{ templateId: "template_1" | "template_2" }>
    ) => {
      const { templateId } = action.payload;

      state[templateId] = {
        id: templateId,
        colors: {
          bg: templateId === "template_1" ? "#e5e7eb" : "#126180",
          sidebar: templateId === "template_1" ? "#1e293b" : "#FFFDD0",
          shape: "#e5e7eb",
        },
        textStyles: {},
        textContents: {},
        selectedTextId: null,
        isSelected: false,
        shapes: [],
        textBoxes: [],
        images: [],
        isCreated: true,
      };
    },

    addShape: (
      state,
      action: PayloadAction<{
        templateId: "template_1" | "template_2";
        shape: Shape;
      }>
    ) => {
      const { templateId, shape } = action.payload;

      // ✅ Safety check - ensure template exists
      if (!state[templateId]) {
        console.warn(
          `⚠️ Cannot add shape - template ${templateId} does not exist`
        );
        return;
      }

      // ✅ Ensure template has shapes array
      if (!state[templateId].shapes) {
        state[templateId].shapes = [];
      }

      state[templateId].shapes.push(shape);
      console.log(
        `✅ Shape added to ${templateId}, total shapes:`,
        state[templateId].shapes.length
      );
    },

    updateShape: (
      state,
      action: PayloadAction<{
        templateId: "template_1" | "template_2";
        shapeId: string;
        updates: Partial<Shape>;
      }>
    ) => {
      const { templateId, shapeId, updates } = action.payload;
      const shape = state[templateId].shapes.find((s) => s.id === shapeId);
      if (shape) {
        Object.assign(shape, updates);
      }
    },

    deleteShape: (
      state,
      action: PayloadAction<{
        templateId: "template_1" | "template_2";
        shapeId: string;
      }>
    ) => {
      const { templateId, shapeId } = action.payload;
      state[templateId].shapes = state[templateId].shapes.filter(
        (s) => s.id !== shapeId
      );
    },

    setActiveTemplate: (
      state,
      action: PayloadAction<"template_1" | "template_2">
    ) => {
      state.activeTemplateId = action.payload;
    },

    addTextBox: (
      state,
      action: PayloadAction<{
        templateId: "template_1" | "template_2";
        textBox: TextBox;
      }>
    ) => {
      const { templateId, textBox } = action.payload;
      if (!state[templateId]) return;
      if (!state[templateId].textBoxes) state[templateId].textBoxes = [];
      state[templateId].textBoxes.push(textBox);
    },

    updateTextBox: (
      state,
      action: PayloadAction<{
        templateId: "template_1" | "template_2";
        id: string;
        updates: Partial<TextBox>;
      }>
    ) => {
      const { templateId, id, updates } = action.payload;
      const tb = state[templateId].textBoxes.find((t) => t.id === id);
      if (tb) Object.assign(tb, updates);
    },

    deleteTextBox: (
      state,
      action: PayloadAction<{
        templateId: "template_1" | "template_2";
        id: string;
      }>
    ) => {
      const { templateId, id } = action.payload;
      state[templateId].textBoxes = state[templateId].textBoxes.filter(
        (t) => t.id !== id
      );
    },

    addImage: (
      state,
      action: PayloadAction<{
        templateId: "template_1" | "template_2";
        image: TemplateImage;
      }>
    ) => {
      const { templateId, image } = action.payload;
      if (!state[templateId]) return;
      if (!state[templateId].images) state[templateId].images = [];
      state[templateId].images.push(image);
    },

    updateImage: (
      state,
      action: PayloadAction<{
        templateId: "template_1" | "template_2";
        id: string;
        updates: Partial<TemplateImage>;
      }>
    ) => {
      const { templateId, id, updates } = action.payload;
      const img = state[templateId].images.find((i) => i.id === id);
      if (img) Object.assign(img, updates);
    },

    deleteImage: (
      state,
      action: PayloadAction<{
        templateId: "template_1" | "template_2";
        id: string;
      }>
    ) => {
      const { templateId, id } = action.payload;
      state[templateId].images = state[templateId].images.filter(
        (i) => i.id !== id
      );
    },
  },
});

export const {
  setSelectedTextId,
  setTemplateColors,
  setTextStyles,
  setTextContent,
  setTemplateSelected,
  saveTemplateState,
  deleteTemplate,
  addTemplate,
  addShape,
  updateShape,
  deleteShape,
  setActiveTemplate,
  addTextBox,
  updateTextBox,
  deleteTextBox,
  addImage,
  updateImage,
  deleteImage,
} = templateSlice.actions;

export default templateSlice.reducer;
