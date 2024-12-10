import React, { FC, MouseEvent, CSSProperties } from "react";
import classnames from "classnames";

import { getPath, getViewBox, PathOptions } from "./svg-dict";
import { SvgIconEnum } from "./type";
import { themeVal } from "../../utils/tailwindcss";

export type SvgImgProps = {
  type: SvgIconEnum;
  className?: string;
  style?: CSSProperties;
  colors?: Partial<PathOptions>;
  size?: number | string;
  onClick?: (e: MouseEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;
};

export const SvgImg: FC<SvgImgProps> = ({
  type,
  size = 24,
  onClick,
  className,
  style,
  colors,
  onMouseDown,
  onMouseUp,
}) => {
  const cls = classnames({
    [`${className}`]: !!className,
  });

  const iconPrimary = themeVal("colors")["icon-1"];
  const iconSecondary = themeVal("colors")["icon-2"];

  const viewBox = getViewBox(type);
  const path = getPath(type, {
    ...colors,
    iconPrimary: colors?.iconPrimary ?? iconPrimary ?? "currentColor",
    iconSecondary: colors?.iconSecondary ?? iconSecondary ?? "currentColor",
  });
  return (
    <svg
      className={cls}
      width={size}
      height={size}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      onClick={onClick}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      style={style}
      data-label={type}
    >
      {path}
    </svg>
  );
};

export { SvgIconEnum } from "./type";
