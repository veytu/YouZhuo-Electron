import { aMessage } from '@app/components/message';

export const useCanvasStream = () => {
  let frameTimer: number;

  // 渲染视频流
  const rendStream = async (videoDom: HTMLVideoElement) => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((device) => device.kind === 'videoinput');
    const OBS = videoDevices.filter((device) => device.label.includes('OBS Virtual Camera'));
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: OBS[0].deviceId },
      audio: false,
    });
    if (videoDom && stream) {
      videoDom.srcObject = stream as MediaStream;
    }
  };
  // 渲染播放流
  const rendPlayStream = async (videoDom: HTMLVideoElement, url: string) => {
    videoDom.src = url;
    videoDom.play();
  };
  // 渲染函数
  const canvasRander = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    video: HTMLVideoElement,
  ) => {
    return () => {
      frameTimer = window.requestAnimationFrame(canvasRander(ctx, canvas, video));
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    };
  };
  // 闭包Dom
  const catchDom = () => {
    const video = document.querySelector('#video') as HTMLVideoElement;
    const videoLocal = document.querySelector('#video-local') as HTMLVideoElement;
    const canvas = document.querySelector('#render') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    return { video, videoLocal, canvas, ctx };
  };
  // 开始渲染
  const createProcess: (config: { isLocal: boolean; localURL?: string }) => void = async (
    config = { isLocal: true },
  ) => {
    const { isLocal, localURL } = config;
    const { video, videoLocal, canvas, ctx } = catchDom();
    canvas.height = 460;
    canvas.width = canvas.height / (9 / 16);
    video.addEventListener('play', () => {
      canvasRander(ctx, canvas, video)();
    });
    videoLocal.addEventListener('play', () => {
      canvasRander(ctx, canvas, videoLocal)();
    });
    try {
      if (isLocal) {
        await rendStream(video);
        return;
      }
      if (!localURL) {
        aMessage.warning({
          key: 'localURL',
          content: '请选择本地播放地址',
          duration: 1,
        });
        return;
      }
      await rendPlayStream(videoLocal, localURL);
    } catch (e) {
      aMessage.warning({
        key: 'compileFail',
        content: '播放解析失败',
        duration: 1,
      });
    }
  };
  // 停止渲染
  const stopProcess = () => {
    const { video, videoLocal } = catchDom();
    video.pause();
    videoLocal.pause();
    window.cancelAnimationFrame(frameTimer);
  };

  // moni
  const RegMoni = () => {
    const CASE_DOM_LOAD = 'Failed to load because no supported source was found.';
    // 监控路径分析错误
    window.addEventListener('unhandledrejection', ({ reason = '' }) => {
      const resStr = reason.toString();
      if (resStr.includes(CASE_DOM_LOAD)) {
        aMessage.error({
          content: '文件路径错误,请检查是否403||404',
          duration: 1,
        });
      }
    });
  };
  return { createProcess, stopProcess, RegMoni };
};
