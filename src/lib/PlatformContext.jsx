import { createContext, useContext } from 'react';

const PlatformContext = createContext();

// Change 'ios' or 'android' here for each deployment
const PLATFORM = import.meta.env.VITE_PLATFORM || 'ios';

export function PlatformProvider({ children }) {
  return (
    <PlatformContext.Provider value={{ platform: PLATFORM }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within PlatformProvider');
  }
  return context.platform;
}

export function useIsIOS() {
  return usePlatform() === 'ios';
}

export function useIsAndroid() {
  return usePlatform() === 'android';
}