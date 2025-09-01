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
}

interface TemplatesState {
  template_1: TemplateState;
  template_2: TemplateState;
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
  },
});

export const {
  setSelectedTextId,
  setTemplateColors,
  setTextStyles,
  setTextContent,
  setTemplateSelected,
  saveTemplateState,
} = templateSlice.actions;

export default templateSlice.reducer;
