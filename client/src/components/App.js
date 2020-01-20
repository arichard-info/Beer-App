import React, { useEffect, useState } from "react";
import axios from "axios";

import Router from "./Router";
import { UserProvider, useUser } from "./../state/authentication";
import GlobalStyle from "./Style/GlobalStyle";
import ThemeProvider from "./Style/ThemeProvider";
import Loading from "./pages/Loading";

const App = () => {
  const [user, dispatch] = useUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function checkAuth() {
      const authToken = window.localStorage.getItem("auth_token");
      if (authToken) {
        try {
          const checkToken = await axios.post(
            `/api/verify-token`,
            {},
            { headers: { Authorization: `Bearer ${authToken}` } }
          );
          if (
            checkToken &&
            checkToken.status === 200 &&
            checkToken.data &&
            checkToken.data.user
          ) {
            dispatch({
              type: "INIT",
              value: { user: checkToken.data.user }
            });
          }
        } catch (err) {
          dispatch({ type: "REMOVE" });
          console.error("Invalid user token");
        }
      }

      setLoading(false);
    }
    checkAuth();
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      {loading ? <Loading /> : <Router user={user} />}
    </>
  );
};

export default () => (
  <UserProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </UserProvider>
);
