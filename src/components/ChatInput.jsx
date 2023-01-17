import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import sendIcon from "../assets/paper-plane-solid.svg";
import AuthContext from "../context/AuthProvider";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useHandle } from "../hooks/useHandle";
import { redirect } from "react-router-dom";

const SEND_URL = "/api/v1/messages";

const ChatInputContainer = styled.div`
  border-top: 0.5px solid gray;
  box-sizing: border-box;
  height: 100px;
  padding: 20px;
`;

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
  border: 1px solid gray;
  height: 80px;
`;

const MessageInput = styled.input`
  position: relative;
  width: calc(100% - 60px);
  left: 0;
  font-size: 20px;
  background-color: transparent;
  border: none;
  margin-top: 10px;
  height: 55px;
  color: var(--teal);
  outline: none;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Icon = styled.img`
  height: 30px;
  align-self: center;
  margin: auto 10px;
  cursor: pointer;
  filter: invert(16%) sepia(49%) saturate(756%) hue-rotate(144deg)
    brightness(103%) contrast(104%);

  &:hover {
    filter: invert(29%) sepia(96%) saturate(7490%) hue-rotate(289deg)
      brightness(102%) contrast(89%);
  }
`;

function ChatInput() {
  const { handleSend } = useHandle();
  const { setMessage, sendStatus, targetURL } = useContext(AuthContext);
  const [msg, setMsg] = useState();

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  useEffect(() => {
    setMessage(msg);
  }, [msg]);

  return (
    <ChatInputContainer>
      <ChatWrapper>
        <MessageInput
          onChange={handleChange}
          type="text"
          placeholder="Message user here..."
        ></MessageInput>
        <Icon src={sendIcon} alt="send-icon" onClick={handleSend} />
      </ChatWrapper>
    </ChatInputContainer>
  );
}

export default ChatInput;
