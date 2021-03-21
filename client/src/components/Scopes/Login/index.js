import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";

import OAuth from "./OAuth";
import { useUser } from "@/state/authentication";
import { login } from "@/utils/api/authentication";
import { pattern as emailPattern } from "@/config/email";

import FieldWrapper from "@/components/Global/Form/FieldWrapper";
import TextInput from "@/components/Global/Form/Fields/TextInput";

const LoginPage = ({ className }) => {
  const providers = [{ id: "google", name: "Google", icon: faGoogle }];
  const [, dispatch] = useUser();

  const { register, handleSubmit, errors } = useForm();

  const submitForm = async (data, e) => {
    e.preventDefault();
    const user = await login(data.email, data.password);
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
      <form data-nrt="login-form" onSubmit={handleSubmit(submitForm)}>
        <FieldWrapper label="Email" error={errors.email}>
          <TextInput
            name="email"
            placeholder="Email"
            ref={register({
              required: "Ce champs est obligatoire",
              pattern: {
                value: emailPattern,
                message: "Tu dois renseigner une adresse email valide",
              },
            })}
            error={!!errors.email}
          />
        </FieldWrapper>
        <FieldWrapper label="Mot de passe" error={errors.password}>
          <TextInput
            placeholder="Mot de passe"
            type="password"
            name="password"
            ref={register({
              required: "Ce champs est obligatoire",
            })}
            error={!!errors.password}
          />
        </FieldWrapper>

        <Link className="forgot" to="/login/forgot">
          Mot de passe oublié ?
        </Link>

        <button type="submit" className="cta">
          Connexion
        </button>
      </form>

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
