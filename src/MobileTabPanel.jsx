import { useCallback, useContext, useMemo, useState } from "react";
import { AppContext } from "./AppContext";
import { ParadoxContents } from "./ParadoxContents";
import { ReadyContents } from "./ReadyContents";
import { ApproachContents } from "./ApproachContents";
import { BreakupContents } from "./BreakupContents";

export const MobileTabPanel = ({
  tabKey,
  thresholds,
  swipes,
  toggleSwipeOf,
}) => {
  const { viewModel } = useContext(AppContext);
  const [transform, setTransform] = useState("translateY(0px)");
  const [startingPageY, setStartingPageY] = useState(0);

  const Contents = {
    paradox: ParadoxContents,
    breakup: BreakupContents,
    approach: ApproachContents,
    ready: ReadyContents,
  }[tabKey];

  const isSwipedUp = useMemo(() => swipes[tabKey], [swipes]);

  const bodyContainerClass = isSwipedUp
    ? "body-container showing"
    : "body-container";

  const canSwipe = useMemo(() => {
    let countSwiped = 0;

    Object.values(swipes).forEach((swipeVal) => {
      if (swipeVal) {
        countSwiped += 1;
      }
    });

    return (
      (tabKey === "paradox" && [0, 1].includes(countSwiped)) ||
      (tabKey === "breakup" && [1, 2].includes(countSwiped)) ||
      (tabKey === "approach" && [2, 3].includes(countSwiped)) ||
      (tabKey === "ready" && [3, 4].includes(countSwiped))
    );
  }, [swipes]);

  const tabData = viewModel[tabKey];

  const tabTouchStart = (touchStartEvent) => {
    if (!canSwipe) return;

    setStartingPageY(touchStartEvent.touches[0].pageY);
  };

  const tabTouchMove = useCallback(
    (touchMoveEvent) => {
      if (!canSwipe) return;

      const newPageY = touchMoveEvent.touches[0].pageY;
      const newTranslation = newPageY - startingPageY;

      if (-thresholds[tabKey] <= newTranslation && newTranslation <= 0) {
        if (!isSwipedUp) {
          setTransform(`translateY(${newTranslation}px)`);
        }
      } else if (0 < newTranslation && newTranslation <= thresholds[tabKey]) {
        if (isSwipedUp) {
          setTransform(`translateY(-${thresholds[tabKey] - newTranslation}px)`);
        }
      }
    },
    [thresholds, startingPageY, isSwipedUp]
  );

  const tabTouchEnd = useCallback(
    (touchEndEvent) => {
      if (!canSwipe) return;

      const newPageY = touchEndEvent.changedTouches[0].pageY;
      const newTranslation = newPageY - startingPageY;
      const absTranslation = Math.abs(newTranslation);

      if (newTranslation < 0) {
        if (isSwipedUp) return;

        if (absTranslation >= thresholds[tabKey] / 2) {
          setTransform(`translateY(${-thresholds[tabKey]}px)`);
          toggleSwipeOf(tabKey);
        } else {
          setTransform(`translateY(0px)`);
        }
      } else {
        if (!isSwipedUp) return;

        if (absTranslation >= thresholds[tabKey] / 2) {
          setTransform(`translateY(0px)`);
          toggleSwipeOf(tabKey);
        } else {
          setTransform(`translateY(${-thresholds[tabKey]}px)`);
        }
      }

      setStartingPageY(0);
    },
    [thresholds, startingPageY]
  );

  const handleClick = useCallback(() => {
    if (!canSwipe) return;

    if (isSwipedUp) {
      setTransform(`translateY(0px)`);
    } else {
      setTransform(`translateY(${-thresholds[tabKey]}px)`);
    }

    toggleSwipeOf(tabKey);
  }, [isSwipedUp, tabKey, canSwipe, thresholds]);

  return (
    <div className="tab smooth-transition" style={{ transform }} id={tabKey}>
      <div className="tab-content">
        <div
          className="title-text editorial-font"
          onTouchStart={tabTouchStart}
          onTouchMove={tabTouchMove}
          onTouchEnd={tabTouchEnd}
          onClick={handleClick}
        >
          {tabData.tabTitle}
        </div>
        <div className={bodyContainerClass}>
          {tabKey !== "ready" && (
            <div className="body-font body-subtitle">
              {tabData.bodySubtitle}
            </div>
          )}
          <div className="body-font body-content">
            <Contents />
          </div>
        </div>
      </div>
    </div>
  );
};
