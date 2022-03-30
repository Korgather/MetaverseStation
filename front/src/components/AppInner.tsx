import { loadMyInfo, logIn } from "@actions/user";
import wrapper, { store } from "@store/configureStore";
import axios from "axios";
import { NextComponentType, NextPageContext } from "next";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

type Props = {
  pageProps: any;
  Component: NextComponentType<NextPageContext<any>, any, {}>;
};

const AppInner = ({ pageProps, Component }: Props) => {
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
    dispatch(loadMyInfo());
  }, []);
  return <Component {...pageProps} />;
};

export default AppInner;

// export const getServerSideProps = wrapper.getServerSideProps(() => async (ctx) => {
//   await store.dispatch(loadMyInfo());
//   return { props: {} };
// });
