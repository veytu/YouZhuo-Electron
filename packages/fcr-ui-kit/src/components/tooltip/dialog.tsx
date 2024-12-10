import 'rc-tooltip/assets/bootstrap_white.css';
import { CSSProperties, FC } from 'react';
import { SvgIconEnum, SvgImg } from '../svg-img';
import './index.css';
import './arrow.css';
import { ToolTip, ToolTipProps } from '.';
import classNames from 'classnames';
import { themeVal } from '../../utils/tailwindcss';

interface DialogToolTipProps extends ToolTipProps {
  /**
   * 点击关闭按钮的回调
   */
  /** @en
   * Size of the input box:
   * medium
   * large
   */
  onClose?: () => void;
  closeable?: boolean;
}
const DialogToolTipClosableOverlayWrap: FC<
  Pick<DialogToolTipProps, 'content' | 'onClose' | 'closeable'>
> = (props) => {
  const { content, onClose, closeable } = props;

  const colors = themeVal('colors');

  return (
    <div className={classNames('fcr-dialog-tooltip-overlay-content')}>
      {closeable && (
        <div className={classNames('fcr-dialog-tooltip-overlay-close')} onClick={onClose}>
          <SvgImg
            type={SvgIconEnum.FCR_CLOSE}
            size={10}
            colors={{ iconPrimary: colors['text-1'] }}></SvgImg>
        </div>
      )}

      <div className={classNames('fcr-dialog-tooltip-overlay-content-inner')}>{content}</div>
    </div>
  );
};
export const DialogToolTip: FC<DialogToolTipProps> = (props) => {
  const { content, onClose, closeable = true, ...others } = props;

  const colors = themeVal('colors');
  const borderRadius = themeVal('borderRadius');
  const defaultDialogOverlayInnerStyle: CSSProperties = {
    padding: '0',
    background: `${colors['block-2']}`,
    border: `2px solid ${colors['line-1']}`,
    color: colors['text-1'],
    borderRadius: `${borderRadius[12]}`,
  };
  return (
    <ToolTip
      arrowContent={
        <SvgImg
          type={SvgIconEnum.FCR_TOOLTIP_ARROW_2}
          colors={{
            iconPrimary: colors['block-2'],
            iconSecondary: colors['line-1'],
          }}
          size={20}></SvgImg>
      }
      content={
        <DialogToolTipClosableOverlayWrap
          onClose={onClose}
          content={content}
          closeable={closeable}></DialogToolTipClosableOverlayWrap>
      }
      overlayInnerStyle={{
        ...defaultDialogOverlayInnerStyle,
        ...props.overlayInnerStyle,
      }}
      {...others}
      overlayClassName={`fcr-dialog-tooltip fcr-tooltip-border-width-2 ${
        others.overlayClassName || ''
      }`}></ToolTip>
  );
};
