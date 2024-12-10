import { BaseDialog } from '.';
import { SvgIconEnum, SvgImg } from '../svg-img';
import './global-dialog.css';
import { PropsWithChildren, ReactNode, CSSProperties } from 'react';
export interface GlobalDialogProps {
  visible: boolean;
  afterClose?: () => void;
  onClose?: () => void;
  width?: number;
  header?: ReactNode;
  headerWrapperStyle?: CSSProperties;
}
export const GlobalDialog = (props: PropsWithChildren<GlobalDialogProps>) => {
  const { visible, afterClose, onClose, width = 490, children, header, headerWrapperStyle } = props;
  return (
    <BaseDialog
      destroyOnClose
      width={width}
      wrapClassName="fcr-global-dialog"
      visible={visible}
      afterClose={afterClose}
      maskClosable={false}
      closable={false}>
      <div className="fcr-global-dialog-wrapper">
        {/* header */}
        <div className="fcr-global-dialog-header" style={headerWrapperStyle}>
          {header}
          <div className="fcr-global-dialog-header-close" onClick={onClose}>
            <SvgImg
              type={SvgIconEnum.FCR_CLOSE}
              colors={{ iconPrimary: 'currentColor' }}
              size={16}
            />
          </div>
        </div>
        {/* body */}
        <div className="fcr-global-dialog-body">{children}</div>
      </div>
    </BaseDialog>
  );
};
