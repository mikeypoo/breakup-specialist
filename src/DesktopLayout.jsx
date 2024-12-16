import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./AppContext";
import { TabPanel } from "./TabPanel";
import "./DesktopLayout.css";

export const DesktopLayout = () => {
  const { viewModel, showingModal } = useContext(AppContext);
  const { home, tabKeys } = viewModel;
  const [totalScroll, setTotalScroll] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const thresholds = useRef({
    home: 0,
    paradox: Infinity,
    breakup: Infinity,
    approach: Infinity,
    ready: Infinity,
  });
  const redText = useRef()
  const homeImg = useRef()

  const updateTextColor = () => {
    const textElement = redText.current;
    const container = homeImg.current;
    const containerRect = container.getBoundingClientRect();

    const characters = Array.from(textElement.textContent);
    textElement.innerHTML = "";
    characters.forEach(char => {
      const span = document.createElement("span");
      span.textContent = char;
      textElement.appendChild(span);
    });

    requestAnimationFrame(() => {
      const spans = Array.from(textElement.children);
      spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const onLeftBorder = rect.left < containerRect.left && containerRect.left < rect.right
        const onRightBorder = rect.left < containerRect.right && containerRect.right < rect.right

        if (onLeftBorder) {
          const pxDiff = containerRect.left - rect.left
          span.style.color = 'transparent'
          span.style.background = `linear-gradient(to right, rgba(180,41,37,1) ${pxDiff}px, rgba(241,232,231,1) ${pxDiff}px) text`
        } else if (onRightBorder) {
          const pxDiff = rect.right - containerRect.right
          span.style.color = 'transparent'
          span.style.background = `linear-gradient(to right, rgba(241,232,231,1) ${pxDiff - 1}px, rgba(180,41,37,1) ${pxDiff - 1}px) text`
        } else {
          const onImg = rect.left > containerRect.left && rect.right < containerRect.right;
          span.style.color = onImg ? "#F1E8E7" : "#B42925";
        }
      });
    });
  }

  useEffect(() => {
    const onScroll = (scrollEvent) => {
      if (showingModal) return;

      const { wheelDeltaY: amountChanged } = scrollEvent;

      setTotalScroll((prevScroll) => {
        const newScroll = prevScroll - amountChanged / 10;
        let snappedScroll = newScroll;

        if (newScroll >= 0 && newScroll <= thresholds.current.ready) {
          snappedScroll = newScroll;
          Object.values(thresholds.current).forEach((thresh) => {
            if (Math.abs(thresh - newScroll) < 3) {
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
  }, [showingModal]);

  useEffect(() => {
    const windowResize = () => {
      setTimeout(() => {
        let rollingThreshold = 0;
        const newThresholds = { ...thresholds.current };

        viewModel.tabKeys.forEach((key, idx) => {
          const el = document.getElementById(key);
          const currentLeft = el.getBoundingClientRect().left - 20 - 20 * idx;
          newThresholds[key] = rollingThreshold + currentLeft;
          rollingThreshold += currentLeft;
        });

        thresholds.current = newThresholds;
      }, 600)
      updateTextColor();
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
      } else {
        if (totalScroll < thresholds.current["approach"]) {
          if (totalScroll === thresholds.current["breakup"]) {
            setTotalScroll(thresholds.current["paradox"] + 1);
          } else {
            setTotalScroll(thresholds.current["breakup"] + 1);
            setTimeout(() => {
              setTotalScroll(thresholds.current["paradox"] + 1);
            }, delay)
          }
        } else if (totalScroll < thresholds.current["ready"]) {
          if (totalScroll === thresholds.current["approach"]) {
            setTotalScroll(thresholds.current["breakup"] + 1);
            setTimeout(() => {
              setTotalScroll(thresholds.current["paradox"] + 1);
            }, delay)
          } else {
            setTotalScroll(thresholds.current["approach"] + 1);
            setTimeout(() => {
              setTotalScroll(thresholds.current["breakup"] + 1);
            }, delay)
            setTimeout(() => {
              setTotalScroll(thresholds.current["paradox"] + 1);
            }, 2 * delay)
          }
        } else {
          setTotalScroll(thresholds.current["approach"] + 1);
          setTimeout(() => {
            setTotalScroll(thresholds.current["breakup"] + 1);
          }, delay)
          setTimeout(() => {
            setTotalScroll(thresholds.current["paradox"] + 1);
          }, 2 * delay)
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
      } else {
        if (totalScroll < thresholds.current["ready"]) {
          if (totalScroll === thresholds.current["approach"]) {
            setTotalScroll(thresholds.current["breakup"] + 1);
          } else {
            setTotalScroll(thresholds.current["approach"] + 1);
            setTimeout(() => {
              setTotalScroll(thresholds.current["breakup"] + 1)
            }, delay)
          }
        } else {
          setTotalScroll(thresholds.current["approach"] + 1);
          setTimeout(() => {
            setTotalScroll(thresholds.current["breakup"] + 1);
          }, delay)
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
      } else {
        setTotalScroll(thresholds.current["approach"] + 1);
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
    <>
      <div className="desktop-layout" style={{ visibility: imgLoaded ? 'visible' : 'hidden' }}>
        <div className="home-content editorial-font">
          <div className="home-content-name">
            {home.firstName} {home.lastName}
          </div>
          <div className="home-content-title">
            {home.titleTop} {home.titleBottom}
          </div>
          <div className="home-content-subtitle" ref={redText}>
            {home.subtitleShort}
          </div>
          <img className="home-content-img" src={home.imgSrc} alt="home" ref={homeImg} onLoad={() => setImgLoaded(true)}/>
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
    </>
  );
};
