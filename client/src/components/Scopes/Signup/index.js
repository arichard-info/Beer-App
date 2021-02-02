import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { useUser } from "@/state/authentication";
import { signup } from "@/utils/api/authentication";
import Form from "@/components/Global/NewForm";
import FieldWrapper from "@/components/Global/NewForm/FieldWrapper";
import TextInput from "@/components/Global/NewForm/Fields/TextInput";
import PasswordConfirm from "@/components/Global/NewForm/Fields/PasswordConfirm";

const Forgot = ({ className }) => {
  const [, authDispatch] = useUser();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: {
      password: "",
      confirm: "",
    },
  });

  const submitForm = async (e, { valid }) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (valid) {
      const user = await signup({
        name: fields.name,
        email: fields.email,
        password: fields.password.password,
        passwordConfirm: fields.password.confirm,
      });
      if (user && !user.error) authDispatch({ type: "LOG_IN", value: user });
      else {
        console.error("Error when trying to signup", user.message || "");
      }
    }
  };

  const handleChange = (field) => (e) => {
    setFields((fields) => ({ ...fields, [field]: e.target.value }));
  };

  const handlePasswordChange = (value) => {
    setFields((fields) => ({ ...fields, password: value }));
  };

  return (
    <div className={className}>
      <Link to="/">Retour</Link>
      <h1>Créer un compte</h1>
      <Form onSubmit={submitForm}>
        <FieldWrapper fieldName="name" label="Nom / Prénom">
          <TextInput
            name="name"
            type="text"
            rules={{ required: true }}
            placeholder="Nom / Prénom"
            value={fields.name}
            onChange={handleChange("name")}
          />
        </FieldWrapper>
        <FieldWrapper fieldName="email" label="Adresse email">
          <TextInput
            name="email"
            type="text"
            rules={{ required: true, pattern: "email" }}
            placeholder="Adresse email"
            value={fields.email}
            onChange={handleChange("email")}
          />
        </FieldWrapper>
        <PasswordConfirm
          value={fields.password}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="cta">
          Confirmer
        </button>
      </Form>
    </div>
  );
};

export default styled(Forgot)(() => css``);
