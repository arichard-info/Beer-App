import React, { useState, lazy, Suspense } from "react";
import styled, { css } from "styled-components";
import Panel from "@/components/Global/Panel";

const EmailPanel = lazy(() =>
  import("@/components/Scopes/Settings/UserSettings/EmailPanel")
);
const NamePanel = lazy(() =>
  import("@/components/Scopes/Settings/UserSettings/NamePanel")
);
const PasswordPanel = lazy(() =>
  import("@/components/Scopes/Settings/UserSettings/PasswordPanel")
);

const switchPanel = {
  name: (user) => <NamePanel name={user.name} />,
  email: (user) => <EmailPanel email={user.email} />,
  password: (user) => <PasswordPanel password={user.password} />,
};

const UserSettings = ({ className, user }) => {
  const [selectedSetting, setSelectedSetting] = useState(null);

  const handleClick = (setting) => (e) => {
    setSelectedSetting(setting);
  };

  return (
    <>
      <div className={className}>
        <div className="row" role="button" onClick={handleClick("name")}>
          <span className="label">Nom</span>
          <span>{user.name}</span>
        </div>
        <div className="row" role="button" onClick={handleClick("email")}>
          <span className="label">Email</span>
          <span>{user.email}</span>
        </div>
        <div className="row" role="button" onClick={handleClick("password")}>
          <span className="label">Mot de passe</span>
          <span>***</span>
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
          <Suspense>{switchPanel[selectedSetting](user)}</Suspense>
        )}
      </Panel>
    </>
  );
};

export default styled(UserSettings)(
  () => css`
    .row {
      padding: 1rem 0;
      display: flex;
      justify-content: space-between;
    }
    .label {
      font-weight: 700;
    }
  `
);
