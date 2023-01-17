import React, { useState, useContext, useEffect } from "react";
import GlobalFonts from "../fonts/fonts";
import UserIcon from "../assets/user-solid.svg";
import PasswordIcon from "../assets/lock-solid.svg";
import styled from "styled-components";
import slackLogo from "../assets/icon.png";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "../utils/axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "/api/v1/auth/sign_in";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SlackLogo = styled.img`
  height: 150px;
  width: 150px;
  margin-bottom: 35px;
`;

const SlackTitle = styled.span`
  font-family: "HellixBold";
  font-size: 60px;
  text-transform: lowercase;
  margin-bottom: 40px;
  text-align: center;
  padding: 5px;
`;

const TextInput = styled.input`
  height: 35px;
  border: none;
  border-bottom: 2px solid var(--white);
  background: transparent;
  padding: 0 50px;
  width: 300px;
  font-size: 15px;
  box-sizing: border-box;
  outline: none;
`;

const HomeButton = styled.button`
  margin-top: 40px;
  border: 3px var(--white);
  border-radius: 20px;
  min-width: 100px;
  height: 35px;
  font-family: "HellixBold";
  font-size: 15px;
  padding: 0 20px 3px;
  background-color: var(--white);
  color: var(--darkGray);
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background-color: #f8b64f;
    border: 3px #f8b64f;
    transition: 0.2s ease;
  }
`;

const Icon = styled.img`
  height: 18px;
  filter: invert(70%);
  position: relative;
  top: 26px;
  left: -125px;
`;

const SignupText = styled.div`
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
      color: inherit;
    }
  }
`;

const Err = styled.span`
  color: red;
`;

function Login() {
  const navigate = useNavigate()
  const { setAuth, setResHeader, resHeader, setUser, setIsLoggedIn, loginState, setLoginState } =
    useContext(AuthContext);
  const { getItem, setItem } = useLocalStorage();
  const {login} = useAuth()
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
 

  useEffect(() => {
    if (JSON.parse(getItem("loggedIn"))) {
      navigate("/Home/ChangeUser")
    }
  }, [])

  const handleLogin = async () => {
    login(loginDetails)
  };

  return (
    <Container>
      <GlobalFonts />
      <SlackLogo src={slackLogo} alt="slack-logo" />
      <SlackTitle>flakk</SlackTitle>
      <Icon src={UserIcon} />
      <TextInput
        type="text"
        placeholder="Username"
        onChange={(e) =>
          setLoginDetails({ ...loginDetails, email: e.target.value })
        }
      ></TextInput>
      <Icon src={PasswordIcon} />
      <TextInput
        variant="bottom-clone"
        type="text"
        placeholder="Password"
        onChange={(e) =>
          setLoginDetails({ ...loginDetails, password: e.target.value })
        }
      ></TextInput>
      <HomeButton onClick={handleLogin}>Login</HomeButton>
      {loginState === "error" && <Err>ERROR</Err>}
      <SignupText>
        <span>Don't have an account?</span>
        <Link to="/Home/Signup">Register</Link>
      </SignupText>
      {loginState === "success" && <Navigate to="/Dashboard" />}
    </Container>
  );
}

export default Login;
export { Container, SlackLogo, TextInput, Icon, HomeButton, SlackTitle, SignupText };
