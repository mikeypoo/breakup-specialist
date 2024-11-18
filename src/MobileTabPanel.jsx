import { useContext, useState } from "react";
import { AppContext } from "./AppContext";

export const MobileTabPanel = ({ tabKey }) => {
  const { viewModel, openCalendly } = useContext(AppContext);
  const [transform, setTransform] = useState("");
  const [startingPageY, setStartingPageY] = useState(0);

  const tabData = viewModel[tabKey];

  const tabTouchStart = (touchStartEvent) => {
    setStartingPageY(touchStartEvent.touches[0].pageY);
  };

  const tabTouchMove = (touchMoveEvent) => {
    const newPageY = touchMoveEvent.touches[0].pageY;
    console.log("SHADINGO", { newPageY, startingPageY });
    setTransform(`translateY(-${startingPageY - newPageY}px)`);
  };

  const tabTouchEnd = (touchEndEvent) => {
    setStartingPageY(0);
  };

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
