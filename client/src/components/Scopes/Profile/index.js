import React from "react";
import styled, { css } from "styled-components";

import RangeSlider from "@/components/Global/RangeSlider";

const ProfilePage = ({ className }) => {
  return (
    <div className={className}>
      <h1>Profile page</h1>
      <div>
        <RangeSlider />
      </div>
    </div>
  );
};

export default styled(ProfilePage)(() => css``);
