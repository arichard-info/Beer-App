import React from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";

import { completeProfile } from "./../../../utils/api/authentication";
import { useUser } from "./../../../state/authentication";
import Form from "./../../Form";

const CompleteProfile = ({ className }) => {
  const [user, authDispatch] = useUser();
  const history = useHistory();

  const fields = {
    name: {
      field: "textField",
      type: "text",
      placeholder: "Nom / Prénom",
      label: "Nom / Prénom",
      required: true,
      value: user.name
    },
    email: {
      field: "textField",
      type: "email",
      placeholder: "Adresse email",
      label: "Adresse email",
      required: true,
      value: user.email
    }
  };

  const submitForm = async ({ email, name }) => {
    const finalUser = await completeProfile({
      ...user,
      email: email.value,
      name: name.value
    });

    if (finalUser && !finalUser.error) {
      authDispatch({ type: "LOG_IN", value: finalUser });
      history.push("/home");
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
