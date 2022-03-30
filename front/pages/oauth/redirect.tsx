import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAppDispatch } from "@store/hook";
import { logIn } from "@actions/user";

type Props = {};

function redirect({}: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const token = router.query.token;
  // const RequestAction = async (tokenData: string) =>
  //   await axios.get(
  //     "http://metastation-env.eba-jip4zmfh.ap-northeast-2.elasticbeanstalk.com/api/v1/users",
  //     {
  //       headers: { Authorization: `Bearer ${tokenData}` },
  //     },
  //   );
  useEffect(() => {
    if (token) {
      localStorage.setItem("jwtToken", token as string);
    }
    router.push("/");
  }, [token]);
  return <div>redirect</div>;
}

export default redirect;
