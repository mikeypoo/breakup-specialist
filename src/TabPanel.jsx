import { useContext } from "react";
import { AppContext } from "./AppContext";

const transforminator = (tabKey, totalScroll, thresholds) => {
  if (totalScroll <= 0) return { transform: null };

  let transform = document.getElementById(tabKey).style.transform;

  if (totalScroll <= thresholds.paradox) {
    if (tabKey === "paradox") {
      transform = `translateX(clamp(${-thresholds.paradox}px, ${-Math.round(
        totalScroll
      )}px, 0px))`;
    }
  } else if (totalScroll <= thresholds.breakup) {
    if (tabKey === "breakup") {
      transform = `translateX(clamp(${
        -thresholds.breakup + thresholds.paradox
      }px, ${-Math.round(totalScroll) + thresholds.paradox}px, 0px))`;
    }
  } else if (totalScroll <= thresholds.approach) {
    if (tabKey === "approach") {
      transform = `translateX(clamp(${
        -thresholds.approach + thresholds.breakup
      }px, ${-Math.round(totalScroll) + thresholds.breakup}px, 0px))`;
    }
  }
  return { transform };
};

export const TabPanel = ({ tabKey, totalScroll, thresholds }) => {
  const { viewModel, openCalendly } = useContext(AppContext);

  const tabData = viewModel[tabKey];

  const { transform } = transforminator(tabKey, totalScroll, thresholds);

  return (
    <div className="tab smooth-transition" style={{ transform }} id={tabKey}>
      <div className="tab-content">
        <div className="title-text editorial-font">{tabData.tabTitle}</div>
        <div className="body-container">
          <div className="editorial-font body-title">{tabData.bodyTitle}</div>
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
