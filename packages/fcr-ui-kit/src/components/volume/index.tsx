import React, { FC } from 'react';
import classNames from 'classnames';
import range from 'lodash/range';
import './index.css';

type VolumeIndicatorProps = {
  value: number;
  barCount?: number;
};

export const VolumeIndicator: FC<VolumeIndicatorProps> = ({ value, barCount = 8 }) => {
  const power = value * barCount;

  return (
    <div className="fcr-volume-indicator">
      {range(0, barCount).map((i) => {
        const pointCls = classNames('fcr-volume-indicator__point', {
          'fcr-volume-indicator__point--active': power > 0 && i <= power,
        });
        return <div key={i.toString()} className={pointCls} />;
      })}
    </div>
  );
};
