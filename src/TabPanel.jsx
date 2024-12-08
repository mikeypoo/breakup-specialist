import { useContext } from "react";
import { AppContext } from "./AppContext";
import { ParadoxContents } from "./ParadoxContents";
import { BreakupContents } from "./BreakupContents";
import { ApproachContents } from "./ApproachContents";
import { ReadyContents } from "./ReadyContents";

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
  } else if (totalScroll <= thresholds.ready) {
    if (tabKey === "ready") {
      transform = `translateX(clamp(${
        -thresholds.ready + thresholds.approach
      }px, ${-Math.round(totalScroll) + thresholds.approach}px, 0px))`;
    }
  }
  return { transform };
};

export const TabPanel = ({
  tabKey,
  totalScroll,
  thresholds,
  handleTabClick,
}) => {
  const { viewModel, openCalendly } = useContext(AppContext);

  const Contents = {
    paradox: ParadoxContents,
    breakup: BreakupContents,
    approach: ApproachContents,
    ready: ReadyContents,
  }[tabKey];

  const tabData = viewModel[tabKey];

  let { transform } = transforminator(tabKey, totalScroll, thresholds);

  return (
    <div className="tab smooth-transition" style={{ transform }} id={tabKey}>
      <div className="tab-content">
        <div
          className="title-text editorial-font"
          onClick={() => handleTabClick(tabKey)}
        >
          {tabData.tabTitle}
        </div>
        <div id={`${tabKey}-scroll`} className="body-container">
          {tabKey !== "ready" && (
            <>
              <div className="editorial-font body-title">
                {tabData.bodyTitle}
              </div>
              <div className="body-font body-subtitle">
                {tabData.bodySubtitle}
              </div>
            </>
          )}
          <div className="body-font body-content">
            <Contents />
          </div>
          {tabKey !== "ready" && (
            <button className="editorial-font body-cta" onClick={openCalendly}>
              I am ready
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
