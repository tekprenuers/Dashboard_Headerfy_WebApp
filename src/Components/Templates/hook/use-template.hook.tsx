/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  setSelectedTextId,
  setTemplateColors,
  setTextStyles,
  setTextContent,
  setTemplateSelected,
  saveTemplateState,
  TextStyle,
} from "../slice/template.slice";

export const UseTemplateSlice = () => {
  const dispatch = useDispatch();
  const templates = useSelector((state: RootState) => state.templates);

  const selectText = useCallback(
    (templateId: "template_1" | "template_2", textId: string | null) => {
      dispatch(setSelectedTextId({ templateId, textId }));
    },
    [dispatch]
  );

  const updateColors = useCallback(
    (templateId: "template_1" | "template_2", colors: any) => {
      dispatch(setTemplateColors({ templateId, colors }));
    },
    [dispatch]
  );

  const updateTextStyles = useCallback(
    (
      templateId: "template_1" | "template_2",
      styles: Record<string, TextStyle>
    ) => {
      dispatch(setTextStyles({ templateId, styles }));
    },
    [dispatch]
  );

  const updateTextContent = useCallback(
    (
      templateId: "template_1" | "template_2",
      textId: string,
      content: string
    ) => {
      dispatch(setTextContent({ templateId, textId, content }));
    },
    [dispatch]
  );

  const setSelected = useCallback(
    (templateId: "template_1" | "template_2", isSelected: boolean) => {
      dispatch(setTemplateSelected({ templateId, isSelected }));
    },
    [dispatch]
  );

  const saveState = useCallback(
    (templateId: "template_1" | "template_2") => {
      dispatch(saveTemplateState({ templateId }));
    },
    [dispatch]
  );

  return {
    templates,
    selectText,
    updateColors,
    updateTextStyles,
    updateTextContent,
    setSelected,
    saveState,
  };
};
