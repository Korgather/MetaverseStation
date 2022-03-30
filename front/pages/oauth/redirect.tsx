import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@store/hook";
import { useCookies } from "react-cookie";

type Props = {};

function redirect({}: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = router.query.token;
  const setCookie = useCookies(["Token"])[1];
  useEffect(() => {
    if (token) {
      // localStorage.setItem("jwtToken", token as string);
      setCookie("Token", token, { path: "/" });
    }
    router.push("/");
  }, [token]);
  return <div>redirect</div>;
}

export default redirect;
