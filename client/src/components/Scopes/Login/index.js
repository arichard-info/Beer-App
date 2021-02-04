import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { useUser } from "@/state/authentication";
import { login } from "@/utils/api/authentication";
import OAuth from "./OAuth";

import Form from "@/components/Global/Form";
import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import TextInput from "@/components/Global/Form/Fields/TextInput";
import { useFields } from "@/components/Global/Form/utils";

const LoginPage = ({ className }) => {
  const providers = [{ id: "google", name: "Google", icon: faGoogle }];
  const { fields, handleEventChange } = useFields({ email: "", password: "" });
  const [, dispatch] = useUser();

  const handleSubmit = async (e, { valid }) => {
    e.preventDefault();
    if (!valid) return;
    const user = await login(fields.email, fields.password);
    if (user && !user.error) {
      dispatch({ type: "LOG_IN", value: user });
      window.flash({ message: "Tu es maintenant connecté !", timeout: 3000 });
    } else
      window.flash({
        message: "Erreur lors de la connexion :/",
        type: "danger",
        timeout: 5000,
      });
  };

  return (
    <div className={className}>
      <h1>Connexion</h1>
      <Form dataNrt="login-form" onSubmit={handleSubmit}>
        <FieldWrapper fieldName="email" label="Adresse email">
          <TextInput
            name="email"
            type="email"
            rules={{ required: true, pattern: "email" }}
            placeholder="Adresse email"
            value={fields.email}
            onChange={handleEventChange("email")}
          />
        </FieldWrapper>
        <FieldWrapper fieldName="password" label="Mot de passe">
          <TextInput
            name="password"
            type="password"
            rules={{ required: true }}
            placeholder="Mot de passe"
            value={fields.password}
            onChange={handleEventChange("password")}
          />
        </FieldWrapper>

        <Link className="forgot" to="/login/forgot">
          Mot de passe oublié ?
        </Link>

        <button type="submit" className="cta">
          Connexion
        </button>
      </Form>

      <div className="sep">
        <span>ou</span>
      </div>

      <div className="others">
        <Link to="/signup" className="cta bg-grey" data-nrt="signup-cta">
          Créer un compte
        </Link>
        {providers.map((provider) => (
          <OAuth provider={provider} key={provider} />
        ))}
      </div>
    </div>
  );
};

export default styled(LoginPage)(
  ({ theme: { colors } }) => css`
    .others {
      .cta {
        margin: 1.5rem 0;
      }
    }
    .forgot {
      font-size: 1.4rem;
      color: ${colors.linkSecond};
      margin-top: 0.75rem;
      display: block;
      margin-bottom: 1.6rem;
    }
    .sep {
      display: flex;
      justify-content: center;
      position: relative;
      margin: 3rem 0;
      span {
        background-color: ${colors.white};
        font-size: 1.4rem;
        display: inline-block;
        position: relative;
        z-index: 1;
        padding: 0 0.8rem;
      }
      &:after {
        content: "";
        z-index: 0;
        position: absolute;
        top: 50%;
        width: 100%;
        border-bottom: 0.1rem solid ${colors.formBorder};
      }
    }
  `
);
