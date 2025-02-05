import { useState, useEffect } from "react";
import "./App.css";
import { MobileLayout } from "./MobileLayout";
import { DesktopLayout } from "./DesktopLayout";
import { AppContext } from "./AppContext";
import { viewModel } from "./viewModel";
import { DesktopModal } from "./DesktopModal";
import { MobileModal } from "./MobileModal";
import { useFontLoader } from "./useFontLoader";

const MOBILE_THRESH = 1060;

const isMobileOrTouch = () => {
  return window.innerWidth < MOBILE_THRESH || window.matchMedia("(pointer: coarse)").matches
}

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [isMobileView, setIsMobileView] = useState(isMobileOrTouch());
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const fontLoaded = useFontLoader('EditorialNew')

  const showingModal = termsOpen || privacyOpen;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const updateSize = () => {
      setIsMobileView(isMobileOrTouch());
    };
    window.addEventListener("resize", updateSize);
    updateSize();

    if (window.location.host === "elizabethaldana.coach") {
      window.location.href = "https://breakupartist.coach"
    }

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const openCalendly = () => {
    window
      .open("https://calendly.com/elizabethaldana/15-minute-call", "_blank")
      .focus();
  };

  const openLinkedIn = () => {
    window.open("https://www.linkedin.com/in/witheaa/", "_blank").focus();
  };

  const openEmail = () => {
    window.open("mailto:hello@breakupartist.coach");
  }

  const contextValue = {
    toggleTheme,
    openCalendly,
    openLinkedIn,
    openEmail,
    setTermsOpen,
    setPrivacyOpen,
    showingModal,
    viewModel,
    isMobileView,
  };

  const Layout = isMobileView ? MobileLayout : DesktopLayout;

  if (!fontLoaded) return null

  return (
    <AppContext.Provider value={contextValue}>
      {termsOpen && !isMobileView && <DesktopModal modalKey="terms" />}
      {termsOpen && isMobileView && <MobileModal modalKey="terms" />}
      {privacyOpen && !isMobileView && <DesktopModal modalKey="privacy" />}
      {privacyOpen && isMobileView && <MobileModal modalKey="privacy" />}
      <Layout />
    </AppContext.Provider>
  );
};

export default App;
