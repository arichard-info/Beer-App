import React from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";

import { resetPassword } from "@/utils/api/authentication";
import { useUser } from "@/state/authentication";

import Form from "@/components/Global/NewForm";
import PasswordConfirm from "@/components/Global/NewForm/Fields/PasswordConfirm";
import { useFields } from "@/components/Global/NewForm/utils";

const Forgot = ({ className }) => {
  const [, dispatch] = useUser();
  const { token } = useParams();
  const { fields, handleChange } = useFields({
    password: {
      password: "",
      confirm: "",
    },
  });

  const submitForm = async (e, { valid }) => {
    e.preventDefault();
    if (!valid) return;
    const user = await resetPassword(token, {
      password: fields.password.password,
      passwordConfirm: fields.password.confim,
    });
    if (user && !user.error) dispatch({ type: "LOG_IN", value: user });
  };

  return (
    <div className={className}>
      <h1>Nouveau mot de passe</h1>
      <Form onSubmit={submitForm}>
        <PasswordConfirm
          value={fields.password}
          onChange={(v) => handleChange("password", v)}
        />
        <button type="submit" className="cta">
          Confirmer
        </button>
      </Form>
    </div>
  );
};

export default styled(Forgot)(() => css``);
