import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { completeProfile } from "./../../../utils/api/authentication";
import { useUser } from "./../../../state/authentication";
import { formReducer } from "./../../../utils/form";

const Forgot = ({ className }) => {
  const [user, authDispatch] = useUser();

  const initialFields = { name: user.name, email: user.email };
  const [fields, formDispatch] = useReducer(formReducer, initialFields);
  const { name, email } = fields;

  const onChange = e =>
    formDispatch({ field: e.target.name, value: e.target.value });

  const submitForm = async e => {
    e.preventDefault();
    const finalUser = await completeProfile({ ...user, email, name });
    if (finalUser && !finalUser.error)
      authDispatch({ type: "LOG_IN", value: finalUser });
    else {
      authDispatch({ type: "REMOVE" });
      console.error("Invalid user");
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
