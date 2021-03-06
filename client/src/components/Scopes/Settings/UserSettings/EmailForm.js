import React from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";

import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import TextInput from "@/components/Global/Form/Fields/TextInput";

import { pattern as emailPattern } from "@/config/email";

const EmailForm = ({ className, email, onSubmit }) => {
  const { register, handleSubmit, formState: { errors = {} } = {} } = useForm();

  const submitForm = async (data, e) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <div className={className}>
      <h2>Email</h2>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <FieldWrapper label="Actuel">
          <p data-nrt="user-email-current">{email}</p>
        </FieldWrapper>
        <FieldWrapper label="Nouveau" error={errors.email} fieldName="email">
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
              },
              validate: (value) =>
                value !== email ||
                "Tu dois renseigner une adresse différente de l'actuelle",
            })}
          />
        </FieldWrapper>
        <button type="submit" className="cta" data-nrt="user-form-submit">
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
