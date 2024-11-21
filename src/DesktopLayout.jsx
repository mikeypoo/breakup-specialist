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
    ready: Infinity,
  });

  useEffect(() => {
    const onScroll = (scrollEvent) => {
      const { wheelDeltaY: amountChanged } = scrollEvent;

      setTotalScroll((prevScroll) => {
        const newScroll = prevScroll - amountChanged / 20;
        let snappedScroll = newScroll;

        if (newScroll >= 0 && newScroll <= thresholds.current.ready) {
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
        const currentLeft = el.getBoundingClientRect().left - 20 - 20 * idx;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabClick = (tabKey) => {
    const delay = 150;

    if (tabKey === "paradox") {
      if (totalScroll < thresholds.current["breakup"]) {
        setTotalScroll(thresholds.current[tabKey]);

        if (Math.abs(totalScroll - thresholds.current["paradox"]) < 2) {
          setTotalScroll(0);
        }
      }
    }

    if (tabKey === "breakup") {
      if (totalScroll < thresholds.current["breakup"]) {
        if (totalScroll >= thresholds.current["paradox"]) {
          setTotalScroll(thresholds.current[tabKey]);
        } else {
          setTimeout(() => {
            setTotalScroll(thresholds.current[tabKey]);
          }, delay);
          setTotalScroll(thresholds.current["paradox"]);
        }
      }

      if (Math.abs(totalScroll - thresholds.current["breakup"]) < 2) {
        setTotalScroll(thresholds.current["paradox"] + 1);
      }
    }

    if (tabKey === "approach") {
      if (totalScroll < thresholds.current["approach"]) {
        if (totalScroll >= thresholds.current["breakup"]) {
          setTotalScroll(thresholds.current[tabKey]);
        } else if (totalScroll >= thresholds.current["paradox"]) {
          setTotalScroll(thresholds.current["breakup"]);
          setTimeout(() => {
            setTotalScroll(thresholds.current[tabKey]);
          }, delay);
        } else {
          setTotalScroll(thresholds.current["paradox"]);
          setTimeout(() => {
            setTotalScroll(thresholds.current["breakup"]);
          }, delay);
          setTimeout(() => {
            setTotalScroll(thresholds.current[tabKey]);
          }, delay * 2);
        }
      }

      if (Math.abs(totalScroll - thresholds.current["approach"]) < 2) {
        setTotalScroll(thresholds.current["breakup"] + 1);
      }
    }

    if (tabKey === "ready") {
      if (totalScroll < thresholds.current["ready"]) {
        if (totalScroll >= thresholds.current["approach"]) {
          setTotalScroll(thresholds.current[tabKey]);
        } else if (totalScroll >= thresholds.current["breakup"]) {
          setTotalScroll(thresholds.current["approach"]);
          setTimeout(() => {
            setTotalScroll(thresholds.current[tabKey]);
          }, delay);
        } else if (totalScroll >= thresholds.current["paradox"]) {
          setTotalScroll(thresholds.current["breakup"]);
          setTimeout(() => {
            setTotalScroll(thresholds.current["approach"]);
          }, delay);
          setTimeout(() => {
            setTotalScroll(thresholds.current[tabKey]);
          }, delay * 2);
        } else {
          setTotalScroll(thresholds.current["paradox"]);
          setTimeout(() => {
            setTotalScroll(thresholds.current["breakup"]);
          }, delay);
          setTimeout(() => {
            setTotalScroll(thresholds.current["approach"]);
          }, delay * 2);
          setTimeout(() => {
            setTotalScroll(thresholds.current[tabKey]);
          }, delay * 3);
        }
      }

      if (Math.abs(totalScroll - thresholds.current["ready"]) < 2) {
        setTotalScroll(thresholds.current["approach"] + 1);
      }
    }
  };

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
          handleTabClick={handleTabClick}
        />
      ))}
    </div>
  );
};
