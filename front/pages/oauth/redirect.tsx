import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@store/hook";
import { useCookies } from "react-cookie";
import SetNickname from "@components/redirect/SetNickname";
import styled from "styled-components";

type Props = {};

function redirect({}: Props) {
  return (
    <Layout>
      <SetNickname />
    </Layout>
  );
}

export default redirect;
const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;
