import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import ChatScreen from "../components/ChatScreen";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import AuthContext from "../context/AuthProvider";
import GlobalFonts from "../fonts/fonts";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "../utils/axios";
import AddChannelModal from "../modals/AddChannelModal";
import AddMembersModal from "../modals/AddMembersModal";

const USERS_URL = "/api/v1/users";
const CHANNELS_URL = "/api/v1/channels";

const DashboardWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: white;
`;
const Body = styled.div`
  font-family: "ProximaNovaReg";
`;

function Dashboard() {
  const {
    isAddingMembers,
    sendStatus,
    setChannelList,
    isAddingChannel,
    resHeader,
    setResHeader,
    user,
    setUser,
    setEmailList,
    auth,
    setAuth,
  } = useContext(AuthContext);
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    if (getItem("loggedIn")) {
      setUser(getItem("user"));
      setResHeader(JSON.parse(getItem("responseHeader")));
      setAuth(JSON.parse(getItem("auth")));
    } else {
      setItem("responseHeader", JSON.stringify(resHeader));
      setItem("auth", JSON.stringify(auth));
      setItem("loggedIn", true);
      setItem("user", user);
    }
  }, []);

  const getUsersData = async () => {
    const headers = JSON.parse(getItem("responseHeader"));

    try {
      const res = await axios.get(USERS_URL, { headers });
      setItem("users", JSON.stringify(res.data));
      setEmailList(res.data.data);
    } catch (err) {
      if (!err?.res) {
        console.log("No server response");
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };

  const getChannelsData = async () => {
    const headers = JSON.parse(getItem("responseHeader"));

    try {
      const res = await axios.get(CHANNELS_URL, { headers });
      setItem("channels", JSON.stringify(res.data));
      setChannelList(res.data.data);
    } catch (err) {
      if (!err?.res) {
        console.log("No server response");
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getUsersData();
    getChannelsData();
  }, [isAddingChannel, sendStatus]);

  return (
    <DashboardWrapper>
      <GlobalFonts />
      {isAddingMembers && <AddMembersModal />}
      {isAddingChannel && <AddChannelModal />}
      <Header />
      <Body>
        <SideBar />
        <ChatScreen />
      </Body>
    </DashboardWrapper>
  );
}

export default Dashboard;
