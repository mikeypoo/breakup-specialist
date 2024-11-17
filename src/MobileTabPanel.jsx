import { useContext } from "react";
import { AppContext } from "./AppContext";

const transforminator = (tabKey, totalScroll, thresholds) => {
  if (totalScroll <= 0) return { transform: null };

  let transform = document.getElementById(tabKey).style.transform;

  if (totalScroll === 0) {
    if (tabKey === "paradox") {
      transform = `translateY(0px)`;
    }
  }

  if (totalScroll < thresholds.paradox) {
    if (tabKey === "paradox") {
      transform = `translateY(${-Math.round(totalScroll)}px)`;
    }
  } else if (totalScroll === thresholds.paradox) {
    if (tabKey === "paradox") {
      transform = `translateY(${-Math.round(totalScroll)}px)`;
    }
    if (tabKey === "breakup") {
      transform = `translateY(${-Math.round(totalScroll) + thresholds.paradox}px)`;
    }

  } else if (totalScroll < thresholds.breakup) {
    if (tabKey === "breakup") {
      transform = `translateY(${-Math.round(totalScroll) + thresholds.paradox}px)`;
    }
  } else if (totalScroll === thresholds.breakup) {
    if (tabKey === "breakup") {
      transform = `translateY(${-Math.round(totalScroll) + thresholds.paradox}px)`;
    }
    if (tabKey === "approach") {
      transform = `translateY(${-Math.round(totalScroll) + thresholds.breakup}px)`;
    }

  } else if (totalScroll <= thresholds.approach) {
    if (tabKey === "approach") {
      transform = `translateY(${-Math.round(totalScroll) + thresholds.breakup}px)`;
    }
  }
  return { transform };
};

export const MobileTabPanel = ({ tabKey, totalScroll, thresholds }) => {
  const { viewModel, openCalendly } = useContext(AppContext);

  const tabData = viewModel[tabKey];

  const { transform } = transforminator(tabKey, totalScroll, thresholds);

  return (
    <div className="tab smooth-transition" style={{ transform }} id={tabKey}>
      <div className="tab-content">
        <div className="title-text editorial-font">{tabData.tabTitle}</div>
        <div className="body-container">
          <div className="body-font body-subtitle">{tabData.bodySubtitle}</div>
          <div className="body-font body-content">
            {tabData.bodyContent.split("\n").map(section => {
              return <div style={{ marginTop: '24px'}}>{section}</div>
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
