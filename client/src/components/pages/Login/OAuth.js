import React, { useEffect, useState } from "react";

import { useUser } from "./../../../state/authentication";

const OAuth = ({ socket, provider }) => {
  const [, dispatch] = useUser();
  const [popup, setPopup] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    socket.on(provider, ({ user, token, error, message }) => {
      if (popup) popup.close();
      if (user && token) dispatch({ type: "LOG_IN", value: { user, token } });
    });
  }, [popup, provider, socket, dispatch]);

  const checkPopup = () => {
    const check = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        setDisabled(false);
      }
    }, 1000);
  };

  const openPopup = () => {
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `/api/auth/${provider}?socketId=${socket.id}`;

    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  };

  const startAuth = e => {
    if (!disabled) {
      e.preventDefault();
      const opennedPopup = openPopup();
      setPopup(opennedPopup);
      setDisabled(true);
      checkPopup();
    }
  };

  return (
    <div>
      <button
        onClick={startAuth}
        disabled={disabled}
        className={`${provider} button`}
      >
        Connect with {provider}
      </button>
    </div>
  );
};

export default OAuth;
