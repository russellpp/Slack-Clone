import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import AuthContext from "../context/AuthProvider";
import { useLocalStorage } from "../hooks/useLocalStorage";

function ChatBox() {
  const { getItem } = useLocalStorage();
  const { recipient, recMessages, setRecMessages, sendStatus } =
    useContext(AuthContext);
  const INBOX_KEY = `inbox_${recipient?.id}`;

  useEffect(() => {
    if (recipient) {
      setRecMessages(JSON.parse(getItem(INBOX_KEY)));
    } else {
      setRecMessages([]);
    }
  }, [recipient, sendStatus]);

  return (
    <ChatBoxContainer>
      {recMessages?.map((msg, index) => {
        if (msg.sender.id === recipient?.id) {
          return (
            <Message key={index} variant={"user"}>
              <div>
                <span>{msg.sender.email}</span>
                <span>{`${msg.created_at.substring(
                  5,
                  10
                )} · ${msg.created_at.substring(11, 16)}`}</span>
              </div>
              <span>{msg.body}</span>
            </Message>
          );
        } else {
          return (
            <Message key={index} variant={"others"}>
              <div>
                <span>{msg.sender.email}</span>
                <span>{`${msg.created_at.substring(
                  5,
                  10
                )} · ${msg.created_at.substring(11, 16)}`}</span>
              </div>
              <span>{msg.body}</span>
            </Message>
          );
        }
      })}
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
  color: ${(props) =>
    props.variant === "user" ? "var(--slackPurple)" : "var(--teal)"};
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  text-align: left;
  background-color: ${(props) =>
    props.variant === "user" ? "#3c6caa85" : "#378f837d"};
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
