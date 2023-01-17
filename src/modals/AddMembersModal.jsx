import React, { useContext } from "react";
import { useState } from "react";
import {
  ModalBody,
  ModalFooter,
  ModalContainer,
  ModalInput,
  ModalHeader,
  DropDown,
  MembersList,
} from "./AddChannelModal";
import { useHandle } from "../hooks/useHandle";
import AuthContext from "../context/AuthProvider";
import deleteIcon from "../assets/xmark-solid.svg";

function AddMembersModal() {
  const [searchValue, setSearchValue] = useState("");
  const { handleAddMembers } = useHandle();
  const {
    emailList,
    addMembersList,
    setAddMembersList,
    createChannelName,
    setCreateChannelName,
    setIsNewMessage,
    isAddingMembers,
    setIsAddingMembers,
    recipient,
  } = useContext(AuthContext);

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

  const handleCloseModal = () => {
    setIsAddingMembers(false);
  };

  return (
    <>
      <ModalContainer>
        <ModalHeader>
          <span>#{recipient?.name}</span>
        </ModalHeader>
        <ModalBody>
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
                  {item.email}
                </li>
              ))}
          </DropDown>
          <MembersList>
            {addMembersList.map((item, index) => (
              <li key={index}>
                <span>{item.email}</span>
                <img
                  src={deleteIcon}
                  onClick={() => handleDeleteMember(item.id)}
                />
              </li>
            ))}
          </MembersList>
        </ModalBody>
        <ModalFooter>
          <button onClick={handleAddMembers}>Add Members</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </ModalFooter>
      </ModalContainer>
    </>
  );
}

export default AddMembersModal;
