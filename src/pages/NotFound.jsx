import React from "react";
import styled from "styled-components";
import { SlackLogo } from "../components/Login";
import slackLogo from "../assets/icon.png";
import GlobalFonts from "../fonts/fonts";

const TitledDiv = styled.div`
  position: absolute;
  transform: translateX(-50%) translateY(50%);
  top: 20%;
  left: 50%;
  color: white;
  display: flex;
  flex-direction: column;
  & > img {
    filter: grayscale(100%);
  }
  & > span {
    font-family: "HellixBold";
    font-size: 30px;
    color: gray;
  }
  align-items: center;
`;

function NotFound() {
  return (
    <div>
      <TitledDiv>
        <GlobalFonts />
        <SlackLogo src={slackLogo}></SlackLogo>
        <span>PAGE NOT FOUND!</span>
      </TitledDiv>
    </div>
  );
}

export default NotFound;
