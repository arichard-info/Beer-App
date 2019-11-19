import React from "react";
import styled, { css } from "styled-components";
import { useCalendar } from "./../../state/calendar";
import Month from "./Month";

const Calendar = ({ className }) => {
  const [{ months }] = useCalendar();
  return (
    <div className={className}>
      {months.map((month, key) => (
        <Month id={month.id} key={key} days={month.days} />
      ))}
    </div>
  );
};

export default styled(Calendar)(() => css``);
