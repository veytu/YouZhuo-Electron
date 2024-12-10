import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { BaseDialog, ClassDialog, ConfirmDialog } from '.';
import { GlobalDialog } from './global-dialog';
import { SvgIconEnum, SvgImg } from '../svg-img';
import { Button } from '../button';
const meta: Meta = {
  title: 'Components/Dialog',
};

export const Docs = () => {
  const [visible, setVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [classDialogVisible, setClassDialogVisible] = useState(false);
  const [globalDialogVisible, setGlobalDialogVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setVisible(true)}>open base dialog</Button>
      <Button onClick={() => setConfirmDialogVisible(true)}>open confirm dialog</Button>
      <Button onClick={() => setClassDialogVisible(true)}>open class dialog</Button>
      <Button onClick={() => setGlobalDialogVisible(true)}>open global dialog</Button>

      <BaseDialog visible={visible} onClose={() => setVisible(false)}></BaseDialog>
      <ConfirmDialog
        icon={<SvgImg type={SvgIconEnum.FCR_FILE_ALF} size={50}></SvgImg>}
        checkedProps={{
          label: '不再显示',
        }}
        checkable
        maskClosable={false}
        onOk={() => setConfirmDialogVisible(false)}
        title={'移到垃圾桶'}
        visible={confirmDialogVisible}
        onClose={() => setConfirmDialogVisible(false)}>
        <div>此白板将移到垃圾桶，协作组将不再拥有其访问权限。</div>
      </ConfirmDialog>
      <ClassDialog
        imgUrl=" "
        maskClosable={false}
        visible={classDialogVisible}
        onClose={() => setClassDialogVisible(false)}
        title={'本节课程已结束！'}
        content={'你可以去预约其它的课程啦'}
        cancelBtn={false}
        actions={[
          {
            text: '我知道了，离开教室',
            styleType: 'danger',
            onClick: () => setClassDialogVisible(false),
          },
        ]}></ClassDialog>
      <GlobalDialog
        header={<span>Global dialog</span>}
        onClose={() => setGlobalDialogVisible(false)}
        visible={globalDialogVisible}>
        <div className="fcr-text-1 fcr-flex fcr-justify-center">global dialog</div>
      </GlobalDialog>
    </div>
  );
};

export default meta;
