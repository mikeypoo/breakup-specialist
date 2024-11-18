import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./AppContext";
import { MobileTabPanel } from "./MobileTabPanel";
import "./MobileLayout.css";

export const MobileLayout = () => {
  const { viewModel } = useContext(AppContext);
  const { home, tabKeys } = viewModel;

  const [thresholds, setThresholds] = useState({
    paradox: Infinity,
    breakup: Infinity,
    approach: Infinity,
  });

  const [swipes, setSwipes] = useState({
    paradox: false,
    breakup: false,
    approach: false,
  })

  const toggleSwipeOf = tabKey => {
    const newSwipes = { ...swipes }
    newSwipes[tabKey] = !newSwipes[tabKey]
    setSwipes(newSwipes)
  }

  useEffect(() => {
    const windowResize = () => {
      const newThresholds = { ...thresholds.current };

      viewModel.tabKeys.forEach((key, idx) => {
        const el = document.getElementById(key);
        const currentTop = el.getBoundingClientRect().top - 8 * (idx + 1);
        newThresholds[key] = currentTop;
      });

      setThresholds(newThresholds);
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
          thresholds={thresholds}
          swipes={swipes}
          toggleSwipeOf={toggleSwipeOf}
        />
      ))}
    </div>
  );
};
