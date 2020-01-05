import React, { useEffect, useState } from "react";

const OAuth = ({ socket, provider }) => {
  const [popup, setPopup] = useState(null);
  const [user, setUser] = useState({});
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    socket.on(provider, user => {
      if (popup) popup.close();
      console.log(user);
      setUser(user);
    });
  }, [popup, provider, socket]);

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
    const url = `http://localhost:3000/api/auth/${provider}?socketId=${socket.id}`;

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
      checkPopup();
      setDisabled(true);
    }
  };

  return (
    <div>
      {user && user.name ? (
        <div className="card">
          <img width="50" height="50" src={user.picture} alt={user.name} />
          <h4>{user.name}</h4>
        </div>
      ) : (
        <div className="button-wrapper fadein-fast">
          <button
            onClick={startAuth}
            className={`${provider} ${disabled} button`}
          >
            Sign up with {provider}
          </button>
        </div>
      )}
    </div>
  );
};

export default OAuth;
