import { CSSProperties, useEffect, useRef, useState } from 'react';

/**
 * 最小化
 * Minimize
 * @returns
 */
export const useMinimize = ({
  minimize,
  afterChange = () => {},
  beforeChange = () => {},
}: {
  minimize: boolean;
  beforeChange?: (minimize: boolean) => void;

  afterChange?: (minimize: boolean) => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<CSSProperties>({
    transform: `translate3d(0px, 0px, 0) scale(1)`,
  });

  useEffect(() => {
    let timer = 0;
    beforeChange?.(minimize);

    if (minimize) {
      const targetEleBounds = document
        .querySelector('.fcr-status-bar-widget-slot')
        ?.getBoundingClientRect();
      const selfEleBounds = ref.current?.getBoundingClientRect();

      if (targetEleBounds && selfEleBounds) {
        const x = targetEleBounds.left - selfEleBounds.left - selfEleBounds.width / 2;
        const y = targetEleBounds.top - selfEleBounds.top - selfEleBounds.height / 2;
        setTimeout(() => {
          setStyle({
            transform: `translate3d(${x}px, ${y}px, 0) scale(0)`,
            transition: 'all 0.5s',
          });

          timer = window.setTimeout(() => {
            afterChange?.(minimize);
            setStyle({
              transform: `translate3d(${x}px, ${y}px, 0) scale(0)`,
            });
          }, 500);
        });
      }
    } else {
      setTimeout(() => {
        setStyle({
          transform: `translate3d(0px, 0px, 0) scale(1)`,
          transition: 'all 0.5s',
        });

        setTimeout(() => {
          afterChange?.(minimize);
          setStyle({
            transform: `translate3d(0px, 0px, 0) scale(1)`,
          });
        }, 500);
      });
    }
    return () => {
      window.clearTimeout(timer);
    };
  }, [minimize]);

  return {
    ref,
    style,
  };
};
