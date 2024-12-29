import { useLectureH5UIStores, useStore } from '@classroom/infra/hooks/ui-store';
import { EduLectureH5UIStore } from '@classroom/infra/stores/lecture-mobile';
import { EduClassroomConfig } from 'agora-edu-core';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { SvgImg } from '@classroom/ui-kit';
import { useI18n } from 'agora-common-libs';
import { ComponentLevelRules } from '../../config';

export const Chat = observer(function Chat() {
  const { widgetUIStore } = useStore();
  const { ready } = widgetUIStore;

  useEffect(() => {
    if (ready) {
      const chatWidgetId = 'easemobIM';

      if (ready) {
        widgetUIStore.createWidget(chatWidgetId);
      }

      return () => {
        widgetUIStore.destroyWidget(chatWidgetId);
      };
    }
  }, [ready]);

  return <div className="widget-slot-chat fcr-h-full" />;
});

export const Whiteboard = observer(function Board() {
  const { boardUIStore } = useStore();
  const { isCopying } = boardUIStore;

  const [height, setHeight] = useState(boardUIStore.boardAreaHeight);
  const resizableRef = useRef(null);

  useEffect(() => {
    let isResizing = false;
    let startY: number;

    function mouseDownHandler(e: { clientY: number; }) {
      isResizing = true;
      startY = e.clientY;
    }

    function mouseMoveHandler(e: { clientY: number; }) {
      if (!isResizing) return;
      // Calculate new height based on the mouse position.
      // The top edge moves up as the height increases and vice versa.
      const newHeight = boardUIStore.boardAreaHeight + startY - e.clientY;
      setHeight(Math.min(Math.max(newHeight, 50), boardUIStore.boardAreaHeight)); // Ensure minimum height of 50px
    }

    function mouseUpHandler() {
      isResizing = false;
    }

    //@ts-ignore
    const resizeHandle = resizableRef.current.querySelector('.top-resize-handle');

    if (resizeHandle) {
      resizeHandle.addEventListener('mousedown', mouseDownHandler);
      window.addEventListener('mousemove', mouseMoveHandler);
      window.addEventListener('mouseup', mouseUpHandler);
    }

    return () => {
      if (resizeHandle) {
        resizeHandle.removeEventListener('mousedown', mouseDownHandler);
        window.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseup', mouseUpHandler);
      }
    };
  }, []);

  useEffect(() => {
    setHeight(boardUIStore.boardAreaHeight)
  }, [boardUIStore.boardAreaHeight])

  return (
    <div
      ref={resizableRef}
      style={{
        position: 'relative',
        height: `${height}px`,
        border: '1px solid black',
        boxSizing: 'border-box'
      }}
    >
      {/* Top resize handle */}
      <div className="top-resize-handle" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 10,
        cursor: 'ns-resize',
      }}
      ></div>
      {/* Content goes here */}
      <React.Fragment>
        <div
          style={{ height: boardUIStore.boardAreaHeight, zIndex: ComponentLevelRules.WhiteBoard }}
          className="widget-slot-board"
        />
        {isCopying && <Spinner />}
      </React.Fragment>
    </div>
  );
});

const Spinner = () => {
  const transI18n = useI18n();

  return (
    <div className="spinner-container">
      <div className="spinner-contianer-innner">
        <div className="spinner"></div> {transI18n('whiteboard.loading')}
      </div>
    </div>
  );
};

