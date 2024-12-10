import { ConfirmDialog } from "./confirm-dialog";
import { ClassDialog } from "./class-dialog";
import { CSSProperties, FC, ReactNode } from "react";
import RcDialog from "rc-dialog";
import "./index.css";
import classnames from "classnames";
import { SvgIconEnum, SvgImg } from "../svg-img";
import { themeVal } from "../../utils/tailwindcss";

export interface BaseDialogProps {
  /**
   * 对话框是否显示
   */
  /** @en
   * Whether the dialog is visible or not.
   */
  visible?: boolean;
  /**
   * 对话框关闭的回调，点击关闭按钮或蒙层时触发
   */
  /** @en
   * Specify a function that will be called when a user clicks mask, close button on top right or Cancel button
   */
  onClose?: () => void;
  /**
   * 是否可以点击蒙层关闭
   */
  /** @en
   * Whether to close the modal dialog when the mask (area outside the modal) is clicked
   */
  maskClosable?: boolean;
  /**
   * 对话框宽度
   */
  /** @en
   * Width of the dialog
   */
  width?: number;
  /**
   * 对话框类名
   */
  /** @en
   * classname of the dialog
   */
  classNames?: string;
  /**
   * 是否显示对话框关闭按钮
   */
  /** @en
   * Whether a close (x) button is visible on top right of the dialog or not
   */
  closable?: boolean;
  /**
   * 自定义对话框关闭按钮
   */
  /** @en
   * Custom close icon
   */
  closeIcon?: ReactNode;
  afterClose?: () => void;
  mask?: boolean;
  bodyStyle?: CSSProperties;
  wrapClassName?: string;
  getContainer?: false | string | HTMLElement | (() => HTMLElement) | undefined;
  center?: boolean;
  destroyOnClose?: boolean;
  maskStyle?: CSSProperties;
  wrapStyle?: CSSProperties;
  zIndex?: number;
  forceRender?: boolean;
}
const BaseDialog: FC<React.PropsWithChildren<BaseDialogProps>> = (props) => {
  const {
    visible,
    onClose,
    children,
    maskClosable,
    width,
    classNames,
    closable = true,
    closeIcon,
    mask = true,
    bodyStyle,
    wrapClassName,
    getContainer,
    center = true,
    afterClose,
    destroyOnClose,
    maskStyle,
    wrapStyle,
    zIndex,
    forceRender,
  } = props;

  const colors = themeVal("colors");

  return (
    <RcDialog
      forceRender={forceRender}
      zIndex={zIndex}
      wrapStyle={wrapStyle}
      maskStyle={maskStyle}
      destroyOnClose={destroyOnClose}
      afterClose={afterClose}
      getContainer={getContainer}
      wrapClassName={classnames({ "fcr-dialog-center": center }, wrapClassName)}
      bodyStyle={bodyStyle}
      mask={mask}
      className={classNames}
      width={width || 415}
      maskClosable={maskClosable}
      footer={null}
      prefixCls="fcr-dialog"
      animation={"zoom"}
      maskAnimation={"fade"}
      closable={false}
      visible={visible}
      onClose={onClose}
    >
      {closable ? (
        closeIcon ? (
          closeIcon
        ) : (
          <div onClick={onClose} className={classnames("fcr-dialog-close")}>
            <SvgImg
              type={SvgIconEnum.FCR_CLOSE}
              size={12}
              colors={{ iconPrimary: colors["notsb-inverse"] }}
            ></SvgImg>
          </div>
        )
      ) : null}
      {children}
    </RcDialog>
  );
};
export { ConfirmDialog, ClassDialog, BaseDialog };
