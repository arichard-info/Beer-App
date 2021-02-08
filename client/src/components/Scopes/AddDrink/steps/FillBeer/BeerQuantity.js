import React, { useState } from "react";
import styled, { css } from "styled-components";
import BeerIcon from "@/components/Global/BeerIcon";

const BeerQuantity = () => {
  const [level, setLevel] = useState(450);
  return <BeerIcon fill={0.5} />;
};

export default styled(BeerQuantity)(() => css``);
