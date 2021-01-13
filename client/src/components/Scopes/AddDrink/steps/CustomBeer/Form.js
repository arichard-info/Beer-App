import React, { useState } from "react";
import styled, { css } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Type from "./fields/Type";
import Name from "./fields/Name";
import AlcoholLevel from "./fields/AlcoholLevel";

const Form = ({ className }) => {
  const [fields, setFields] = useState({
    type: "",
    name: "",
    alcohol: null,
  });

  const updateField = (field, value) => {
    setFields((fields) => ({ ...fields, [field]: value }));
  };
  return (
    <form className={className}>
      <p>
        Ajoutes les caractéristiques de ta bière pour un historique plus
        détaillé
      </p>
      <Type
        value={fields.type}
        onChange={(value) => updateField("type", value)}
      />
      <AlcoholLevel
        value={fields.alcohol}
        onChange={(value) => updateField("alcohol", value)}
      />
      <Name
        value={fields.name}
        onChange={(value) => updateField("name", value)}
      />
      <div className="button-wrapper">
        <button type="submit" className="cta">
          Suivant <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </form>
  );
};

export default styled(Form)(
  ({ theme: { colors, device } }) => css`
    max-width: 50rem;
    margin: auto;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    background-color: ${colors.white};

    .button-wrapper {
      display: flex;
      margin-top: 2rem;
    }

    button {
      display: inline-block;
      width: auto;
      margin-left: auto;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }

    @media ${device.gtMobile} {
      max-width: none;
      margin: 0;
      padding-left: 4rem;
      padding-right: 0;
      padding-right: 1rem;
      margin-right: -1rem;
    }
  `
);
