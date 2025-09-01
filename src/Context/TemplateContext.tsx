/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

// Define TypeScript types for the context
interface TemplateContextType {
  isTemplateOpen: boolean;
  setIsTemplateOpen: Dispatch<SetStateAction<boolean>>;
  selectedTemplate: string;
  setSelectedTemplate: Dispatch<SetStateAction<string>>;
}

// Provide default values for the context
const TemplateContext = createContext<TemplateContextType>({
  isTemplateOpen: false,
  setIsTemplateOpen: () => {}, // Dummy function to avoid errors
  selectedTemplate: "",
  setSelectedTemplate: () => {}, // Dummy function
});

// Provider Component
export const TemplateProvider = ({ children }: { children: ReactNode }) => {
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  return (
    <TemplateContext.Provider
      value={{
        isTemplateOpen,
        setIsTemplateOpen,
        selectedTemplate,
        setSelectedTemplate,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

// Hook to use in components
export const useTemplate = () => useContext(TemplateContext);
