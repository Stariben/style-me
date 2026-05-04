import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const TAB_ROOTS = ['/', '/account', '/history'];

const NavigationContext = createContext({ canGoBack: false });

export function NavigationProvider({ children }) {
  const location = useLocation();
  const navType = useNavigationType();
  const [depth, setDepth] = useState(0);
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    const isTabRoot = TAB_ROOTS.includes(location.pathname);

    if (navType === 'PUSH') {
      if (isTabRoot) {
        // Switching to a tab root always resets depth
        setDepth(0);
      } else {
        setDepth((d) => d + 1);
      }
    } else if (navType === 'POP') {
      setDepth((d) => Math.max(0, d - 1));
    } else if (navType === 'REPLACE') {
      if (isTabRoot) setDepth(0);
    }

    prevPathname.current = location.pathname;
  }, [location.key]);

  return (
    <NavigationContext.Provider value={{ canGoBack: depth > 0 }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}