import React from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";

import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import TextInput from "@/components/Global/Form/Fields/TextInput";

import { pattern as emailPattern } from "@/config/email";

const EmailForm = ({ className, email }) => {
  const { register, handleSubmit, formState: { errors = {} } = {} } = useForm();

  const submitForm = async (data, e) => {};

  return (
    <div className={className}>
      <h2>Email</h2>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <FieldWrapper label="Actuel">
          <p>{email}</p>
        </FieldWrapper>
        <FieldWrapper label="Nouveau" error={errors.email}>
          <TextInput
            name="email"
            placeholder="Email"
            type="email"
            error={!!errors.email}
            {...register("email", {
              required: "Tu dois remplir ce champs",
              pattern: {
                value: emailPattern,
                message: "Tu dois renseigner une adresse email valide",
                validate: (value) =>
                  value !== email ||
                  "Tu dois renseigner une adresse différente de l'actuelle",
              },
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

export default styled(EmailForm)(
  () => css`
    p {
      margin: 0;
    }
  `
);
