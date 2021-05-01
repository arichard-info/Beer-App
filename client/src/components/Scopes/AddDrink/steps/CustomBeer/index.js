import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { getRequest } from "@/utils/api";
import BeerType from "./BeerType";
import TextInput from "@/components/Global/Form/Fields/TextInput";
import FieldWrapper from "@/components/Global/Form/FieldWrapper";

import PageHeader from "@/components/Global/PageHeader";

const CustomBeer = ({ className, setStep, setForm, form: { beer = {} } }) => {
  const beerFamilies = useSelector(({ beers = {} } = {}) => beers.families);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, formState: { errors = {} } = {} } = useForm();

  const submitForm = (data, e) => {
    e.preventDefault();
    if (loading) return;
    setForm((form) => ({
      ...form,
      beer: {
        ...data,
        family: beerFamilies.find((t) => t.slug === data.family),
        provider: "user",
      },
    }));
    setStep((step) => ({ ...step, index: 3 }));
  };

  useEffect(() => {
    if (beerFamilies) {
      setLoading(false);
      return;
    }
    const getBeerTypes = async () => {
      setLoading(true);
      const res = await getRequest(`/api/families`);
      dispatch({ type: "beers/setFamilies", payload: res.data });
      setLoading(false);
    };
    getBeerTypes();
  }, [beerFamilies]);

  return (
    <div className={className}>
      <PageHeader
        title="Bière inconnue"
        onBack={() => setStep((step) => ({ ...step, index: 0 }))}
        sticky
      />
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <FieldWrapper label="Type de bière" error={errors && errors.family}>
          <BeerType
            types={beerFamilies}
            loading={loading}
            error={!!errors.family}
            {...register("family", { required: "Ce champs est obligatoire" })}
          />
        </FieldWrapper>

        <FieldWrapper label="Nom de la bière" error={errors.name} inline>
          <TextInput
            name="name"
            placeholder="Binouze"
            type="text"
            defaultValue={beer.name}
            error={!!errors.name}
            {...register("name", { required: "Ce champs est obligatoire" })}
          />
        </FieldWrapper>

        <FieldWrapper label="Degré d'alcool" error={errors.abv} inline>
          <TextInput
            name="abv"
            placeholder="5,0"
            suffix="% vol"
            type="number"
            defaultValue={beer.abv}
            error={!!errors.abv}
            {...register("abv", { required: "Ce champs est obligatoire" })}
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
