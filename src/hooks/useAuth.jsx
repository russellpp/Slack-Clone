import { useEffect } from "react";
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const LOGIN_URL = "/api/v1/auth/sign_in";

export const useAuth = () => {
  const { setResHeader, setIsLoggedIn, setAuth, setLoginState } =
    useContext(AuthContext);
  const { user, addUser, removeUser } = useUser();
  const { getItem, setItem } = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(user);
    }
  }, []);

  const login = async (loginDetails) => {
    try {
      const res = await axios.post(LOGIN_URL, loginDetails);

      setResHeader({
        "Access-Control-Allow-Origin": "*",
        "access-token": res?.headers["access-token"],
        client: res?.headers.client,
        expiry: res?.headers.expiry,
        uid: res?.headers.uid,
      });
      addUser(loginDetails.email);
      setLoginState("success");
      setIsLoggedIn(true);
      setAuth(res?.data.data);
      navigate("/Dashboard");
    } catch (err) {
      if (!err?.response) {
        alert("No server response");
      } else {
        alert(err.response.data.errors[0]);
      }
      setLoginState("error");
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    removeUser();
    setItem("user", null);
    setItem("auth", "{}");
    setItem("loggedIn", false);
    setItem("responseHeaders", "");
    setItem("channels", "");
    setLoginState("");
    navigate("/Home/Login");
  };

  return { user, login, logout };
};
