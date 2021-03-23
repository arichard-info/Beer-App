import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";

import { getRequest } from "@/utils/api";
import BeerType from "./BeerType";
import TextInput from "@/components/Global/Form/Fields/TextInput";
import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import { useGlobalContext } from "@/state/global";

import Header from "@/components/Global/PageHeader";

const CustomBeer = ({ className, setStep, setForm, form: { beer = {} } }) => {
  const [loading, setLoading] = useState(true);
  const [{ beerTypes }, dispatch] = useGlobalContext();

  const { register, handleSubmit, errors } = useForm();

  const submitForm = (data, e) => {
    e.preventDefault();
    if (loading) return;
    setForm((form) => ({
      ...form,
      beer: {
        ...data,
        family: beerTypes.find((t) => t.slug === data.family),
        provider: "user",
      },
    }));
    setStep((step) => ({ ...step, index: 3 }));
  };

  useEffect(() => {
    if (beerTypes) {
      setLoading(false);
      return;
    }
    const getBeerTypes = async () => {
      setLoading(true);
      const res = await getRequest(`/api/families`);
      dispatch({ type: "ADD_BEER_TYPES", value: res.data });
      setLoading(false);
    };
    getBeerTypes();
  }, [beerTypes]);

  return (
    <div className={className}>
      <Header
        title="Bière inconnue"
        onBack={() => setStep((step) => ({ ...step, index: 0 }))}
      />
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <FieldWrapper label="Type de bière" error={errors.family}>
          <BeerType
            name="family"
            ref={register({ required: "Ce champs est obligatoire" })}
            types={beerTypes}
            loading={loading}
            error={!!errors.family}
          />
        </FieldWrapper>

        <FieldWrapper label="Nom de la bière" error={errors.name} inline>
          <TextInput
            name="name"
            placeholder="Binouze"
            type="text"
            ref={register({ required: "Ce champs est obligatoire" })}
            defaultValue={beer.name}
            error={!!errors.name}
          />
        </FieldWrapper>

        <FieldWrapper label="Degré d'alcool" error={errors.abv} inline>
          <TextInput
            name="abv"
            placeholder="5,0"
            suffix="% vol"
            type="number"
            ref={register({ required: "Ce champs est obligatoire" })}
            defaultValue={beer.abv}
            error={!!errors.abv}
          />
        </FieldWrapper>

        <button type="submit" className="cta">
          Continuer
        </button>
      </form>
    </div>
  );
};

export default styled(CustomBeer)(({ theme: { colors, device } }) => css``);
