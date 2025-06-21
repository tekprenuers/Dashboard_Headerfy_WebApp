import React, { createContext, useContext, useState, ReactNode } from "react";

interface ZoomContextType {
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
  progress: number;
  setProgress: (value: number) => void;
}

const ZoomContext = createContext<ZoomContextType | undefined>(undefined);

export const ZoomProvider = ({ children }: { children: ReactNode }) => {
  const [zoomLevel, setZoomLevel] = useState(1); // default 100%
  const [progress, setProgress] = useState(20); // default 20%

  return (
    <ZoomContext.Provider
      value={{ zoomLevel, setZoomLevel, progress, setProgress }}
    >
      {children}
    </ZoomContext.Provider>
  );
};

export const useZoom = () => {
  const context = useContext(ZoomContext);
  if (!context) {
    throw new Error("useZoom must be used within a ZoomProvider");
  }
  return context;
};
