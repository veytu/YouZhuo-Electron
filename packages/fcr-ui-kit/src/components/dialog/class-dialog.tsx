import { FC, ReactNode } from 'react';
import { Button, ButtonProps } from '../button';
import { BaseDialog, BaseDialogProps } from '.';
import './class-dialog.css';

export interface ClassDialogProps extends BaseDialogProps {
  /**
   * 对话框标题
   */
  /** @en
   * The dialog Title.
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
   * 对话框顶部图片地址
   */
  /** @en
   * Set the url for the image on the top of dialog.
   */
  imgUrl?: string;
  /**
   * 对话框描述内容
   */
  /** @en
   * The dialog content
   */
  content?: ReactNode;
  /**
   * 对话框按钮组，会在描述内容下方渲染若干操作按钮
   */
  /** @en
   * Set the action buttons on the bottom of the dialog content.
   */
  actions?: (ButtonProps & { text?: string })[];
  /**
   * 是否显示取消按钮
   */
  /** @en
   * Wheter the cancel button is visible on bottom of the dialog or not.
   */
  cancelBtn?: boolean;
}
export const ClassDialog: FC<React.PropsWithChildren<ClassDialogProps>> = (props) => {
  const {
    visible,
    onClose,
    title,
    content,
    maskClosable,

    imgUrl,
    width,
    actions,
    cancelBtn,
  } = props;
  return (
    <BaseDialog
      closable={false}
      classNames="fcr-class-dialog"
      width={width || 344}
      maskClosable={maskClosable}
      visible={visible}
      onClose={onClose}>
      <div className="fcr-class-dialog-inner">
        {imgUrl && (
          <div className="fcr-class-dialog-img">
            <img src={imgUrl}></img>
          </div>
        )}

        <div className="fcr-class-dialog-title">{title}</div>
        <div className="fcr-class-dialog-content">{content}</div>
        <div className="fcr-class-dialog-actions">
          {actions?.map((btnProps, index) => {
            return (
              <Button key={index.toString()} size="S" block {...btnProps}>
                {btnProps.text || 'Text'}
              </Button>
            );
          })}
        </div>
        {cancelBtn && (
          <div className="fcr-class-dialog-cancel" onClick={onClose}>
            <Button styleType="gray" size="S" block>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </BaseDialog>
  );
};
