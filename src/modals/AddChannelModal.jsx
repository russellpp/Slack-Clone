import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import AuthContext from "../context/AuthProvider";
import deleteIcon from "../assets/xmark-solid.svg";
import { useHandle } from "../hooks/useHandle";
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  left: 50%;
  top: 50%;
  padding: none;
  margin: none;
  background-color: #f0f0ea;
  min-width: 500px;
  max-width: 500px;
  min-height: 300px;
  border: 1px solid gray;
  z-index: 3;
  border: 3px solid var(--teal);
  border-radius: 30px;
  color: var(--teal);
`;

const ModalHeader = styled.div`
  box-sizing: border-box;
  background-color: var(--teal);
  border-top-left-radius: 26px;
  border-top-right-radius: 26px;
  height: 50px;
  font-family: "HellixBold";
  font-size: 20px;
  padding-top: 10px;
  color: var(--white);
`;
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  padding: 10px 20px;
  justify-items: flex-start;
  align-items: flex-start;
  & > div > label {
    font-family: "HellixBold";
    font-size: 15px;
  }
`;
const ModalFooter = styled.div`
  display: flex;
  padding: 10px 20px 20px;
  & > button {
    height: 30px;
    font-size: 15px;
    font-family: "ProximaNovaReg";
    cursor: pointer;
    background-color: var(--teal);
    border: none;
    padding: 0 10px;
    border-radius: 5px;
    margin-left: 10px;
    &:hover {
      background-color: var(--slackPurple);
    }
  }
`;

const ModalInput = styled.input`
  margin-left: 5px;
  width: 300px;
  background-color: transparent;
  outline: none;
  border: none;
  color: var(--teal);
  font-size: 15px;
  border-bottom: 1px solid gray;
`;

const DropDown = styled.div`
  align-self: flex-start;
  text-align: left;
  position: relative;
  background-color: var(--white);
  top: 0px;
  left: 120px;
  min-width: 200px;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  color: var(--teal);
  box-sizing: border-box;
  & > li {
    margin-bottom: 2px;
    margin-left: 5px;
    list-style: none;
    color: var(--teal);
    font-size: 15px;
    cursor: pointer;
    &:hover {
      background-color: var(--teal);
      color: white;
    }
  }
`;

const MembersList = styled.ul`
  margin-left: 0px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  & > li {
    box-sizing: border-box;
    height: 28px;
    display: flex;
    margin-right: 10px;
    margin-top: 5px;
    padding: 0px 5px 0px 5px;
    border: 1px solid transparent;
    border-radius: 8px;
    background-color: var(--slackPurple);
    color: var(--white);
    &:hover {
      background-color: transparent;
      color: var(--teal);

      border: 1px solid gray;
    }
    & > img {
      height: 18px;
      width: 15px;
      margin-left: 5px;
      padding-top: 5px;
      filter: invert(50%);
      &:hover {
        cursor: pointer;
        filter: invert(0%);
      }
    }
  }
`;

function AddChannelModal() {
  const [searchValue, setSearchValue] = useState("");
  const { handleAddChannel } = useHandle();
  const {
    emailList,
    addMembersList,
    setAddMembersList,
    user,
    createChannelName,
    setCreateChannelName,
    setIsNewMessage,
    isAddingChannel,
    setIsAddingChannel,
    isAddingMembers
  } = useContext(AuthContext);

  useEffect(() => {
    const currentUser = emailList?.find((item) => item.email === user);
    if (
      currentUser &&
      !addMembersList.some((item) => item.email === currentUser.email) &&
      !isAddingMembers
    ) {
      setAddMembersList([currentUser]);
    }
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleAddMember = (item) => {
    setSearchValue(item.email);
    if (!addMembersList.some((mem) => mem.email === item.email)) {
      setAddMembersList((prevState) => {
        return [...prevState, item];
      });
    }
  };

  const handleDeleteMember = (idDel) => {
    console.log(idDel);
    setAddMembersList((current) => current.filter((item) => item.id !== idDel));
  };

  const handleChannelName = (e) => {
    setCreateChannelName(e.target.value);
  };

  const handleCloseModal = () => {
    setIsAddingChannel(false);
  };

  const handleConfirm = () => {
    if ((createChannelName !== "") | !createChannelName) {
      handleAddChannel();
    } else {
      alert("Invalid channel name");
    }
  };

  return (
    <>
      <ModalContainer>
        <ModalHeader>
          <span>Add Channel</span>
        </ModalHeader>
        <ModalBody>
          <div>
            <label htmlFor="channel-name">#</label>
            <ModalInput
              type="text"
              placeholder="channel name"
              name="channel-name"
              onChange={handleChannelName}
            />
          </div>
          <div>
            <label htmlFor="searchbar">Add Members:</label>
            <ModalInput
              onChange={handleSearch}
              type="text"
              placeholder="@helloworld, somebody"
              value={searchValue}
              name="searchbar"
            />
          </div>
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
              .map((item, index) => (
                <li key={index} onClick={() => handleAddMember(item)}>
                  {item?.email}
                </li>
              ))}
          </DropDown>
          <MembersList>
            {addMembersList?.map((item, index) => (
              <li key={index}>
                <span>{item?.email}</span>
                <img
                  src={deleteIcon}
                  onClick={() => handleDeleteMember(item?.id)}
                />
              </li>
            ))}
          </MembersList>
        </ModalBody>
        <ModalFooter>
          <button onClick={handleConfirm}>Create Channel</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </ModalFooter>
      </ModalContainer>
    </>
  );
}

export default AddChannelModal;
export {
  ModalBody,
  ModalFooter,
  ModalContainer,
  ModalInput,
  ModalHeader,
  DropDown,
  MembersList,
};