export const CountDownMobile = observer(() => {
  return <div className="fcr-countdown-mobile-widget"></div>;
});
export const PollMobile = observer(() => {
  const {
    shareUIStore: { isLandscape },
  } = useStore();
  return <div className={`fcr-poll-mobile-widget ${isLandscape ? '' : 'fcr-relative'}`}></div>;
});
export const WhiteboardMobile = observer(function Board() {
  const {
    boardUIStore,
    streamUIStore: { containerH5VisibleCls },
    shareUIStore: { isLandscape },
  } = useLectureH5UIStores() as EduLectureH5UIStore;

  const {
    iconBorderZoomType,
    iconZoomVisibleCls,
    handleBoradZoomStatus,
    boardContainerHeight,
    boardContainerWidth,
    mounted,
  } = boardUIStore;
  const height = mounted && !isLandscape ? boardContainerHeight : 0;
  return (
    <div
      className={classnames('whiteboard-mobile-container fcr-w-full fcr-relative', containerH5VisibleCls)}
      style={{
        height: height,
        width: boardContainerWidth,
        visibility: isLandscape ? 'hidden' : 'visible',
        overflow: 'hidden',
      }}>
      <div
        style={{
          height: height,
          width: boardContainerWidth,
          zIndex: ComponentLevelRules.WhiteBoard,
        }}
        className="widget-slot-board"
      />
      <SvgImg
        type={iconBorderZoomType}
        className={classnames('whiteboard-zoom-status', iconZoomVisibleCls)}
        onClick={handleBoradZoomStatus}
      />
    </div>
  );
});

export const ChatMobile = observer(function Chat() {
  const {
    widgetUIStore,
    streamUIStore: {
      teacherCameraStream,
      studentCameraStreams,
      studentVideoStreamSize,
      studentStreamsVisible,
      isPiP,
    },
    boardUIStore: { boardContainerHeight, mounted },
    shareUIStore: { isLandscape, forceLandscape },
    layoutUIStore: { classRoomPlacholderMobileHeight },
  } = useLectureH5UIStores();
  const { ready } = widgetUIStore;
  const [chatH5Height, setChatH5Height] = useState(0);
  const calcHeight = () => {
    const h5Height = document.body.clientHeight;
    //页面高度-课堂占位符高度-白板高度-老师视频高度-学生视频高度
    const height =
      h5Height -
      (!mounted && (!teacherCameraStream || teacherCameraStream.isCameraMuted)
        ? classRoomPlacholderMobileHeight
        : 0) -
      (mounted ? boardContainerHeight : 0) -
      (teacherCameraStream && !teacherCameraStream.isCameraMuted && !isPiP
        ? boardContainerHeight
        : 0) -
      (studentCameraStreams.length > 0 && studentStreamsVisible
        ? studentVideoStreamSize.height
        : 0);
    setChatH5Height(height);
  };
  useEffect(() => {
    calcHeight();
    window.addEventListener('resize', calcHeight);
    () => window.removeEventListener('resize', calcHeight);
  }, [isLandscape, forceLandscape, mounted, teacherCameraStream, boardContainerHeight, isPiP, studentCameraStreams.length, studentVideoStreamSize.height, teacherCameraStream?.isCameraMuted, studentStreamsVisible]);

  useEffect(() => {
    if (ready) {
      const chatWidgetId = 'easemobIM';

      if (ready) {
        widgetUIStore.createWidget(chatWidgetId);
      }

      return () => {
        widgetUIStore.destroyWidget(chatWidgetId);
      };
    }
  }, [ready]);

  return (
    <div
      className="widget-slot-chat-mobile"
      style={{
        height: chatH5Height,
        background: '#27292f',
      }}
    />
  );
});

export const Watermark = observer(function Chat() {
  const { widgetUIStore, classroomStore } = useStore();
  const { ready } = widgetUIStore;

  const watermark =
    classroomStore.connectionStore.mainRoomScene &&
    classroomStore.roomStore?.mainRoomDataStore.flexProps?.watermark;

  useEffect(() => {
    if (ready && watermark) {
      widgetUIStore.createWidget('watermark', {
        userProperties: {},
        properties: {
          content: EduClassroomConfig.shared.sessionInfo.userName,
          visible: true,
        },
        trackProperties: {},
      });
      return () => {
        widgetUIStore.destroyWidget('watermark');
      };
    }
  }, [ready, watermark]);

  return (
    <div className="widget-slot-watermark fcr-h-full fcr-w-full fcr-absolute fcr-top-0 fcr-left-0 fcr-pointer-events-none" />
  );
});
