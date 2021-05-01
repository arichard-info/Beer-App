import React from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";

import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import TextInput from "@/components/Global/Form/Fields/TextInput";

const NamePanel = ({ className, name }) => {
  const { register, handleSubmit, formState: { errors = {} } = {} } = useForm();

  const submitForm = async (data, e) => {};

  return (
    <div className={className}>
      <h2>Nom d'utilisateur</h2>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <FieldWrapper label="Actuel">
          <p>{name}</p>
        </FieldWrapper>
        <FieldWrapper label="Nouveau" error={errors.name}>
          <TextInput
            name="name"
            placeholder="Nom / Prénom"
            error={!!errors.name}
            {...register("name", {
              required: "Tu dois remplir ce champs",
              validate: (value) =>
                value !== name ||
                "Tu dois renseigner un nom d'utilisateur différent de l'actuel",
            })}
          />
        </FieldWrapper>
        <button type="submit" className="cta">
          Confirmer
        </button>
      </form>
    </div>
  );
};

export default styled(NamePanel)(
  () => css`
    p {
      margin: 0;
    }
  `
);
