import React from "react";
import styled, { css } from "styled-components";

import Header from "@/components/Scopes/AddDrink/steps/Header";
import Form from "@/components/Scopes/AddDrink/steps/CustomBeer/Form";

const CustomBeer = ({ className, setStep, setForm, form }) => {
  const handleSubmit = (fields) => {
    setForm((form) => ({ ...form, customBeer: fields, beer: null }));
    setStep((step) => ({ ...step, index: 3 }));
  };

  return (
    <div className={className}>
      <Header
        title="Bière inconnue"
        onBack={() => setStep((step) => ({ ...step, index: 0 }))}
      />
      <Form onSubmitBeer={handleSubmit} beer={form.customBeer} />
    </div>
  );
};

export default styled(CustomBeer)(() => css``);
