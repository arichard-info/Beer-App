import React from "react";
import styled, { css } from "styled-components";

import { Link } from "react-router-dom";

const Nav = ({ className }) => {
  return (
    <div className={className}>
      <nav>
        <ul>
          <li>
            <Link to="/">Calendrier</Link>
          </li>
          <li>
            <Link to="/profile">Stats</Link>
          </li>
          <li>
            <Link to="/settings">Paramètres</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default styled(Nav)(() => css``);
