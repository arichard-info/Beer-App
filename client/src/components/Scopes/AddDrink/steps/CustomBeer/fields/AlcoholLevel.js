import React from "react";
import styled, { css } from "styled-components";

import TextField from "@/components/Global/Form/TextField";

const AlcoholLevel = ({ className, field, onChange, showError }) => {
  return (
    <div className={className}>
      <TextField
        validation={showError}
        errors={field.error ? [field.error] : null}
        label="Degré d'alcool"
        type="number"
        value={field.value}
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
