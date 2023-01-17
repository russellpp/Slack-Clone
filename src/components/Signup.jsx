import React, { useState } from "react";
import GlobalFonts from "../fonts/fonts";
import { Container, HomeButton, Icon, TextInput } from "./Login";
import styled from "styled-components";
import slacklogo from "../assets/icon.png";
import EmailIcon from "../assets/envelope-solid.svg";
import PasswordIcon from "../assets/lock-solid.svg";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";

const StyledTitle = styled.span`
  font-family: "HellixBold";
  color: var(--white);
  font-size: 35px;
  margin-bottom: 25px;
`;
const Logo = styled.img`
  height: 150px;
  width: 150px;
  margin-bottom: 35px;
`;
const InputTitle = styled.span`
  position: relative;
  font-size: 15px;
  color: var(--white);
  text-transform: uppercase;
  font-family: "HellixBold";
  align-self: flex-start;
  padding-left: 10px;
  margin-top: 20px;
  top: 10px;
`;

const REGISTER_URL = "/api/v1/auth/";

function Signup() {
  const navigate = useNavigate();
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await axios.post(REGISTER_URL, signupDetails);
      alert("Registration success");
      navigate("/Home/Login");
    } catch (err) {
      if (!err.response) {
        console.log("No server response");
      } else if (err.response.status === 422) {
        alert(err.response.data.errors.full_messages[0]);
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <Container>
      <GlobalFonts />

      <Logo src={slacklogo} alt="slack-logo" />
      <StyledTitle>Sign Up</StyledTitle>
      <InputTitle>Email Address</InputTitle>
      <Icon src={EmailIcon} />
      <TextInput
        type="text"
        placeholder="maria.delarosa@avion.com"
        onChange={(e) =>
          setSignupDetails({ ...signupDetails, email: e.target.value })
        }
      />
      <InputTitle>Password</InputTitle>
      <Icon src={PasswordIcon} />
      <TextInput
        type="text"
        placeholder="********"
        onChange={(e) =>
          setSignupDetails({ ...signupDetails, password: e.target.value })
        }
      />
      <InputTitle>Confirm Password</InputTitle>
      <Icon src={PasswordIcon} />
      <TextInput
        type="text"
        placeholder="********"
        onChange={(e) =>
          setSignupDetails({
            ...signupDetails,
            password_confirmation: e.target.value,
          })
        }
      />
      <HomeButton onClick={handleSubmit}>Register</HomeButton>
      <Link to="/Home/Login">Back</Link>
    </Container>
  );
}

export default Signup;
