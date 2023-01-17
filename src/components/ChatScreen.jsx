import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { Navigate, Route, Routes } from "react-router-dom";
import ChatBody from "./ChatBody";
import NewMessage from "./NewMessage";
import AuthContext from "../context/AuthProvider";

const ChatScreenContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: calc(100vw - 230px);
  height: calc(100vh - 50px);
  background-color: #f0f0ea;
  display: flex;
  flex-direction: column;
`;

function ChatScreen() {
  const {
    isRedirecting,
    setIsRedirecting,
    sendStatus,
    isNewMessage,
    setSendStatus,
    targetURL,
  } = useContext(AuthContext);

  return (
    <ChatScreenContainer>
      <Routes>
        <Route path="/Message">
          <Route path="User/:uid" element={<ChatBody />} />
          <Route path="Channel/:uid" element={<ChatBody />} />
          <Route path="new" element={<NewMessage />} />
        </Route>
      </Routes>
      {isRedirecting && <Navigate to={targetURL} />}
    </ChatScreenContainer>
  );
}

export default ChatScreen;
