import React from "react";
import styled, { css } from "styled-components";

import TextField from "@/components/Global/Form/TextField";

const Name = ({ className, field, onChange, showError }) => {
  return (
    <div className={className}>
      <TextField
        validation={showError}
        errors={field.error ? [field.error] : null}
        label="Nom de la bière"
        placeholder="binouze"
        name="beer-name"
        value={field.value}
        onChange={(e) => onChange(e.value)}
        inline
        required
      />
    </div>
  );
};

export default styled(Name)(
  () => css`
    margin-top: 2rem;
  `
);
