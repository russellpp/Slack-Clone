import React from "react";
import styled from "styled-components";
import slackLogo from "../assets/slack-logo-white.png";
import GlobalFonts from "../fonts/fonts";

const PageWrapper = styled.div`
  background-color: var(--teal);
  
`;

const LoginContainer = styled.div`
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  box-sizing: content-box;
  padding: 50px;
  border-radius: 10px;
  background-color: none;
  box-shadow: 0 0 0 20000px #00000076;
  height: 600px;
`;

const SlackLogo = styled.img`
  height: 150px;
  width: 150px;
  margin-bottom: 35px;
`;

const SlackTitle = styled.span`
  height: 100px;
  font-family: "HellixBold";
  font-size: 70px;
  text-transform: lowercase;
  margin-bottom: 10px;
`;

const TextInput = styled.input`
  height: 35px;
  border: 2px solid var(--white);
  border-radius: 20px;
  padding: 0 15px;
  width: 300px;
  font-size: 15px;
  box-sizing: border-box;
  outline: none;
  margin-bottom: 25px;
`;

const HomeButton = styled.button`
  border: 3px solid var(--white);
  border-radius: 20px;
  width: 300px;
  height: 35px;
  font-family: "HellixBold";
  font-size: 15px;
  background-color: var(--white);
  color: var(--darkGray);
`;

const ClipSvg = styled.svg`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: 0%;
  min-width: 100vw;
  min-height: 400px;
`;

function HomePage() {
  return (
    <PageWrapper>
      <ClipSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#d1a8e9"
          fill-opacity="0.5"
          d="M0,160L40,176C80,192,160,224,240,245.3C320,267,400,277,480,261.3C560,245,640,203,720,165.3C800,128,880,96,960,112C1040,128,1120,192,1200,186.7C1280,181,1360,107,1400,69.3L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </ClipSvg>
      <ClipSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#d1a8e9"
          fill-opacity="0.3"
          d="M0,32L40,64C80,96,160,160,240,160C320,160,400,96,480,58.7C560,21,640,11,720,10.7C800,11,880,21,960,53.3C1040,85,1120,139,1200,165.3C1280,192,1360,192,1400,192L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </ClipSvg>
      <ClipSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#d1a8e9" fill-opacity="0.5" d="M0,128L40,117.3C80,107,160,85,240,80C320,75,400,85,480,106.7C560,128,640,160,720,192C800,224,880,256,960,250.7C1040,245,1120,203,1200,181.3C1280,160,1360,160,1400,160L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
      </ClipSvg>
      <LoginContainer>
        <GlobalFonts />
        <SlackLogo src={slackLogo} alt="slack-logo"></SlackLogo>
        <SlackTitle>flakk</SlackTitle>
        <TextInput type="text" placeholder="Username"></TextInput>
        <TextInput
          variant="bottom-clone"
          type="text"
          placeholder="Password"
        ></TextInput>
        <HomeButton>Sign In</HomeButton>
      </LoginContainer>
    </PageWrapper>
  );
}

export default HomePage;
