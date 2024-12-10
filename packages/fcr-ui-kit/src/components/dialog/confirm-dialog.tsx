import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { Button, ButtonProps } from '../button';
import { Checkbox, CheckboxProps } from '../checkbox';
import { BaseDialog, BaseDialogProps } from '.';
import './confirm-dialog.css';
import { toJS } from 'mobx';
export interface ConfirmDialogProps extends BaseDialogProps {
  /**
   * 对话框标题
   */
  /** @en
   * The dialog's title.
   */
  title?: ReactNode;
  /**
   * 对话框底部元素
   */
  /** @en
   * Footer content
   */
  footer?: ReactNode;
  /**
   * 点击对话框确认按钮回调
   */
  /** @en
   * Specify a function that will be called when a user clicks the OK button
   */
  onOk?: () => void;

  /**
   * 是否展示对话框checkbox
   */
  /** @en
   * Wheter the chekcbox is visibleon bottom left of the dialog or not.
   */
  checkable?: boolean;
  /**
   * 对话框checkbox属性
   */
  /** @en
   * The checkbox props.
   */
  checkedProps?: CheckboxProps;
  /**
   * 对话框确认按钮文案
   */
  /** @en
   * Text of the OK button
   */
  okText?: ReactNode;
  /**
   * 对话框取消按钮文案
   */
  /** @en
   * Text of the cancel button
   */
  cancelText?: ReactNode;
  /**
   * 对话框图标
   */
  /** @en
   * Set the icon on the left of the dialog title and content.
   */
  icon?: ReactNode;
  content?: ReactNode;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  okButtonVisible?: boolean;
  cancelButtonVisible?: boolean;
  onCancel?: () => void;
}
export const ConfirmDialog: FC<React.PropsWithChildren<ConfirmDialogProps>> = (props) => {
  const {
    onCancel,
    visible,
    onClose,
    content,
    children,
    title,
    closable,
    footer,
    closeIcon,
    maskClosable,
    onOk,
    checkable,
    checkedProps,
    width,
    icon,
    okText,
    cancelText,
    afterClose,
    okButtonProps,
    cancelButtonProps,
    okButtonVisible = true,
    cancelButtonVisible = true,
    getContainer,
  } = props;
  return (
    <BaseDialog
      wrapClassName="fcr-confirm-dialog-wrap"
      classNames="fcr-confirm-dialog"
      getContainer={getContainer}
      afterClose={afterClose}
      closable={closable}
      closeIcon={closeIcon}
      width={width || 415}
      maskClosable={maskClosable}
      visible={visible}
      onClose={onClose}>
      <div className="fcr-confirm-dialog-inner-wrap">
        {icon && <div className="fcr-confirm-dialog-inner-icon">{toJS(icon)}</div>}
        <div></div>
        <div>
          <div className={classNames('fcr-confirm-dialog-title')}>{title}</div>
          <div className={classNames('fcr-confirm-dialog-inner')}>{content || children}</div>
        </div>
      </div>

      <div className={classNames('fcr-confirm-dialog-footer')}>
        {checkable && <Checkbox {...checkedProps} />}
        {footer || (
          <div className={classNames('fcr-confirm-dialog-footer-btns')}>
            {cancelButtonVisible && (
              <Button
                onClick={() => {
                  onCancel?.();
                  onClose?.();
                }}
                size="S"
                styleType="gray"
                {...cancelButtonProps}>
                {cancelText || 'Cancel'}
              </Button>
            )}

            {okButtonVisible && (
              <Button onClick={onOk} size="S" {...okButtonProps}>
                {okText || 'OK'}
              </Button>
            )}
          </div>
        )}
      </div>
    </BaseDialog>
  );
};
