import React from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import Header from "@/components/Global/PageHeader";
import ProfileOverview from "@/components/Global/ProfileOverview";
import { useSelector, useDispatch } from "react-redux";

const SettingsPage = ({ className }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
    } catch (err) {
      console.log(err);
    }
    dispatch({ type: "user/logOut" });
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
