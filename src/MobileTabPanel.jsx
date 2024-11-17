import { useContext } from "react";
import { AppContext } from "./AppContext";

const transforminator = (tabKey, totalScroll, thresholds) => {
  if (totalScroll <= 0) return { transform: null };

  let transform = document.getElementById(tabKey).style.transform;

  if (totalScroll <= thresholds.expertise) {
    if (tabKey === "expertise") {
      transform = `translateY(clamp(${-thresholds.expertise}px, ${-Math.round(
        totalScroll
      )}px, 0px))`;
    }
  } else if (totalScroll <= thresholds.breakThrough) {
    if (tabKey === "breakThrough") {
      transform = `translateY(clamp(${
        -thresholds.breakThrough + thresholds.expertise
      }px, ${-Math.round(totalScroll) + thresholds.expertise}px, 0px))`;
    }
  } else if (totalScroll <= thresholds.outcomes) {
    if (tabKey === "outcomes") {
      transform = `translateY(clamp(${
        -thresholds.outcomes + thresholds.breakThrough
      }px, ${-Math.round(totalScroll) + thresholds.breakThrough}px, 0px))`;
    }
  } else if (totalScroll <= thresholds.approach) {
    if (tabKey === "approach") {
      transform = `translateY(clamp(${
        -thresholds.approach + thresholds.outcomes
      }px, ${-Math.round(totalScroll) + thresholds.outcomes}px, 0px))`;
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
          <div className="editorial-font body-title">{tabData.bodyTitle}</div>
          <div className="body-font body-subtitle">{tabData.bodySubtitle}</div>
          <div className="body-font body-content">{tabData.bodyContent}</div>
          <button className="editorial-font body-cta" onClick={openCalendly}>
            I am ready
          </button>
        </div>
      </div>
    </div>
  );
};
