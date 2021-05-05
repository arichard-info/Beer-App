import React from "react";
import styled, { css } from "styled-components";
import fallbackImage from "./profile-placeholder.png";

const ProfileOverview = ({ className, image, name, children }) => {
  return (
    <div className={className}>
      <img src={image || fallbackImage} alt={name} />
      <div className="content">
        <span className="name">{name}</span>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

export default styled(ProfileOverview)(
  ({ theme: { colors, device } }) => css`
    display: flex;
    margin-bottom: 1.5rem;
    img {
      width: 7rem;
      height: 7rem;
      border-radius: 7rem;
      border: 0.5rem solid ${colors.white};
      box-shadow: 0 0.5rem 0.4rem 0 rgba(0, 0, 0, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
    }
    .content {
      padding-left: 2rem;
      padding-top: 1rem;
    }
    .name {
      font-weight: 700;
      margin-bottom: 0.5rem;
      display: block;
    }

    .date {
    }

    @media ${device.gtMobile} {
      .name {
        font-size: 1.8rem;
      }
    }
  `
);
