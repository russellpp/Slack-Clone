import React from "react";
import styled from "styled-components";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { ReactDOM } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChangeUser from "../components/ChangeUser";

const PageWrapper = styled.div`
  background-color: var(--teal);
`;

const DashWrapper = styled.div`
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  left: 50%;
  top: 50%;
  width: 300px;
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
          fill="#0E71B5"
          fillOpacity="1"
          d="M0,160L60,133.3C120,107,240,53,360,37.3C480,21,600,43,720,85.3C840,128,960,192,1080,192C1200,192,1320,128,1380,96L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </ClipSvg>
      <ClipSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#9A013A"
          fillOpacity="0.8"
          d="M 0 224 C 163 149 204 87 322 118 C 509 176 535 211 642 213 C 744 199 764 174 859 126 C 998 45 1159 53 1360 192 L 1440 246 L 1440 320 L 1380 320 C 1320 320 1200 320 1080 320 C 960 320 840 320 720 320 C 600 320 480 320 360 320 C 240 320 120 320 60 320 L 0 320 Z"
        ></path>
      </ClipSvg>
      <ClipSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#E97C5B"
          fillOpacity="0.7"
          d="M0,64L48,101.3C96,139,192,213,288,218.7C384,224,480,160,576,149.3C672,139,768,181,864,218.7C960,256,1056,288,1152,288C1248,288,1344,256,1392,240L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </ClipSvg>
      <DashWrapper>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ChangeUser" element={<ChangeUser />} />
        </Routes>
      </DashWrapper>
    </PageWrapper>
  );
}

export default HomePage;
