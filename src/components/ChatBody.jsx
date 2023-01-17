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
import { useLocalStorage } from "../hooks/useLocalStorage";

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
  display: flex;
  flex-wrap: wrap;
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
    cursor: ${(props) => (props.variant === "right" ? "pointer" : "inherited")};
    background-color: ${(props) =>
      props.variant === "right" ? "gray" : "inherited"};
  }
`;

function ChatBody() {
  const { uid } = useParams();
  const { handleReceive, handleGetChannelData } = useHandle();
  const { getItem } = useLocalStorage();
  const {
    channelList,
    currentChannel,
    recipient,
    emailList,
    setSendStatus,
    sendStatus,
    setReceiverClass,
    setRecipient,
    isNewMessage,
    setIsRedirecting,
    setIsAddingMembers,
    receiverClass,
    isAddingMembers,
    setUrlID,
  } = useContext(AuthContext);

  const [name, setName] = useState();
  const [names, setNames] = useState(null);

  const targetUser = emailList?.find((data) => data.id == uid);
  const targetChannel = channelList?.find((data) => data.id == uid);

  useEffect(() => {
    setUrlID(uid);
  }, []);

  useEffect(() => {
    setNames([]);
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
    handleGetChannelData();
  }, [sendStatus, recipient, isNewMessage, isAddingMembers]);

  useEffect(() => {
    if (receiverClass === "Channel") {
      console.log("listing");
      console.log(receiverClass);
      const emails = JSON.parse(getItem("users"));
      const channelData = JSON.parse(getItem("currentChannel"));
      const members = channelData?.channel_members;
      const FilteredArray = members?.map((item) => item.user_id);
      const filteredEmails = FilteredArray?.map((arrID) =>
        emails.data.find((item) => item.id === arrID)
      );
      if (receiverClass === "User") {
        console.log("chould not list");
        setNames([]);
      } else {
        setNames(filteredEmails);
      }
    }
  }, [currentChannel, isAddingMembers, emailList, receiverClass]);

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
          {names &&
            names?.map((item, index) => <li key={index}>{`@${item?.uid}`}</li>)}
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
