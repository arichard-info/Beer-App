import React, { useState } from "react";
import styled, { css } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Type from "./fields/Type";
import Name from "./fields/Name";
import AlcoholLevel from "./fields/AlcoholLevel";

const Form = ({ className, onSubmitBeer, beer = {} }) => {
  const [fields, setFields] = useState({
    type: {
      value: beer.type || "",
      error: !beer.type && "Ce champs est requis",
    },
    name: {
      value: beer.name || "",
      error: !beer.name && "Ce champs est requis",
    },
    alcohol: {
      value: beer.alcohol || "",
      error: !beer.alcohol && "Ce champs est requis",
    },
  });

  const [trySubmit, setTrySubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrySubmit(true);

    if (!fields.type.error && !fields.name.error && !fields.alcohol.error) {
      onSubmitBeer({
        type: fields.type.value,
        name: fields.name.value,
        alcohol: fields.alcohol.value,
      });
    } else {
      window.flash({
        message: "Un des champs est incorrect",
        timeout: 5000,
        type: "danger",
      });
    }
  };

  const updateField = (field, value) => {
    let error = false;
    if (!value) error = "Ce champs est requis";
    setFields((fields) => ({
      ...fields,
      [field]: {
        value,
        error,
      },
    }));
  };
  return (
    <form className={className} onSubmit={handleSubmit} noValidate>
      <p>
        Ajoutes les caractéristiques de ta bière pour un historique plus
        détaillé
      </p>
      <Type
        field={fields.type}
        onChange={(value) => updateField("type", value)}
        showError={trySubmit}
      />
      <AlcoholLevel
        field={fields.alcohol}
        onChange={(value) => updateField("alcohol", value)}
        showError={trySubmit}
      />
      <Name
        field={fields.name}
        onChange={(value) => updateField("name", value)}
        showError={trySubmit}
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
