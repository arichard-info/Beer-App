import React from "react";
import styled, { css } from "styled-components";

import TextField from "@/components/Global/Form/TextField";

const AlcoholLevel = ({ className, value, onChange }) => {
  return (
    <div className={className}>
      <TextField
        label="Degré d'alcool"
        type="number"
        value={value}
        onChange={(e) => onChange(e.value)}
        placeholder="5,0"
        suffix="% vol"
        name="beer-alcohol"
        inline
        required
      />
    </div>
  );
};

export default styled(AlcoholLevel)(
  () => css`
    margin-top: 2rem;
    .input-wrapper {
      width: 33.33%;
    }
  `
);
