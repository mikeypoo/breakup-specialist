import { useCallback, useContext, useMemo, useState } from "react";
import { AppContext } from "./AppContext";

export const MobileTabPanel = ({ tabKey, thresholds, swipes, toggleSwipeOf }) => {
  const { viewModel, openCalendly } = useContext(AppContext);
  const [transform, setTransform] = useState("");
  const [startingPageY, setStartingPageY] = useState(0);


  const isSwipedUp = useMemo(() => swipes[tabKey], [swipes])

  const canSwipe = useMemo(() => {
    let countSwiped = 0

    Object.values(swipes).forEach(swipeVal => {
      if (swipeVal) {
        countSwiped += 1
      }
    })

    return (
      (tabKey === 'paradox' && [0, 1].includes(countSwiped)) || 
      (tabKey === 'breakup' && [1, 2].includes(countSwiped)) || 
      (tabKey === 'approach' && [2, 3].includes(countSwiped))
    )
  }, [swipes])

  const tabData = viewModel[tabKey];

  const tabTouchStart = (touchStartEvent) => {
    if (!canSwipe) return;

    setStartingPageY(touchStartEvent.touches[0].pageY);
  };

  const tabTouchMove = useCallback((touchMoveEvent) => {
    if (!canSwipe) return;

    const newPageY = touchMoveEvent.touches[0].pageY;
    const newTranslation = newPageY - startingPageY

    if (-thresholds[tabKey] <= newTranslation && newTranslation <= 0) {
      if (!isSwipedUp) {
        setTransform(`translateY(${newTranslation}px)`);
      }
    } else if (0 < newTranslation && newTranslation <= thresholds[tabKey]) {
      if (isSwipedUp) {
        setTransform(`translateY(-${thresholds[tabKey] - newTranslation}px)`);
      }
    }
  }, [thresholds, startingPageY, isSwipedUp]);

  const tabTouchEnd = useCallback((touchEndEvent) => {
    if (!canSwipe) return;

    const newPageY = touchEndEvent.changedTouches[0].pageY;
    const newTranslation = newPageY - startingPageY
    const absTranslation = Math.abs(newTranslation)

    if (newTranslation < 0) {
      // trying to swipe up
      if (isSwipedUp) return;

      if (absTranslation >= thresholds[tabKey] / 2) {
        setTransform(`translateY(${-thresholds[tabKey]}px)`)
        toggleSwipeOf(tabKey)
      } else {
        setTransform(`translateY(0px)`)
      }
    } else {
      // trying to swipe down
      if (!isSwipedUp) return;

      if (absTranslation >= thresholds[tabKey] / 2) {
        setTransform(`translateY(0px)`)
        toggleSwipeOf(tabKey)
      } else {
        setTransform(`translateY(${-thresholds[tabKey]}px)`)
      }
    }

    setStartingPageY(0);
  }, [thresholds, startingPageY]);

  return (
    <div className="tab smooth-transition" style={{ transform }} id={tabKey}>
      <div className="tab-content">
        <div
          className="title-text editorial-font"
          onTouchStart={tabTouchStart}
          onTouchMove={tabTouchMove}
          onTouchEnd={tabTouchEnd}
        >
          {tabData.tabTitle}
        </div>
        <div className="body-container">
          <div className="body-font body-subtitle">{tabData.bodySubtitle}</div>
          <div className="body-font body-content">
            {tabData.bodyContent.map((section) => {
              return (
                <div style={{ marginTop: "24px" }} key={section.id}>
                  {section.section}
                </div>
              );
            })}
          </div>
          <button className="editorial-font body-cta" onClick={openCalendly}>
            I am ready
          </button>
        </div>
      </div>
    </div>
  );
};
