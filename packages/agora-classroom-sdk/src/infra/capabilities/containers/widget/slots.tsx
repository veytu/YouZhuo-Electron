import { useLectureH5UIStores, useStore } from '@classroom/infra/hooks/ui-store';
import { EduLectureH5UIStore } from '@classroom/infra/stores/lecture-mobile';
import { EduClassroomConfig, EduRoleTypeEnum } from 'agora-edu-core';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from 'agora-common-libs';
import { ComponentLevelRules } from '../../config';
import { Card, Popover, SvgIcon, SvgIconEnum, SvgImg } from '@classroom/ui-kit/components';
import topResizeHandleBg from './assets/svga/top-resize-handle-bg.svg'

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
export const ChatNav = observer(function ChatNav() {
  return <div onClick={() => {
          // 获取目标 div 元素
        const targetDiv = document.getElementsByClassName('fcr-hx-show-chat-icon');
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
                type={SvgIconEnum.CHAT}
                size={16}
              />
            </div>
          </Card>
        </div>;
});

export const Whiteboard = observer(function Board() {
  const { boardUIStore,streamUIStore } = useStore();
  const { isCopying } = boardUIStore;

  const [height, setHeight] = useState(boardUIStore.boardAreaHeight);
  const resizableRef = useRef(null);

  useEffect(() => {
    let isResizing = false;
    let lastY: number;
    let lastHeight: number = boardUIStore.boardAreaHeight;
    //音视频区域最大显示的人数数量
    const streamShowCount = 3;

    //获取音视频流区域宽高
    function getStreamContainerWidthHeight() {
      // 获取目标元素
      const element = document.getElementById('stage-container');
      if (element) {
        // 获取元素的尺寸
        const rect = element.getBoundingClientRect();
        const width = rect.width;  // 获取宽度
        const height = rect.height;  // 获取高度
        return { width, height }
      } else {
        return { width: 0, height: 0 }
      }
    }
    //计算父容器应该显示的最大高度
    function calculateContainerHeight(containerWidth: number, childHeight: number, aspectRatio: number, maxUsers: number) {
      // 计算子元素的宽度
      const childWidth = childHeight * aspectRatio;
      // 所有使用的宽度
      const useWidth = maxUsers * childWidth;
      if(containerWidth > useWidth){
        return childHeight
      }else{
        return containerWidth / maxUsers / aspectRatio;
      }
    }
    function mouseDownHandler(e: { clientY: number; }) {
      if (EduClassroomConfig.shared.sessionInfo.role === EduRoleTypeEnum.teacher) {
        if (lastHeight < 0) {
          lastHeight = boardUIStore.boardAreaHeight;
        }
        isResizing = true;
        lastY = e.clientY;
      }
    }

    function mouseMoveHandler(e: { clientY: number; }) {
      if (!isResizing) return;
      //音视频区域宽高
      const {width,height} = getStreamContainerWidthHeight()
      //最大可容纳人数对应的高度
      const maxHeight = calculateContainerHeight(width, height, 142 / 80, Math.min(streamShowCount, streamUIStore.allUIStreams.size))
      //需要一定冗余量
      if (Math.abs(maxHeight - height) < 10 || lastY > e.clientY) {
        lastHeight = lastHeight + lastY - e.clientY;
        lastHeight += Math.max(0, maxHeight - height)
        lastHeight = Math.min(Math.max(lastHeight, 50), boardUIStore.boardAreaHeight)
        lastY = e.clientY;
        setHeight(lastHeight); // Ensure minimum height of 50px
      }
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

  // 定义 hover 状态
  const [isHovered, setIsHovered] = useState(false);
  // hover 样式
  const hoverStyle = {
    background: isHovered ? `url(${topResizeHandleBg}) center center / cover no-repeat` : 'transparent',
    height: 10,
    width: '100%',
    cursor: 'ns-resize',
  };

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
      <div className="top-resize-handle"
        style={EduClassroomConfig.shared.sessionInfo.role === EduRoleTypeEnum.teacher ? {...hoverStyle,position:'absolute',zIndex:9999} : { display: 'none' }}
        onMouseEnter={() => { if (EduClassroomConfig.shared.sessionInfo.role === EduRoleTypeEnum.teacher) setIsHovered(true) }}  // 进入时修改 hover 状态
        onMouseLeave={() => { if (EduClassroomConfig.shared.sessionInfo.role === EduRoleTypeEnum.teacher) setIsHovered(false) }} // 离开时修改 hover 状态
      ></div>
      { }
      <React.Fragment>
        <div
          style={{ height: `${height}px`, zIndex: ComponentLevelRules.WhiteBoard }}
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
