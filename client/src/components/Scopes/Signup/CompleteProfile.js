import React from "react";
import styled, { css } from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useUser } from "@/state/authentication";
import { completeProfile } from "@/utils/api/authentication";
import Form from "@/components/Global/Form";

const CompleteProfile = ({ className }) => {
  const [, authDispatch] = useUser();
  let location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const name = params.get("name") || "";
  const email = params.get("email") || "";

  const fields = {
    name: {
      field: "textField",
      type: "text",
      placeholder: "Nom / Prénom",
      label: "Nom / Prénom",
      required: true,
      value: name
    },
    email: {
      field: "textField",
      type: "email",
      placeholder: "Adresse email",
      label: "Adresse email",
      required: true,
      value: email
    }
  };

  const submitForm = async ({ email, name }) => {
    const finalUser = await completeProfile({
      email: email.value,
      name: name.value
    });

    if (finalUser && !finalUser.error) {
      authDispatch({ type: "LOG_IN", value: finalUser });
    } else {
      authDispatch({ type: "REMOVE" });
      history.push("/");
      console.error("Invalid user");
    }
  };

  return (
    <div className={className}>
      <h1>Compléter le profil</h1>
      <Form fields={fields} onValidSubmit={submitForm} />
    </div>
  );
};

export default styled(CompleteProfile)(() => css``);
