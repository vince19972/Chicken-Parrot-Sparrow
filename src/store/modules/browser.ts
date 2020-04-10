import {
  CommitKey,
  CommitData,
  ResizeState,
  ScrollState,
  MouseState,
  MouseShape,
  WindowSize,
} from "../types/browser";

export default {
  namespaced: true,
  state: {
    width: 1920,
    height: 1080,
    ratio: 0,
    position: 0,
    mouse: { x: 0, y: 0 },
    screen: {
      large: 1600,
      medium: 1280,
      desktop: 1024,
      small: 850,
      tablet: 768,
      mobile: 550,
    },
  },
  getters: {
    windowSize: ({ width, height }: WindowSize): WindowSize => ({
      width,
      height,
    }),
    mouseCoord: ({ mouse }: MouseShape): MouseShape => ({
      x: mouse.x,
      y: mouse.y,
    }),
  },
  mutations: {
    [CommitKey.Scroll]: (state: ScrollState) =>
      (state.position = window.scrollY),
    [CommitKey.Resize]: (state: ResizeState) => {
      state.width = document.documentElement.clientWidth;
      state.height = window.innerHeight;
      state.ratio = window.innerWidth / window.innerHeight;
    },
    [CommitKey.Mouse]: (state: MouseState, position: MouseShape) => {
      state.mouse = position;
    },
  },
};

export function browserEvent(store: {
  commit: (arg0: string, arg1: CommitData) => void;
}) {
  const throttleWindowEvent = (commitKey: CommitKey) => {
    let start = 0;

    const callbackEvent = (data: CommitData) => {
      store.commit(`browser/${commitKey}`, data);
    };

    return (data: CommitData) => {
      const step = (timestamp: number) => {
        if (start === 0) start = timestamp;
        const progress = timestamp - start;

        if (progress > 33) {
          start = 0;
          callbackEvent(data);
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };
  };

  const resizeEvent = throttleWindowEvent(CommitKey.Resize);
  const scrollEvent = throttleWindowEvent(CommitKey.Scroll);
  const mouseEvent = throttleWindowEvent(CommitKey.Mouse);

  resizeEvent(null);
  scrollEvent(null);

  return {
    resizeEvent,
    scrollEvent,
    mouseEvent,
  };
}
