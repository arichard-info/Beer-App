import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";

import PageHeader from "@/components/Global/PageHeader";
import ProfileOverview from "@/components/Global/ProfileOverview";
import UserSettings from "./UserSettings";

import { renderDate } from "@/utils/date";
import { short as shortDate } from "@/utils/date.conf";

const SettingsPage = ({ className }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
    } catch (err) {
      console.error(err);
    }
    dispatch({ type: "user/logOut" });
  };
  return (
    <>
      <PageHeader title="Paramètres" back={false} sticky />
      <div className={className}>
        <ProfileOverview
          name={user.name}
          image={user.image}
          className="profile"
        >
          <span className="date" data-nrt="profile-overview-date">
            Inscrit le{" "}
            {(user.registerDate && renderDate(user.registerDate, shortDate)) ||
              "--/--/----"}
          </span>
        </ProfileOverview>
        <h2>Compte et connexion</h2>
        <UserSettings user={user} />
        <h2>Réseaux sociaux</h2>
        <h2>Actions</h2>
        <button className="cta" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </>
  );
};

export default styled(SettingsPage)(
  () => css`
    h2 {
      margin-top: 3.2rem;
    }
    .profile {
      .date {
        color: #999999;
      }
    }
  `
);
