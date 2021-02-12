import React from "react";
import styled, { css } from "styled-components";

import BeerType from "./BeerType";
import Form from "@/components/Global/Form";
import TextInput from "@/components/Global/Form/Fields/TextInput";
import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import { useFields } from "@/components/Global/Form/utils";

import Header from "@/components/Scopes/AddDrink/steps/Header";

const CustomBeer = ({ className, setStep, setForm, form }) => {
  const { customBeer: { type = "", name = "", abv = "" } = {} } = form;
  const { fields, handleEventChange, handleChange } = useFields({
    type,
    name,
    abv,
  });

  const handleSubmit = (e, { valid }) => {
    e.preventDefault();
    if (!valid) return;
    setForm((form) => ({ ...form, beer: fields, provider: "user" }));
    setStep((step) => ({ ...step, index: 3 }));
  };

  return (
    <div className={className}>
      <Header
        title="Bière inconnue"
        onBack={() => setStep((step) => ({ ...step, index: 0 }))}
      />
      <Form onSubmit={handleSubmit}>
        <FieldWrapper label="Type de bière" fieldName="type">
          <BeerType
            name="type"
            onChange={(v) => handleChange("type", v)}
            rules={{ required: true }}
            value={fields.type}
          />
        </FieldWrapper>

        <FieldWrapper label="Nom de la bière" fieldName="name" inline>
          <TextInput
            name="name"
            placeholder="Binouze"
            type="text"
            onChange={handleEventChange("name")}
            rules={{ required: true }}
            value={fields.name}
          />
        </FieldWrapper>

        <FieldWrapper label="Degré d'alcool" fieldName="abv" inline>
          <TextInput
            name="abv"
            placeholder="5,0"
            suffix="% vol"
            type="number"
            onChange={handleEventChange("abv")}
            rules={{ required: true }}
            value={fields.abv}
          />
        </FieldWrapper>

        <button type="submit" className="cta">
          Continuer
        </button>
      </Form>
    </div>
  );
};

export default styled(CustomBeer)(
  ({ theme: { colors, device } }) => css`
    form {
      max-width: 50rem;
      margin: auto;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      background-color: ${colors.white};
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
