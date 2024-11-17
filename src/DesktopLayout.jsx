import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./AppContext";
import { TabPanel } from "./TabPanel";
import "./DesktopLayout.css";

export const DesktopLayout = () => {
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
    const onScroll = (scrollEvent) => {
      const { wheelDeltaY: amountChanged } = scrollEvent;

      setTotalScroll((prevScroll) => {
        const newScroll = prevScroll - amountChanged / 20;
        let snappedScroll = newScroll;

        if (newScroll >= 0 && newScroll <= thresholds.current.approach) {
          snappedScroll = newScroll;
          Object.values(thresholds.current).forEach((thresh) => {
            if (Math.abs(thresh - newScroll) < 5) {
              snappedScroll = thresh;
            }
          });
          return snappedScroll;
        }
        return prevScroll;
      });
    };

    window.addEventListener("wheel", onScroll);

    return () => {
      window.removeEventListener("wheel", onScroll);
    };
  }, []);

  useEffect(() => {
    const windowResize = () => {
      let rollingThreshold = 0;
      const newThresholds = { ...thresholds.current };

      viewModel.tabKeys.forEach((key, idx) => {
        const el = document.getElementById(key);
        const currentLeft = el.getBoundingClientRect().left - 20 * (idx + 1);
        newThresholds[key] = rollingThreshold + currentLeft;
        rollingThreshold += currentLeft;
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
    <div className="desktop-layout">
      <div className="home-content editorial-font">
        <div className="home-content-name">
          {home.firstName} {home.lastName}
        </div>
        <div className="home-content-title">
          {home.titleTop} {home.titleBottom}
        </div>
        <img className="home-content-img" src={home.imgSrc} alt="home" />
      </div>
      {tabKeys.map((tabKey) => (
        <TabPanel
          key={tabKey}
          tabKey={tabKey}
          totalScroll={totalScroll}
          thresholds={thresholds.current}
        />
      ))}
    </div>
  );
};
