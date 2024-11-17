import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./AppContext";
import { MobileTabPanel } from "./MobileTabPanel";
import "./MobileLayout.css";

export const MobileLayout = () => {
  const { viewModel } = useContext(AppContext);
  const { home, tabKeys } = viewModel;

  const [totalScroll, setTotalScroll] = useState(0);
  const thresholds = useRef({
    home: 0,
    paradox: Infinity,
    breakup: Infinity,
    approach: Infinity,
  });

  useEffect(() => {
    let startingPageY = 0

    const onTouchStart = (touchStartEvent) => {
      startingPageY = touchStartEvent.touches[0].pageY
    }

    const onTouchMove = (touchMoveEvent) => {
      const newPageY = touchMoveEvent.touches[0].pageY

      const amountChanged = startingPageY - newPageY

      setTotalScroll((prevScroll) => {
        const newScroll = prevScroll + amountChanged;

        if (newScroll >= 0 && newScroll <= thresholds.current.approach) {
          return newScroll;
        }
        return prevScroll;
      });
      startingPageY = newPageY
    };

    const onTouchEnd = () => {
      setTotalScroll(prevScroll => {
      let minThresh = Infinity
        Object.values(thresholds.current).forEach(thresh => {
          if (Math.abs(prevScroll + startingPageY - thresh) < Math.abs(prevScroll + startingPageY - minThresh)) {
            minThresh = thresh
          }
        })

        return minThresh
      })
      startingPageY = 0
    }

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd)

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useEffect(() => {
    const windowResize = () => {
      let rollingThreshold = 0;
      const newThresholds = { ...thresholds.current };

      viewModel.tabKeys.forEach((key, idx) => {
        const el = document.getElementById(key);
        const currentTop = el.getBoundingClientRect().top - 8 * (idx + 1);
        newThresholds[key] = rollingThreshold + currentTop;
        rollingThreshold += currentTop;
      });

      thresholds.current = newThresholds;
    };

    windowResize();

    window.addEventListener("resize", windowResize);

    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  return (
    <div className="mobile-layout">
      <div className="home-content editorial-font">
        <div className="home-content-name">
          {home.firstName} {home.lastName}
        </div>
        <div className="home-content-title">
          {home.titleTop} {home.titleBottom}
        </div>
        <img className="home-content-img" src={home.mobileImgSrc} alt="home" />
      </div>
      {tabKeys.map((tabKey) => (
        <MobileTabPanel
          key={tabKey}
          tabKey={tabKey}
          totalScroll={totalScroll}
          thresholds={thresholds.current}
        />
      ))}
    </div>
  );
};
