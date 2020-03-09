import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import { UserProvider, useUser } from "@/state/authentication";
import GlobalStyle from "@/components/Style/GlobalStyle";
import ThemeProvider from "@/components/Style/ThemeProvider";

import Loading from "@/components/pages/Loading";
import Layout from "@/components/Layout";
import Emitter from "@/components/Flashes/Emitter";

import SwitchRoutes from "@/components/SwitchRoutes";
import routes from "@/components/App.routes";

window.flash = flash => Emitter.emit("flash", flash);

const App = () => {
  const [user, dispatch] = useUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function checkAuth() {
      const authToken = window.localStorage.getItem("auth_token");
      if (authToken) {
        try {
          const { status, data } = await axios.post(
            `/api/auth/verify-token`,
            {},
            { headers: { Authorization: `Bearer ${authToken}` } }
          );
          if (status === 200 && data && data.user) {
            dispatch({
              type: "INIT",
              value: data.user
            });
          } else throw new Error("Error when checking token");
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
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Layout loggedIn={user && !user.toComplete}>
            <SwitchRoutes routes={routes} />
          </Layout>
        </BrowserRouter>
      )}
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
