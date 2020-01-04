import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "axios";

import { useUser } from "./../../state/authentication";

const Forgot = ({ className }) => {
  const [, dispatch] = useUser();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const submitForm = async e => {
    e.preventDefault();
    const response = await axios.post(`/api/account/reset/${token}`, {
      password,
      "password-confirm": passwordConfirm
    });
    if (
      response.status === 200 &&
      response.data &&
      response.data.user &&
      response.data.token
    ) {
      const { user, token } = response.data;
      dispatch({ type: "LOG_IN", value: { user, token } });
    } else {
      if (response.data && response.data.message)
        console.error(response.data.message);
      else console.error("Error when trying to send email");
      // TODO : Log error to user
    }
  };
  return (
    <div className={className}>
      <form onSubmit={submitForm}>
        <div className="form-row">
          <label htmlFor="password">Nouveau mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password-confirm">Confirmation du mot de passe</label>
          <input
            id="password-confirm"
            name="password-confirm"
            type="password"
            placeholder="Confirmation du mot de passe"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className="form-row">
          <input type="submit" value="Envoyer" />
        </div>
      </form>
    </div>
  );
};

export default styled(Forgot)(
  () => css`
    height: 100%;
    max-width: 600px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    label {
      display: block;
    }
    .form-row {
      margin: 0.4rem 0;
    }
  `
);
