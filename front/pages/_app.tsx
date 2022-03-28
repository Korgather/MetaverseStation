import React, { useEffect } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";
import wrapper, { store } from "@store/configureStore";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { logIn } from "@actions/user";
import axios from "axios";
import AppInner from "@components/AppInner";

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("jwtToken") as string;
  }
  useEffect(() => {
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    });
    dispatch(logIn());
  }, []);

  return (
    <Provider store={store}>
      <AppInner pageProps={pageProps} Component={Component} />
      {/* <Component {...pageProps} /> */}
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
