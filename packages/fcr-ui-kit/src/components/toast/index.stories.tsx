import { Meta } from '@storybook/react';
import React, { useEffect } from 'react';
import { Toast, ToastApi, ToastSize } from '.';
import { Button } from '../button';
import { SvgIconEnum } from '../svg-img';
import { v4 as uuidv4 } from 'uuid';

export default {
  title: 'Components/Toast',
};
export const Docs = ({
  closable,
  icon,
  action,
  text,
  size,
}: {
  closable;
  icon;
  action;
  text;
  size: ToastSize;
}) => {
  useEffect(() => {
    document.body.className = `${document.body.className} fcr-classroom-viewport`;
  }, []);
  return (
    <div
      className="fcr-classroom-viewport"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        height: '100%',
      }}>
      <div>
        <Button
          onClick={() => {
            ToastApi.open({
              id: uuidv4(),
              toastProps: {
                type: 'info',
                content: `test ${new Date().getTime()}`,
              },
            });
          }}>
          show toast
        </Button>
        <Button
          onClick={() => {
            ToastApi.open({
              id: uuidv4(),
              persist: true,
              duration: 15000,
              toastProps: {
                type: 'warn',
                content: `test ${new Date().getTime()}`,
                closable: true,
              },
            });
          }}>
          show presist toast
        </Button>
      </div>

      <Toast
        size={size}
        icon={icon ? SvgIconEnum.FCR_HOST : undefined}
        action={
          action
            ? {
                onClick: () => {},
                text: 'Learn more',
              }
            : undefined
        }
        type="error"
        closable={closable}
        content={text}></Toast>
      <Toast
        size={size}
        action={
          action
            ? {
                onClick: () => {},
                text: 'Learn more',
              }
            : undefined
        }
        icon={icon ? SvgIconEnum.FCR_HOST : undefined}
        closable={closable}
        type="info"
        content={text}></Toast>
      <Toast
        size={size}
        action={
          action
            ? {
                onClick: () => {},
                text: 'Learn more',
              }
            : undefined
        }
        icon={icon ? SvgIconEnum.FCR_HOST : undefined}
        closable={closable}
        type="normal"
        content={text}></Toast>
      <Toast
        size={size}
        action={
          action
            ? {
                onClick: () => {},
                text: 'Learn more',
              }
            : undefined
        }
        icon={icon ? SvgIconEnum.FCR_QUESTION : undefined}
        closable={closable}
        type="warn"
        content={text}></Toast>
    </div>
  );
};
Docs.argTypes = {
  size: {
    type: 'string',
    defaultValue: 'small',
  },
  text: {
    type: 'string',
    defaultValue: 'You don’t have access to this file',
  },
  closable: {
    type: 'boolean',
    defaultValue: false,
  },
  icon: {
    type: 'boolean',
    defaultValue: false,
  },
  action: {
    type: 'boolean',
    defaultValue: false,
  },
};
