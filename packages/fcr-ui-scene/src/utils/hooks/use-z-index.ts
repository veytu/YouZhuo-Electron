import React, { useEffect, useRef } from 'react';
import { ZIndexController } from '../z-index-controller';
export const ZIndexContext = React.createContext(new ZIndexController());

export const useZIndex = (id: string) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const zIndexController = React.useContext(ZIndexContext);
  const zIndex = zIndexController.zIndexMap.get(id);
  const updateZIndex = () => {
    zIndexController.updateZIndex(id);
  };
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('mousedown', updateZIndex);
    }
    return () => {
      ref.current?.removeEventListener('mousedown', updateZIndex);
    };
  }, []);
  useEffect(() => {
    if (!zIndex) {
      zIndexController.updateZIndex(id);
    }
  }, [zIndex, zIndexController]);

  return { zIndex, ref, updateZIndex };
};
