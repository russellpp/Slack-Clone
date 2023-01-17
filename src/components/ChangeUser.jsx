import React, { useContext, useEffect } from "react";
import {
  Container,
  HomeButton,
  Icon,
  SlackLogo,
  TextInput,
  SlackTitle,
  SignupText,
} from "./Login";
import GlobalFonts from "../fonts/fonts";
import styled from "styled-components";
import slackLogo from "../assets/icon.png";
import AuthContext from "../context/AuthProvider";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const HeaderTitle = styled.div`
  margin-top: 20px;
  font-family: "ProximaNovaReg";
  display: flex;
  flex-direction: column;
  & :nth-child(2) {
    margin-top: 10px;
    font-family: "ProximaNovaBold";
    font-size: 20px;
  }
`;

const BodyText = styled.div`
  margin-top: 130px;
  & > span {
    margin-right: 10px;
  }
  & > a {
    font-weight: 700;
    border-bottom: 2px solid #ffffffa0;
    padding: 0 3px 0 1px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      font-size: 17px;
      transition: 0.1s ease-in;
      border-bottom: 2px solid #ffffffa0;
    }
    &:visited {
      color: #ffffffa0;
    }
  }
`;

export default function ChangeUser() {
  const { setItem, getItem } = useLocalStorage();
  const {
    resHeader,
    setResHeader,
    setAuth,
    auth,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
  } = useContext(AuthContext);
  const {logout} = useAuth()

  useEffect(() => {
    setResHeader(JSON.parse(getItem("responseHeader")));
  }, []);

  return (
    <Container>
      <GlobalFonts />
      <SlackLogo src={slackLogo} />
      <SlackTitle>flakk</SlackTitle>
      <HeaderTitle>
        <span>Signed In As</span>
        <span>{resHeader.uid}</span>
      </HeaderTitle>
      <Link to="/Dashboard">
        <HomeButton >Continue</HomeButton>
      </Link>
      <BodyText>
        <a onClick={logout} >Switch Account</a>
      </BodyText>
    </Container>
  );
}
