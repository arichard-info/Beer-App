import React, { useState, lazy, Suspense } from "react";
import styled, { css } from "styled-components";
import Panel from "@/components/Global/Panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
  const [selectedSetting, setSelectedSetting] = useState(null);

  const handleClick = (setting) => (e) => {
    setSelectedSetting(setting);
  };

  const switchPanel = {
    name: {
      component: (user) => <NameForm name={user.name} />,
    },
    email: {
      component: (user) => <EmailForm email={user.email} />,
    },
    password: {
      component: (user) => <PasswordForm password={user.password} />,
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
