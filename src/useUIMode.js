import React from "react";

const MODES = {
  pc: "pc",
  mobile: "mobile"
};

const ORIENTATIONS = {
  portrait: "portrait",
  horizontal: "horizontal"
};

export default function useUIMode() {
  const [uiMode, setUIMode] = React.useState(MODES.mobile);
  const [isPCMode, setPCModeStatus] = React.useState(true);

  const mqlMediaRef = React.useRef();

  const getUIMode = React.useCallback((mql) => {
    if (!("onorientationchange" in window)) return MODES.pc;

    // 默认横屏
    let status = ORIENTATIONS.horizontal;

    if (mql.matches) {
      // 竖屏
      status = ORIENTATIONS.portrait;
    }

    const width =
      status === ORIENTATIONS.portrait
        ? Math.min(window.innerWidth, window.innerHeight)
        : Math.max(window.innerWidth, window.innerHeight);

    if (width > 1040) return MODES.pc;

    return MODES.mobile;
  }, []);

  const onUIModeChange = React.useCallback(
    (mql) => {
      let newUiMode = getUIMode(mql);

      setUIMode(newUiMode);
      setPCModeStatus(newUiMode === MODES.pc);
    },
    [getUIMode]
  );

  React.useEffect(() => {
    mqlMediaRef.current = window.matchMedia("(orientation: portrait)");
    mqlMediaRef.current.addListener(onUIModeChange);

    onUIModeChange(mqlMediaRef.current);

    return () => {
      mqlMediaRef.current.removeListener(onUIModeChange);
    };
  }, [onUIModeChange]);

  return { uiMode, isPCMode };
}
