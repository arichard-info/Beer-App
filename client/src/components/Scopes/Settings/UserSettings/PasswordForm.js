import React, { useRef } from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";

import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import TextInput from "@/components/Global/Form/Fields/TextInput";

import { validate as validatePassword } from "@/config/password";
import CheckTags from "@/components/Global/Form/CheckTags";

const PasswordPanel = ({ className }) => {
  const {
    register,
    handleSubmit,
    formState: { errors = {} } = {},
    watch,
  } = useForm();

  const passwordRef = useRef({});
  const passwordConfirmRef = useRef({});
  passwordRef.current = watch("password", "");
  passwordConfirmRef.current = watch("passwordConfirm", "");

  const submitForm = async (data, e) => {};
  return (
    <div className={className}>
      <h2>Mot de passe</h2>
      <form onSubmit={handleSubmit(submitForm)}>
        <FieldWrapper label="Nouveau mot de passe" error={errors.password}>
          <TextInput
            type="password"
            placeholder="Mot de passe"
            name="password"
            error={!!errors.password}
            data-nrt="input-password"
            {...register("password", {
              validate: (value) => !validatePassword(value).length,
            })}
          />
        </FieldWrapper>
        <FieldWrapper label="Confirmation" error={errors.passwordConfirm}>
          <TextInput
            type="password"
            placeholder="Confirmation"
            name="passwordConfirm"
            data-nrt="input-passwordconfirm"
            error={!!errors.passwordConfirm}
            {...register("passwordConfirm", {
              validate: (value) => value && value === passwordRef.current,
            })}
          />
        </FieldWrapper>
        <CheckTags
          password={passwordRef.current}
          confirm={passwordConfirmRef.current}
        />
        <button type="submit" className="cta">
          Confirmer
        </button>
      </form>
    </div>
  );
};

export default styled(PasswordPanel)(() => css``);
