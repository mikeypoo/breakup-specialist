import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./AppContext";
import { MobileTabPanel } from "./MobileTabPanel";
import "./MobileLayout.css";

export const MobileLayout = () => {
  const { viewModel } = useContext(AppContext);
  const { home, tabKeys } = viewModel;

  const [totalScroll, setTotalScroll] = useState(0);
  const thresholds = useRef({
    expertise: Infinity,
    breakThrough: Infinity,
    outcomes: Infinity,
    approach: Infinity,
  });

  useEffect(() => {
    const onScroll = (scrollEvent) => {
      console.log("SHADINGO", { scrollEvent });

      const amountChanged = 7;

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

    window.addEventListener("touchmove", onScroll);

    return () => {
      window.removeEventListener("touchmove", onScroll);
    };
  }, []);

  useEffect(() => {
    const windowResize = () => {
      let rollingThreshold = 0;
      const newThresholds = { ...thresholds.current };

      viewModel.tabKeys.forEach((key, idx) => {
        const el = document.getElementById(key);
        const currentTop = el.getBoundingClientRect().top - 20 * (idx + 1);
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
