import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AuthContext from "../context/AuthProvider";
import { useLocalStorage } from "../hooks/useLocalStorage";
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";

const MessageHeader = styled.div`
  height: 80px;
  border-bottom: 0.5px solid gray;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  color: var(--teal);

  & > span {
    margin-left: 10px;
    font-size: 24px;
    color: var(--teal);
    font-family: "ProximaNovaBold";
  }

  & > input {
    margin-left: 20px;
    height: 25px;
    border: none;
    background-color: transparent;
    outline: none;
    min-width: 300px;
    color: var(--teal);
    font-size: 20px;
    &::placeholder {
      color: gray;
      font-size: 20px;
    }
  }
`;

const DropDown = styled.div`
  align-self: flex-start;
  text-align: left;
  position: relative;
  background-color: var(--white);
  top: 60px;
  left: -300px;
  min-width: 300px;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  color: var(--teal);
  box-sizing: border-box;
  & > li {
    margin-bottom: 7px;
    list-style: none;
    color: var(--teal);
    font-size: 24px;
    cursor: pointer;
    &:hover{
        background-color: var(--teal);
        color: white;
    }
  }
`;

function NewMessage() {

  const [searchValue, setSearchValue] = useState("");
  const { setIsNewMessage, emailList, setEmailList, recipient, setRecipient, receiverClass, setReceiverClass } = useContext(AuthContext);
  

  useEffect(() => {
    setEmailList(JSON.parse(localStorage.getItem("users")).data);
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(()=>{
    setIsNewMessage(true)
    setReceiverClass("User");
    setRecipient(emailList.find((data) => (data.email === searchValue)))
  },[searchValue])

  return (
    <>
      <MessageHeader>
        <span>To:</span>
        <input
          onChange={handleSearch}
          type="text"
          placeholder="channel, somebody"
          value={searchValue}
        />
        <DropDown>
          {emailList
            .filter((item) => {
              const searchTerm = searchValue.toLowerCase();
              const email = item.email.toLowerCase();

              return (
                searchTerm &&
                email.startsWith(searchTerm) &&
                email !== searchTerm
              );
            })
            .map((item,index) => (
              <li key={index} onClick={() => setSearchValue(item.email)}>{item.email}</li>
            ))}
        </DropDown>
      </MessageHeader>
      <ChatBox />
      <ChatInput />
    </>
  );
}

export default NewMessage;
