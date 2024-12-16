import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./AppContext";
import { MobileTabPanel } from "./MobileTabPanel";
import "./MobileLayout.css";

export const MobileLayout = () => {
  const { viewModel } = useContext(AppContext);
  const { home, tabKeys } = viewModel;
  const [imgLoaded, setImgLoaded] = useState(false)

  const redText = useRef()
  const homeImg = useRef()

  const defaultSwipes = {
    paradox: false,
    breakup: false,
    approach: false,
    ready: false,
  }

  const [thresholds, setThresholds] = useState({
    paradox: Infinity,
    breakup: Infinity,
    approach: Infinity,
    ready: Infinity,
  });

  const [swipes, setSwipes] = useState(defaultSwipes);

  const toggleSwipeOf = (tabKey) => {
    const newSwipes = { ...swipes };
    newSwipes[tabKey] = !newSwipes[tabKey];
    setSwipes(newSwipes);
  };

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
          const pxDiff = rect.width - (rect.right - containerRect.right)
          span.style.color = 'transparent'
          span.style.background = `linear-gradient(to right, rgba(241,232,231,1) ${pxDiff}px, rgba(180,41,37,1) ${pxDiff}px) text`
        } else {
          const onImg = rect.left > containerRect.left && rect.right < containerRect.right;
          span.style.color = onImg ? "#F1E8E7" : "#B42925";
        }
      });
    });
  }

  useEffect(() => {
    const windowResize = () => {
      const newThresholds = { ...thresholds.current };

      tabKeys.forEach((key, idx) => {
        const el = document.getElementById(key);
        const currentTop = el.getBoundingClientRect().top - 8 * (idx + 1);
        newThresholds[key] = currentTop;
      });

      setThresholds(newThresholds);
      updateTextColor();
    };

    const orientationChanged = () => {
      window.location.reload()
    }

    windowResize();

    window.addEventListener("resize", windowResize);
    window.addEventListener("orientationchange", orientationChanged)

    return () => {
      window.removeEventListener("resize", windowResize);
      window.removeEventListener("orientationchange", orientationChanged)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgLoaded]);

  return (
    <div className="mobile-layout" style={{ visibility: imgLoaded ? 'visible' : 'hidden' }}>
      <div className="home-content editorial-font">
        <div className="home-content-name">
          {home.firstName} {home.lastName}
        </div>
        <div className="home-content-img-container">
          <img className="home-content-img" src={home.mobileImgSrc} alt="home" ref={homeImg} onLoad={() => setImgLoaded(true)}/>
          <div className="home-content-subtitle" ref={redText}>{home.subtitleShort}</div>
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
