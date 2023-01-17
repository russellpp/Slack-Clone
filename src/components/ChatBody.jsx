import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import hashtagIcon from "../assets/hashtag-solid.svg";
import atIcon from "../assets/at-solid.svg";
import addUserIcon from "../assets/user-plus-solid.svg";
import AuthContext from "../context/AuthProvider";
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";
import { useHandle } from "../hooks/useHandle";

const ChatScreenHeader = styled.div`
  height: 80px;
  border-bottom: 0.5px solid gray;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;

  & > span {
    margin-left: 0px;
    font-size: 24px;
    color: var(--teal);
    font-family: "ProximaNovaBold";
  }
`;

const List = styled.ul`
  list-style: none;
  color: gray;
  display: flex;
  padding: 10px;
  & > li {
    font-size: 15px;
    margin-left: 10px;
  }
`;

const Icon = styled.img`
  height: ${(props) => (props.variant === "right" ? "15px" : "25px")};
  margin-right: 0px;
  margin-left: ${(props) => (props.variant === "right" ? "auto" : "0px")};
  filter: invert(16%) sepia(49%) saturate(756%) hue-rotate(144deg)
    brightness(103%) contrast(104%);
  border: ${(props) =>
    props.variant === "right" ? `0.5px solid black` : "none"};
  padding: 10px;
  border-radius: 5px;
  transition: 0.1s ease;
  &:hover {
    cursor: pointer;
    background-color: teal;
    filter: invert(100%);
  }
`;

function ChatBody() {
  const { uid } = useParams();
  const { handleReceive, handleGetChannelData } = useHandle();
  const {
    channelList,
    currentChannel,
    setCurrentChanel,
    receiverClass,
    recipient,
    emailList,
    setSendStatus,
    sendStatus,
    setReceiverClass,
    setRecipient,
    recMessages,
    isNewMessage,
    setIsNewMessage,
    isRedirecting,
    setIsRedirecting,
    setIsAddingMembers,
  } = useContext(AuthContext);
  const targetUser = emailList?.find((data) => data.id == uid);
  const targetChannel = channelList?.find((data) => data.id == uid);
  const [name, setName] = useState();
  const [names, setNames] = useState();

  useEffect(() => {
    setIsRedirecting(false);
    if (sendStatus) {
      setSendStatus(false);
    }
    if (targetUser) {
      setReceiverClass("User");
      setRecipient(targetUser);
      setName(targetUser?.email);
    } else {
      setReceiverClass("Channel");
      setRecipient(targetChannel);
      setName(targetChannel?.name);
    }
  }, [targetChannel, targetUser]);

  useEffect(() => {
    handleReceive();
  }, [sendStatus, recipient, isNewMessage]);

  useEffect(() => {
    handleGetChannelData();
  }, [recipient]);

  useEffect(() => {
    const Array = currentChannel?.channel_members;
    const FilteredArray = Array?.map((item) => item.user_id);
    const filteredEmails = FilteredArray?.map((arrID) =>
      emailList?.find((item) => item.id === arrID)
    );
    setNames(filteredEmails);
  }, []);

  const handleClick = () => {
    setIsAddingMembers(true);
  };

  return (
    <>
      <ChatScreenHeader>
        <Icon
          src={
            window.location.href.toString().includes("Channel")
              ? hashtagIcon
              : atIcon
          }
        />
        <span>{name}</span>
        <List>
          {window.location.href.toString().includes("Channel") &&
            names?.map((item, index) => <li key={index}>@{item.uid}</li>)}
        </List>
        {window.location.href.toString().includes("Channel") && (
          <Icon src={addUserIcon} variant="right" onClick={handleClick} />
        )}
      </ChatScreenHeader>
      <ChatBox />
      <ChatInput />
    </>
  );
}

export default ChatBody;
export { ChatScreenHeader };
