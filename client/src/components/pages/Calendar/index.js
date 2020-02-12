import React from "react";
import { CalendarProvider } from "./../../../state/calendar";

import SwitchRoutes from "./../../SwitchRoutes";
import routes from "./Calendar.routes";

const CalendarPages = () => {
  return (
    <CalendarProvider>
      <SwitchRoutes nested routes={routes} />
    </CalendarProvider>
  );
};

export default CalendarPages;
