import React, { FC } from 'react';
import './index.css';
import { getNameColor, splitName } from './helper';

export type AvatarProps = {
  size: number;
  textSize: number;
  nickName: string;
};

export const Avatar: FC<AvatarProps> = ({ size, textSize, nickName }) => {
  const color = getNameColor(nickName);
  const [first, last] = splitName(nickName);
  return (
    <div
      className="fcr-avatar"
      style={{ width: size, height: size, background: color, fontSize: textSize }}>
      <span>{`${first}${last}`}</span>
    </div>
  );
};
