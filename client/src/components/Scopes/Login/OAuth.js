import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OAuth = ({ socket, provider }) => {
  const openProvider = () => {
    window.location = `/api/auth/${provider.id}?socketId=${socket.id}`;
  };

  const startAuth = e => {
    openProvider();
  };

  return (
    <button onClick={startAuth} className={`${provider.id} cta bg-grey`}>
      <FontAwesomeIcon icon={provider.icon} />
      Continuer avec {provider.name}
    </button>
  );
};

export default OAuth;
