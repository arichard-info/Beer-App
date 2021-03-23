import React from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import Header from "@/components/Global/PageHeader";
import ProfileOverview from "@/components/Global/ProfileOverview";

import { useUser } from "@/state/authentication";

const SettingsPage = ({ className }) => {
  const [user, dispatch] = useUser();
  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
    } catch (err) {
      console.log(err);
    }
    dispatch({ type: "LOG_OUT" });
  };
  return (
    <>
      <Header title="Paramètres" back={false} />
      <div className={className}>
        <ProfileOverview
          name={user.name}
          image={user.image}
          date={user.creationDate}
          className="profile"
        >
          <span className="date">
            Inscrit le {user.creationDate || "??/??/????"}
          </span>
        </ProfileOverview>
        <button onClick={handleLogout}>Déconnexion</button>
      </div>
    </>
  );
};

export default styled(SettingsPage)(
  () => css`
    .profile {
      .date {
        color: #999999;
      }
    }
  `
);
