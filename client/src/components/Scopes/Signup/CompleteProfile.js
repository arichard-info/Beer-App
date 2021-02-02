import React from "react";
import styled, { css } from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useUser } from "@/state/authentication";
import { completeProfile } from "@/utils/api/authentication";

import Form from "@/components/Global/NewForm";
import FieldWrapper from "@/components/Global/NewForm/FieldWrapper";
import TextInput from "@/components/Global/NewForm/Fields/TextInput";
import { useFields } from "@/components/Global/NewForm/utils";

const CompleteProfile = ({ className }) => {
  const [, authDispatch] = useUser();
  let location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const name = params.get("name") || "";
  const email = params.get("email") || "";

  const { fields, handleEventChange } = useFields({
    name,
    email,
  });

  const submitForm = async (e, { valid }) => {
    e.preventDefault();
    if (valid) {
      const finalUser = await completeProfile({
        email: fields.email,
        name: fields.name,
      });

      if (finalUser && !finalUser.error) {
        authDispatch({ type: "LOG_IN", value: finalUser });
      } else {
        authDispatch({ type: "REMOVE" });
        history.push("/");
        console.error("Invalid user");
      }
    }
  };

  return (
    <div className={className}>
      <h1>Compléter le profil</h1>
      <Form onSubmit={submitForm}>
        <FieldWrapper fieldName="name" label="Nom / Prénom">
          <TextInput
            name="name"
            type="text"
            rules={{ required: true }}
            placeholder="Nom / Prénom"
            value={fields.name}
            onChange={handleEventChange("name")}
          />
        </FieldWrapper>
        <FieldWrapper fieldName="email" label="Adresse email">
          <TextInput
            name="email"
            type="text"
            rules={{ required: true, pattern: "email" }}
            placeholder="Adresse email"
            value={fields.email}
            onChange={handleEventChange("email")}
          />
        </FieldWrapper>
        <button type="submit" className="cta">
          Confirmer
        </button>
      </Form>
    </div>
  );
};

export default styled(CompleteProfile)(() => css``);
