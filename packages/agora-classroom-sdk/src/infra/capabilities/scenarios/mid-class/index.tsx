import classnames from 'classnames';
import { Layout } from '@classroom/ui-kit/components/layout';
import { DialogContainer } from '@classroom/infra/capabilities/containers/dialog';
import { HandsUpContainer } from '@classroom/infra/capabilities/containers/hand-up';
import { LoadingContainer } from '@classroom/infra/capabilities/containers/loading';
import { NavigationBar } from '@classroom/infra/capabilities/containers/nav';
import { FixedAspectRatioRootBox } from '@classroom/infra/capabilities/containers/root-box';
import { SceneSwitch } from '@classroom/infra/capabilities/containers/scene-switch';
import { RoomMidStreamsContainer, TeacherStream } from '@classroom/infra/capabilities/containers/stream/room-mid-player';
import { ToastContainer } from '@classroom/infra/capabilities/containers/toast';
import { Award } from '../../containers/award';
import Room from '../room';
import { useStore } from '@classroom/infra/hooks/ui-store';
import { CameraPlaceHolder, Float } from '@classroom/ui-kit';
import { ScenesController } from '../../containers/scenes-controller';
import { ScreenShareContainer } from '../../containers/screen-share';
import { WhiteboardToolbar } from '../../containers/toolbar';
import { WidgetContainer } from '../../containers/widget';
import { Chat, Watermark, Whiteboard } from '../../containers/widget/slots';
import { StreamWindowsContainer } from '../../containers/stream-window';
import CameraPreview from '../../containers/camera-preview';
import { EduClassroomConfig, EduRoleTypeEnum } from 'agora-edu-core';
import { StreamPlaceholder, StreamPlayerCameraPlaceholder } from '../../containers/stream';
import { CameraPlaceholderType } from '@classroom/infra/stores/common/stream/struct';

export const MidClassScenario = () => {
  // layout
  const layoutCls = classnames('edu-room', 'mid-class-room');
  const { shareUIStore, streamUIStore: { teacherCameraStream } } = useStore();
  const checkScreen = () => {
    const screenLimit = 2;
    //@ts-ignore
    const screenNum = sessionStorage.getItem('screen');
    if (screenNum && +screenNum >= screenLimit) return true;
    return false;
  };
  return (
    <Room>
      <FixedAspectRatioRootBox trackMargin={{ top: shareUIStore.navHeight }}>
        <SceneSwitch>
          <Layout className={layoutCls} direction="col">
            <NavigationBar />
            <Layout
              className="fcr-flex-grow fcr-items-stretch fcr-relative fcr-justify-center fcr-room-bg"
              direction="col">
              <div style={{ display: EduClassroomConfig.shared.sessionInfo.role === EduRoleTypeEnum.teacher ? 'unset' : 'none' }}>
                <RoomMidStreamsContainer />
              </div>
              {
                EduClassroomConfig.shared.sessionInfo.role === EduRoleTypeEnum.student && !checkScreen() ?
                  <div style={{ display: 'flex', width: '100%', flexDirection: 'row' }}>
                    <div style={{ width: '67%', textAlign: 'center' }}>
                      <Whiteboard />
                    </div>
                    <div style={{ display: EduClassroomConfig.shared.sessionInfo.role === EduRoleTypeEnum.student ? 'unset' : 'none', width: '33%', height: '100%', position: 'relative' }}>
                      {!teacherCameraStream && <div style={{ position: 'absolute', aspectRatio: '317/403', width: '100%', height: '100%' }}>
                        <CameraPlaceHolder state={CameraPlaceholderType.disabled} text={''} />
                      </div>}
                      <TeacherStream aspectRatio='317/403' highTeacherStream={true} />
                    </div>
                  </div> : <Whiteboard />
              }
              <ScreenShareContainer />
              <StreamWindowsContainer />
            </Layout>
            <WhiteboardToolbar />
            <ScenesController />
            <Float bottom={15} right={10} align="flex-end" gap={2}>
              <HandsUpContainer />
              <Chat />
            </Float>
            <DialogContainer />
            <LoadingContainer />
          </Layout>
          <WidgetContainer />
          <ToastContainer />
          <Award />
          <CameraPreview />
          <Watermark />
        </SceneSwitch>
      </FixedAspectRatioRootBox>
    </Room>
  );
};
