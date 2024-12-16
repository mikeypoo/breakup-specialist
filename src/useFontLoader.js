import { useState, useEffect } from "react";

export const useFontLoader = (fontName) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const checkFont = async () => {
      if ("fonts" in document) {
        try {
          await document.fonts.load(`1em ${fontName}`);
          setFontLoaded(true);
        } catch (err) {
          console.error(`Failed to load font: ${fontName}`, err);
          setFontLoaded(true); // Fallback to render the content anyway
        }
      } else {
        // Font Loading API not supported
        console.warn("Font Loading API is not supported in this browser.");
        setFontLoaded(true);
      }
    };

    checkFont();
  }, [fontName]);

  return fontLoaded;
};
