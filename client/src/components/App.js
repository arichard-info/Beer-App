import React, { useEffect, useState, Suspense } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import { ContextProvider } from "@/state/global";
import GlobalStyle from "@/components/Layout/Style/GlobalStyle";
import ThemeProvider from "@/components/Layout/Style/ThemeProvider";

import Loading from "@/components/Scopes/Loading";
import Layout from "@/components/Layout";
import Emitter from "@/components/Layout/Flashes/Emitter";

import SwitchRoutes from "@/components/Global/SwitchRoutes";
import routes from "@/components/App.routes";
import initStore from "@/redux/store";

window.flash = (flash) => Emitter.emit("flash", flash);

const App = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const state = useSelector((state) => state);

  console.log(user);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { status, data } = await axios.get(`/api/auth/auth-cookie`);
        if (status === 200 && data && data.user) {
          dispatch({ type: "user/logIn", payload: data.user });
        } else throw new Error("Error while authenticating with cookie");
      } catch (err) {
        dispatch({ type: "user/logOut" });
        console.error("Invalid user token");
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
            <Suspense fallback={<Loading />}>
              <SwitchRoutes routes={routes} />
            </Suspense>
          </Layout>
        </BrowserRouter>
      )}
    </>
  );
};

export default () => {
  const store = initStore();
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </ThemeProvider>
    </Provider>
  );
};
