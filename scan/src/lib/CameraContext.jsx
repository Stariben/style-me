import { createContext, useContext, useState } from 'react';

const CameraContext = createContext(null);

export function CameraProvider({ children }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  return (
    <CameraContext.Provider value={{ isCameraOpen, setIsCameraOpen }}>
      {children}
    </CameraContext.Provider>
  );
}

export function useCamera() {
  return useContext(CameraContext);
}