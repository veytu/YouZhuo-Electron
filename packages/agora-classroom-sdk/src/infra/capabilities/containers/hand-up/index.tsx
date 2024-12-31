import { useStore } from '@classroom/infra/hooks/ui-store';
import { EduClassroomConfig, EduRoleTypeEnum } from 'agora-edu-core';
import { observer } from 'mobx-react';
import { visibilityControl, raiseHandEnabled } from 'agora-common-libs';
import './index.css';
import { StudentsWaveArmList, WaveArmManager, WaveArmManagerNav } from './manager';
import { WaveArmSender as WaveArmSenderContainer,WaveArmSenderNav as WaveArmSenderContainerNav } from './sender';
import { Card, Popover, SvgIcon, SvgIconEnum, SvgImg } from '@classroom/ui-kit/components';

export const WaveArmManagerContainer = observer(() => {
  const { handUpUIStore } = useStore();
  const { waveArmCount, hasWaveArmUser } = handUpUIStore;
  return (
    <WaveArmManager hasWaveArmUser={hasWaveArmUser} waveArmCount={waveArmCount}>
      <WaveArmListContainer />
    </WaveArmManager>
  );
});

export const WaveArmListContainer = observer(() => {
  const { handUpUIStore } = useStore();
  const { onPodium } = handUpUIStore;
  const { userWaveArmList } = handUpUIStore;

  return <StudentsWaveArmList userWaveArmList={userWaveArmList} onClick={onPodium} />;
});

export const HandsUpContainer = visibilityControl(
  observer(() => {
    const userRole = EduClassroomConfig.shared.sessionInfo.role;
    if (userRole === EduRoleTypeEnum.teacher) {
      return <WaveArmManagerContainer />;
    }
    if (userRole === EduRoleTypeEnum.student) {
      return <WaveArmSenderContainer />;
    }
    return null;
  }),
  raiseHandEnabled,
);

export const HandsUpContainerNav = visibilityControl(
  observer(() => {
    const userRole = EduClassroomConfig.shared.sessionInfo.role;
    if (userRole === EduRoleTypeEnum.teacher) {
      return <div onClick={() => {
        // 获取目标 div 元素
        const targetDiv = document.getElementsByClassName('card-hands-up');
        if (targetDiv && targetDiv.length > 0) {
          (targetDiv[0] as HTMLElement).click(); // 触发目标 div 的点击事件
        }
      }}>
        <Card
          className="hands-up-sender-nav"
          width={20}
          height={20}
          borderRadius={20}>
          <div>
            <SvgImg
              type={SvgIconEnum.HANDS_UP}
              size={20}
            />
          </div>
        </Card>
      </div>;
    }
    if (userRole === EduRoleTypeEnum.student) {
      return <WaveArmSenderContainerNav />;
    }
    return null;
  }),
  raiseHandEnabled,
);