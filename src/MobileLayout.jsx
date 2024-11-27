import { useContext, useEffect, useState } from "react";
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
    ready: Infinity,
  });

  const [swipes, setSwipes] = useState({
    paradox: false,
    breakup: false,
    approach: false,
    ready: false,
  });

  const toggleSwipeOf = (tabKey) => {
    const newSwipes = { ...swipes };
    newSwipes[tabKey] = !newSwipes[tabKey];
    setSwipes(newSwipes);
  };

  useEffect(() => {
    const windowResize = () => {
      const newThresholds = { ...thresholds.current };

      tabKeys.forEach((key, idx) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mobile-layout">
      <div className="home-content editorial-font">
        <div className="home-content-name">
          {home.firstName} {home.lastName}
        </div>
        <div className="home-content-img-container">
          <img className="home-content-img" src={home.mobileImgSrc} alt="home" />
        </div>
        <div className="home-content-title">
          {home.titleTop} {home.titleBottom}
        </div>
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
