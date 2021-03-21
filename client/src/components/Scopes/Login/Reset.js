import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";

import { resetPassword } from "@/utils/api/authentication";
import { useUser } from "@/state/authentication";
import { validate as validatePassword } from "@/config/password";

import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import TextInput from "@/components/Global/Form/Fields/TextInput";
import CheckTags from "@/components/Global/Form/CheckTags";

const Forgot = ({ className }) => {
  const [, dispatch] = useUser();
  const { token } = useParams();

  const { register, handleSubmit, errors, watch } = useForm();

  const passwordRef = useRef({});
  const passwordConfirmRef = useRef({});
  passwordRef.current = watch("password", "");
  passwordConfirmRef.current = watch("passwordConfirm", "");

  const submitForm = async (data, e) => {
    e.preventDefault();
    if (!valid) return;
    const user = await resetPassword(token, {
      password: data.password,
      passwordConfirm: data.passwordConfim,
    });
    if (user && !user.error) dispatch({ type: "LOG_IN", value: user });
  };

  return (
    <div className={className}>
      <h1>Nouveau mot de passe</h1>
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <FieldWrapper label="Mot de passe" error={errors.password}>
          <TextInput
            type="password"
            name="password"
            placeholder="Mot de passe"
            ref={register({
              validate: (value) => !validatePassword(value).length,
            })}
            error={!!errors.password}
          />
        </FieldWrapper>
        <FieldWrapper label="Confirmation" error={errors.passwordConfirm}>
          <TextInput
            type="password"
            name="passwordConfirm"
            placeholder="Confirmation"
            ref={register({
              validate: (value) => value && value === passwordRef.current,
            })}
            error={!!errors.passwordConfirm}
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

export default styled(Forgot)(() => css``);
