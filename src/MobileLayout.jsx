import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./AppContext";
import { MobileTabPanel } from "./MobileTabPanel";
import "./MobileLayout.css";

export const MobileLayout = () => {
  const { viewModel } = useContext(AppContext);
  const { home, tabKeys } = viewModel;

  return (
    <div className="mobile-layout">
      <div className="home-content editorial-font">
        <div className="home-content-name">
          {home.firstName} {home.lastName}
        </div>
        <div className="home-content-title">
          {home.titleTop} {home.titleBottom}
        </div>
        <img className="home-content-img" src={home.mobileImgSrc} alt="home" />
      </div>
      {tabKeys.map((tabKey) => (
        <MobileTabPanel key={tabKey} tabKey={tabKey} />
      ))}
    </div>
  );
};
