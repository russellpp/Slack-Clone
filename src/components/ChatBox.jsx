import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AuthContext from "../context/AuthProvider";
import { useLocalStorage } from "../hooks/useLocalStorage";



function ChatBox() {
  const { getItem } = useLocalStorage();
  const { auth, recipient, recMessages, setRecMessages, user, message, sendStatus} =
    useContext(AuthContext);
  const INBOX_KEY = `inbox_${recipient?.id}`;

  useEffect(() => {
    if (recipient) {
      setRecMessages(JSON.parse(getItem(INBOX_KEY)));
    } else {
      setRecMessages([]);
    }
  }, [recipient, sendStatus]);

  const handleClick = () => {
    console.log(getItem(`inbox_3120`));
    console.log(INBOX_KEY);
  };


  return (
    <ChatBoxContainer>
      {recMessages?.map((msg, index) => (
        <Message key={index} variant={msg.receiver.id === recipient?.id ? "white" : "pink"}>
          <div>
            <span>{msg.receiver.id === recipient?.id ? user : recipient?.uid}</span>
            <span>{`${msg.created_at.substring(5, 10)} · ${msg.created_at.substring(11, 16)}`}</span>
          </div>
          <span onClick={handleClick}>{msg.body}</span>
        </Message>
      ))}
    </ChatBoxContainer>
  );
}

const ChatBoxContainer = styled.div`
  background-color: aliceblue;
  height: calc(100vh - 250px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Message = styled.div`
  height: 50px;
  color: var(--teal);
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  text-align: left;
  background-color: ${(props)=> {props.variant === "user" ? "white":"black"}};
  & :nth-child(2) {
    margin-left: 20px;
    font-size: 18px;
  }
  & :first-child {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: flex-start;
    & :first-child {
      font-size: 15px;
    }
    & :nth-child(2) {
      margin-left: 0;
      font-size: 10px;
    }
  }
`;

export default ChatBox;
