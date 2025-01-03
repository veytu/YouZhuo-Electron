import { observer } from 'mobx-react';
import { useInteractiveUIStores } from '@classroom/infra/hooks/ui-store';
import { useCallback, useState } from 'react';
import { EduInteractiveUIClassStore } from '@classroom/infra/stores/interactive';
import { CarouselGroup, NavGroup } from '.';
import { visibilityControl, studentVideoEnabled, teacherVideoEnabled } from 'agora-common-libs';
import { DragableStream } from './draggable-stream';
import { useStore } from '@classroom/infra/hooks/ui-store';

// alex-tag-screennum-check
const role = sessionStorage.getItem('role');
const screenLimit = 2;
const checkScreen = () => {
  const screenNum = sessionStorage.getItem('screen');
  if (screenNum && +screenNum >= screenLimit) return true;
  return false;
};

export const RoomMidStreamsContainer = observer(() => {
  const { streamUIStore } = useInteractiveUIStores() as EduInteractiveUIClassStore;
  const { stageVisible } = streamUIStore;
  return (
    <div
      id="stage-container"
      className={`fcr-w-full fcr-flex-grow fcr-flex-shrink-0 ${
        stageVisible && role == '1' ? '' : checkScreen() ? 'fcr-hidden' : ''
      }`}>
      <div className="fcr-h-full fcr-flex fcr-justify-center fcr-items-center fcr-relative">
        <TeacherStream  />
        <StudentStreams />
      </div>
    </div>
  );
});

export const TeacherStream = visibilityControl(
  observer(({
    aspectRatio = '142/80',
    highTeacherStream,
  }: {
    aspectRatio?: string,
    highTeacherStream?:boolean
  }) => {
    const { streamUIStore } = useInteractiveUIStores() as EduInteractiveUIClassStore;
    const { teacherCameraStream, videoStreamSize, gap } = streamUIStore;

    const style = {
      marginRight: gap - 2,
      width:'100%',
      height:'100%'
    };

    if (teacherCameraStream && checkScreen()) {
      const { expandPlayerUIStore } = useStore();
      expandPlayerUIStore.openWindow();
      console.log(
        `alex-origin-teacher-stream-${JSON.stringify(teacherCameraStream.stream)}-isLocal-${
          teacherCameraStream.stream.isLocal
        }`,
      );
    }

    const playerStyle = {
      width: videoStreamSize.width,
      height: videoStreamSize.height,
    };

    return <DragableStream style={style} playerStyle={playerStyle} stream={teacherCameraStream}
      aspectRatio={aspectRatio ? aspectRatio : '142/80'} highTeacherStream={highTeacherStream} />;
  }),
  teacherVideoEnabled,
);

export const StudentStreams = visibilityControl(
  observer(() => {
    const { streamUIStore } = useInteractiveUIStores() as EduInteractiveUIClassStore;

    const { videoStreamSize, carouselNext, carouselPrev, scrollable, gap, carouselStreams } =
      streamUIStore;

    const [navigationVisible, setNavigationVisible] = useState(false);

    const mouseHandler = useCallback(
      (visible: boolean) => () => {
        setNavigationVisible(visible);
      },
      [],
    );

    return (
      <div onMouseEnter={mouseHandler(true)} onMouseLeave={mouseHandler(false)} style={{height:'100%'}}>
        {scrollable && (
          <NavGroup visible={navigationVisible} onPrev={carouselPrev} onNext={carouselNext} />
        )}
        <CarouselGroup
          gap={gap}
          fullHeight={true}
          videoWidth={videoStreamSize.width}
          videoHeight={videoStreamSize.height}
          carouselStreams={carouselStreams}
          aspectRatio='142/80'
        />
      </div>
    );
  }),
  studentVideoEnabled,
);
