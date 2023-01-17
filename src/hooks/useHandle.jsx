import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useLocalStorage } from "./useLocalStorage";
import axios from "../utils/axios";

const SEND_URL = "/api/v1/messages";

export const useHandle = () => {
  const {
    recipient,
    resHeader,
    message,
    receiverClass,
    setReceiverClass,
    setSendStatus,
    setTargetURL,
    setRecMessages,
    addMembersList,
    createChannelName,
    setIsAddingChannel,
    setCurrentChannel,
    isNewMessage,
    setIsNewMessage,
    setIsRedirecting,
    setIsAddingMembers,
    urlID,
  } = useContext(AuthContext);
  const { getItem, setItem } = useLocalStorage();

  const params = {
    receiver_id: recipient?.id,
    receiver_class: receiverClass,
    body: message,
  };

  const handleSend = async () => {
    const headers = JSON.parse(getItem("responseHeader"));
    if (!recipient) {
      alert("invalid recipient");
    } else {
      try {
        const res = await axios.post(SEND_URL, params, { headers });
        setTargetURL(`/Dashboard/Message/${receiverClass}/${recipient?.id}`);
        if (isNewMessage) {
          setIsNewMessage(false);
          setIsRedirecting(true);
        }
        setSendStatus(true);
      } catch (err) {
        if (!err?.res) {
          alert("No server response. Message not sent.");
        } else {
          alert("Message not sent.");
        }
      }
    }
  };

  const handleReceive = async () => {
    const headers = JSON.parse(getItem("responseHeader"));
    const RECEIVE_URL = `/api/v1/messages?receiver_id=${recipient?.id}&receiver_class=${receiverClass}`;
    try {
      const res = await axios.get(RECEIVE_URL, { headers });
      setItem(`inbox_${recipient?.id}`, JSON.stringify(res.data.data));
      setRecMessages(res.data.data);
    } catch {
      if (!err?.res) {
        alert("No server response. Cannot retrieve messages ");
      } else {
        alert("Cannot retrieve messages");
      }
    }
  };

  const handleAddChannel = () => {
    const reqHeader = JSON.stringify({
      name: createChannelName,
      user_ids: addMembersList.map((mem) => mem.id),
    });

    async function post() {
      const response = await fetch("http://206.189.91.54/api/v1/channels", {
        method: "POST",
        body: reqHeader,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "access-token": resHeader["access-token"],
          client: resHeader.client,
          expiry: resHeader.expiry,
          uid: resHeader.uid,
        },
        mode: "cors",
      });
      const data = await response.json();
      if (!data.errors) {
        setReceiverClass("Channel");
        setTargetURL(`/Dashboard/Message/Channel/${data.data.id}`);

        setIsAddingChannel(false);
        setIsRedirecting(true);
      } else {
        alert(data.errors[0]);
      }
    }

    post();

    /* if (createChannelName && createChannelName.length < 16 && addMembersList.length > 0) {
      try {
        const res = await axios.post(CREATECHANNEL_URL, reqHeader, { headers });
        if(res.data.errors) {
          alert(res.data.errors[0])
        } else {
          console.log(res.data.data);

        }
      } catch {
        if (!err?.res) {
          console.log("No server response");
          console.log(err);
        } else {
          console.log(err);
        }
      }
    } else {
      if (!createChannelName) {
        alert("No channel name!");
      } else if (addMembersList.length > 0) {
        alert("No members added!")
      } else {
        alert("Channel name too long! Maximum of 15 characters.")
      }
    } */
  };

  const handleAddMembers = async () => {
    const reqHeader = JSON.stringify({
      id: recipient?.id,
      member_id: addMembersList[0].id,
    });

    async function post() {
      const response = await fetch(
        "http://206.189.91.54/api/v1/channel/add_member",
        {
          method: "POST",
          body: reqHeader,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "access-token": resHeader["access-token"],
            client: resHeader.client,
            expiry: resHeader.expiry,
            uid: resHeader.uid,
          },
          mode: "cors",
        }
      );
      const data = await response.json();

      setIsAddingMembers(false);
    }

    if (addMembersList.length > 1) {
      alert("Can only add one member at a time");
    } else {
      post();
    }
  };

  const handleGetChannelData = () => {
    async function get() {
      const rh = JSON.parse(getItem("responseHeader"));
      if (rh.client !== "") {
        const response = await fetch(
          `http://206.189.91.54/api/v1/channels/${recipient?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "access-token": rh["access-token"],
              client: rh.client,
              expiry: rh.expiry,
              uid: rh.uid,
            },
            mode: "cors",
          }
        );
        const data = await response.json();
        if (data.data) {
          setCurrentChannel(data.data);
          setItem("currentChannel", JSON.stringify(data.data));
        }
      }
    }

    get();
  };

  return {
    handleGetChannelData,
    handleSend,
    handleReceive,
    handleAddChannel,
    handleAddMembers,
  };
};
