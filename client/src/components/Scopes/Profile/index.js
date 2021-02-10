import React, { useState } from "react";
import styled, { css } from "styled-components";

import RangeSlider from "@/components/Global/RangeSlider";

const ProfilePage = ({ className }) => {
  const [value, setValue] = useState(25);
  return (
    <div className={className}>
      <h1>Profile page</h1>
      <div style={{ height: "20rem" }}>
        <RangeSlider min={10} max={120} value={value} onChange={setValue} />
      </div>
    </div>
  );
};

export default styled(ProfilePage)(
  () => css`
    padding-left: 1.5rem;
  `
);
