import { ConfirmDialog } from '@components/dialog';
import { ConfirmDialogProps } from '@components/dialog/confirm-dialog';
import { useStore } from '@ui-scene/utils/hooks/use-store';
import { useI18n } from 'agora-common-libs';
import { observer } from 'mobx-react';
import { FC, useState } from 'react';

export const ConfirmDialogWrapper: FC<ConfirmDialogProps> = observer((props) => {
  const [visible, setVisible] = useState(true);
  const transI18n = useI18n();
  const {
    layoutUIStore: { classroomViewportClassName },
  } = useStore();
  const afterClose = () => {
    props.onClose?.();
  };

  return (
    <ConfirmDialog
      getContainer={() => {
        return document.querySelector(`.${classroomViewportClassName}`) as HTMLElement;
      }}
      maskClosable={false}
      visible={visible}
      {...props}
      okText={props.okText ?? transI18n('fcr_room_button_ok')}
      cancelText={props.cancelText ?? transI18n('fcr_user_tips_button_cancel')}
      closable={props.closable || false}
      afterClose={afterClose}
      onClose={() => {
        setVisible(false);
      }}
      onOk={() => {
        props.onOk?.();
        setVisible(false);
      }}></ConfirmDialog>
  );
});
