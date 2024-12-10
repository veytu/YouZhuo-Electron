import classNames from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';
import { SvgIconEnum, SvgImg } from '../svg-img';
import './index.css';

type TabsProps = {
  items: { label: string; key: string }[];
  activeKey: string;
  onChange: (key: string) => void;
  variant?: 'simple';
};

export const Tabs: FC<TabsProps> = ({ items = [], activeKey, onChange = () => {}, variant }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const el = document.querySelector(`.fcr-tabs__nav-item-${activeKey}`);
    if (el) {
      const { offsetLeft } = el as HTMLElement;
      setIndicatorStyle({ left: offsetLeft, width: el.clientWidth });
    }
  }, [activeKey]);
  const cls = classNames('fcr-tabs', {
    'fcr-simple-tabs': variant === 'simple',
  });

  return (
    <div className={cls}>
      <div className="fcr-tabs__nav-list">
        {items.map(({ label, key }) => {
          const cls = classNames(`fcr-tabs__nav-item fcr-tabs__nav-item-${key}`, {
            'fcr-tabs__nav-item--active': key === activeKey,
          });

          const handleClick = () => {
            onChange(key);
          };

          return (
            <div key={key} className={cls} onClick={handleClick}>
              {label}
            </div>
          );
        })}
        <div className="fcr-tabs__nav-indicator" style={indicatorStyle} />
      </div>
    </div>
  );
};

export const FashionTabs: FC<Omit<TabsProps, 'variant'>> = ({
  items = [],
  activeKey,
  onChange = () => {},
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const el = rootRef.current.querySelector(`.fcr-tabs__nav-item-${activeKey}`);

    if (el) {
      const { offsetLeft } = el as HTMLElement;
      setIndicatorStyle({ left: offsetLeft + el.clientWidth - 40, width: el.clientWidth, top: -3 });
    }
  }, [activeKey, items]);

  return (
    <div className="fcr-tabs fcr-fashion-tabs" ref={rootRef}>
      <div className="fcr-tabs__nav-list">
        {items.map(({ label, key }) => {
          const cls = classNames(`fcr-tabs__nav-item fcr-tabs__nav-item-${key}`, {
            'fcr-tabs__nav-item--active': key === activeKey,
          });

          const handleClick = () => {
            onChange(key);
          };

          return (
            <div key={key} className={cls} onClick={handleClick}>
              {label}
            </div>
          );
        })}
        <div className="fcr-fashion-tabs__nav-indicator" style={indicatorStyle}>
          <SvgImg type={SvgIconEnum.FCR_UNDERLINE} size={46} />
        </div>
      </div>
    </div>
  );
};
