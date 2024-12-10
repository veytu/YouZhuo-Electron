import React, { FC, useCallback } from "react";
import RcSlider, { createSliderWithTooltip } from "rc-slider";
import "./index.css";
import "rc-slider/assets/index.css";

const RcSliderWithTooltip = createSliderWithTooltip(RcSlider);

type VerticalSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
};

export const VerticalSlider: FC<VerticalSliderProps> = ({
  min = 0,
  max = 100,
  defaultValue = 0,
  step = 1,
  value,
  onChange,
}) => {
  return (
    <div className="fcr-vertical-slider">
      {
        //@ts-ignore
        <RcSlider
          vertical
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
        />
      }
    </div>
  );
};

type HorizontalSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
};
export const HorizontalSlider: FC<HorizontalSliderProps> = ({
  min = 0,
  max = 100,
  defaultValue = 0,
  step = 1,
  value,
  onChange,
}) => {
  const tipFormatter = useCallback((value: number) => {
    return `${value}`;
  }, []);
  return (
    <div className="fcr-horizontal-slider" style={{ paddingRight: 24 }}>
      <RcSliderWithTooltip
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        tipProps={{ placement: "top" }}
        tipFormatter={tipFormatter}
      />
    </div>
  );
};
