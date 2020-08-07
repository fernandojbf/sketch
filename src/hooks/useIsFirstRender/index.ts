import { useEffect, useRef } from 'react';

const useIsFirstRender = () => {
  // Since I know that nextjs always triggers a re-render I can use useRef.
  // Using useRef instead of useState makes storing isFirstRender value to not trigger another re-render;
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    isFirstRenderRef.current = false;
  }, []);

  return isFirstRenderRef.current;
};

export default useIsFirstRender;
