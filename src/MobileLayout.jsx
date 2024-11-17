import { useContext } from "react";
import { AppContext } from "./AppContext";

export const MobileLayout = () => {
  const { openCalendly } = useContext(AppContext);

  return (
    <div>
      <div>Mobile Layout!</div>
      <button onClick={openCalendly}>Calendly!</button>
    </div>
  );
};
