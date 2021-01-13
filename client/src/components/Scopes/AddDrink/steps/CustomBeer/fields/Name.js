import React from "react";
import styled, { css } from "styled-components";

import TextField from "@/components/Global/Form/TextField";

const Name = ({ className, value, onChange }) => {
  return (
    <div className={className}>
      <TextField
        label="Nom de la bière"
        placeholder="binouze"
        name="beer-name"
        value={value}
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
