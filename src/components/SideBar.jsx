import React, { useContext, useState } from "react";
import styled from "styled-components";
import userEditIcon from "../assets/user-edit-solid.svg";
import GlobalFonts from "../fonts/fonts";
import caretDownicon from "../assets/caret-down-solid.svg";
import caretUpicon from "../assets/caret-up-solid.svg";
import newMsgIcon from "../assets/pen-to-square-regular.svg";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import AddChannel from "../modals/AddChannelModal";
import AddChannelModal from "../modals/AddChannelModal";
import { redirect } from "react-router-dom";
import plusIcon from "../assets/plus-solid.svg";
import hashtagIcon from "../assets/hashtag-solid.svg";
import { useNavigate } from "react-router-dom";

const SidebarContainer = styled.div`
  background-color: var(--teal);
  flex: 0.3;
  max-width: 230px;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled.div`
  box-sizing: border-box;
  height: auto;
  text-align: left;
  padding: 10px 0px 10px 20px;
  display: grid;
  border-bottom: 0.5px solid gray;
  grid-template-areas:
    "a c"
    "b c";
  grid-template-rows: 30px 30px;
  & > h3 {
    font-size: 15px;
    grid-area: b;
  }
  & > h2 {
    grid-area: a;
    font-family: "HellixBold";
    font-size: 18px;
  }
`;

const EditIcon = styled.img`
  height: 20px;
  justify-self: center;
  margin-top: 12px;

  filter: invert(70%);
  grid-area: c;
  transition: 0.1s ease;
  &:hover {
    cursor: pointer;
    filter: invert(95%);
  }
`;

const Title = styled.div`
  padding: 10px 20px;
  text-align: left;
  border-bottom: 0.5px solid gray;
  & > img {
    height: 13px;
    filter: invert(80%);
    margin-right: 12px;
  }
  &:hover {
    cursor: pointer;
    background-color: white;
    color: var(--teal);
    font-family: "ProximaNovaBold";
    & > img {
      filter: invert(30%);
    }
  }
`;

const List = styled.div`
  padding: 0;
  text-align: left;
  border-bottom: 0.5px solid gray;
  & > ul {
    list-style: none;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: calc(100vh - 180px);
    padding: 0;
    & > li {
      padding: 10px 0 10px 35px;
      text-transform: capitalize;
    }
  }
`;

const ListItem = styled.li`
  padding: 10px 0 10px 35px;
  text-transform: capitalize;
  & > img {
    height: 13px;
    filter: invert(80%);
    margin-right: 12px;
  }
  &:hover {
    cursor: pointer;
    background-color: white;
    color: var(--teal);
    font-family: "ProximaNovaBold";
    & > img {
      filter: invert(30%);
    }
  }
`;

function SideBar() {
  const navigate = useNavigate();
  const [isChannelsOpen, setIsChannelsOpen] = useState();
  const { isAddingChannel, setIsAddingChannel, channelList } =
    useContext(AuthContext);

  const handleOpenChannelModal = () => {
    setIsAddingChannel(true);
  };

  const handleNavigate = (id) => {
    navigate(`/Dashboard/Message/Channel/${id}`);
  };

  const handleOpen = () => {
    if (isChannelsOpen) {
      setIsChannelsOpen(false);
    } else {
      setIsChannelsOpen(true);
    }
  };

  return (
    <SidebarContainer>
      <GlobalFonts />
      <UserInfo>
        <h2>WORKSPACE</h2>
        <h3>email address</h3>
        <Link to="/Dashboard/Message/new">
          <EditIcon src={newMsgIcon} alt="edit-icon" />
        </Link>
      </UserInfo>
      <Title onClick={handleOpen}>
        <img src={isChannelsOpen ? caretUpicon : caretDownicon} />
        <span>Channels</span>
      </Title>
      <List>
        <ul>
          <ListItem onClick={handleOpenChannelModal}>
            <img src={plusIcon} />
            <span>Add Channel</span>
          </ListItem>
          {isChannelsOpen &&
            channelList.map((item) => (
              <ListItem onClick={() => handleNavigate(item.id)}>
                <img src={hashtagIcon} />
                <span>{item.name}</span>
              </ListItem>
            ))}
        </ul>
      </List>
    </SidebarContainer>
  );
}

export default SideBar;
