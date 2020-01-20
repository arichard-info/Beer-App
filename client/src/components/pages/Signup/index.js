import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "axios";

import { useUser } from "./../../../state/authentication";
import { formReducer } from "./../../../utils/form";

const initialFields = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: ""
};

const Forgot = ({ className }) => {
  const [, authDispatch] = useUser();
  const [fields, formDispatch] = useReducer(formReducer, initialFields);
  const { name, email, password, passwordConfirm } = fields;

  const onChange = e =>
    formDispatch({ field: e.target.name, value: e.target.value });

  const submitForm = async e => {
    e.preventDefault();
    const response = await axios.post(`/api/register`, {
      name,
      email,
      password,
      "password-confirm": passwordConfirm
    });
    if (response.status === 200 && response.data && response.data.user) {
      const { user, token } = response.data;
      authDispatch({ type: "LOG_IN", value: { user, token } });
    } else {
      console.error("Error while trying to signup");
    }
  };
  return (
    <div className={className}>
      <div className="form-row">
        <Link to="/">Retour</Link>
      </div>
      <form onSubmit={submitForm}>
        <div className="form-row">
          <label htmlFor="name">Prénom / Nom</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nom"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="username">Adresse email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Addresse email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="username">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="username">Confirmation du mot de passe</label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="passwordConfirm"
            placeholder="Confirmation"
            value={passwordConfirm}
            onChange={onChange}
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
