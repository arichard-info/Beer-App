import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "axios";

const Forgot = ({ className }) => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const submitForm = async e => {
    e.preventDefault();
    const response = await axios.post(`/api/account/forgot`, { email });
    if (
      response.status === 200 &&
      response.data &&
      response.data.error !== true
    ) {
      history.push("/login", { message: "Email has been sent" });
    } else {
      if (response.data && response.data.message)
        console.error(response.data.message);
      else console.error("Error when trying to send email");
      // TODO : Log error to user
    }
  };
  return (
    <div className={className}>
      <div className="form-row">
        <Link to="/login">Retour</Link>
      </div>
      <form onSubmit={submitForm}>
        <div className="form-row">
          <label htmlFor="username">Adresse email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Addresse email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
