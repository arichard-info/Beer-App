import React, { useState, lazy, Suspense } from "react";
import styled, { css } from "styled-components";
import Panel from "@/components/Global/Panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

import { updatePassword, update as updateUser } from "@/utils/api/user";

const EmailForm = lazy(() =>
  import("@/components/Scopes/Settings/UserSettings/EmailForm")
);
const NameForm = lazy(() =>
  import("@/components/Scopes/Settings/UserSettings/NameForm")
);
const PasswordForm = lazy(() =>
  import("@/components/Scopes/Settings/UserSettings/PasswordForm")
);

const UserSettings = ({ className, user }) => {
  const dispatch = useDispatch();
  const [selectedSetting, setSelectedSetting] = useState(null);

  const handleClick = (setting) => (e) => {
    setSelectedSetting(setting);
  };

  const handleUserUpdate = (updates) => {
    updateUser(updates)
      .then((user) => {
        dispatch({ type: "user/update", payload: user });
        setSelectedSetting(null);
        window.flash({ message: "Utilisateur mis à jour", timeout: 3000 });
      })
      .catch((err) => {
        window.flash({ message: err.message, timeout: 15000, type: "danger" });
      });
  };

  const handlePasswordUpdate = async (password, confirm) => {
    updatePassword(password, confirm)
      .then(() => {
        setSelectedSetting(null);
        window.flash({ message: "Mot de passe mis à jour", timeout: 3000 });
      })
      .catch((err) => {
        window.flash({ message: err.message, timeout: 3000, type: "danger" });
      });
  };

  const switchPanel = {
    name: {
      component: (user) => (
        <NameForm name={user.name} onSubmit={handleUserUpdate} />
      ),
    },
    email: {
      component: (user) => (
        <EmailForm email={user.email} onSubmit={handleUserUpdate} />
      ),
    },
    password: {
      component: (user) => (
        <PasswordForm
          password={user.password}
          onSubmit={handlePasswordUpdate}
        />
      ),
    },
  };

  return (
    <>
      <div className={className}>
        <div className="row" role="button" onClick={handleClick("name")}>
          <span className="label">Nom</span>
          <span className="value">{user.name}</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className="row" role="button" onClick={handleClick("email")}>
          <span className="label">Email</span>
          <span className="value">{user.email}</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className="row" role="button" onClick={handleClick("password")}>
          <span className="label">Mot de passe</span>
          <span className="value">***</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <Panel
        open={!!selectedSetting}
        childProps={{ selectedSetting }}
        onClose={() => {
          setSelectedSetting(null);
        }}
      >
        {({ selectedSetting }) => (
          <Suspense>{switchPanel[selectedSetting].component(user)}</Suspense>
        )}
      </Panel>
    </>
  );
};

export default styled(UserSettings)(
  () => css`
    .row {
      padding: 1.6rem 0;
      display: flex;
      cursor: pointer;
      align-items: center;
      &:not(:last-child) {
        border-bottom: 0.1rem solid #e6e6e6;
      }
    }
    .label {
      font-weight: 700;
    }
    .value {
      margin-left: auto;
      margin-right: 3.2rem;
      color: #808080;
    }
    svg {
      color: #808080;
    }
    .panelWrapper {
      padding: 1.6rem;
    }
  `
);
