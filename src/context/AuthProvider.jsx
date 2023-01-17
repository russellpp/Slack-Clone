import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState("");
  const [recipient, setRecipient] = useState(null);
  const [receiverClass, setReceiverClass] = useState("user");
  const [emailList, setEmailList] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sendStatus, setSendStatus] = useState(false);
  const [targetURL, setTargetURL] = useState(false);
  const [isAddingChannel, setIsAddingChannel] = useState(false);
  const [addMembersList, setAddMembersList] = useState([]);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [resHeader, setResHeader] = useState({
    "access-token": "",
    client: "",
    expiry: "",
    uid: "",
  });
  const [recMessages, setRecMessages] = useState();
  const [createChannelName, setCreateChannelName] = useState(null);
  const [channelList, setChannelList] = useState([]);
  const [currentChannel, setCurrentChannel] = useState({});
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isAddingMembers, setIsAddingMembers] = useState(false);
  const [loginState, setLoginState] = useState(null);
  const [urlID, setUrlID] = useState("");

  const value = {
    urlID,
    setUrlID,
    isLoggedIn,
    setIsLoggedIn,
    isRedirecting,
    setIsRedirecting,
    isNewMessage,
    setIsNewMessage,
    auth,
    setAuth,
    user,
    setUser,
    resHeader,
    setResHeader,
    recipient,
    setRecipient,
    emailList,
    setEmailList,
    message,
    setMessage,
    receiverClass,
    setReceiverClass,
    sendStatus,
    setSendStatus,
    targetURL,
    setTargetURL,
    recMessages,
    setRecMessages,
    isAddingChannel,
    setIsAddingChannel,
    addMembersList,
    setAddMembersList,
    createChannelName,
    setCreateChannelName,
    channelList,
    setChannelList,
    currentChannel,
    setCurrentChannel,
    isAddingMembers,
    setIsAddingMembers,
    loginState,
    setLoginState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
