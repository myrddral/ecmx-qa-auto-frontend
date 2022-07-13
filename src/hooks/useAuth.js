import { useEffect } from "react";
import useStore from "../store/useStore";
import { Buffer } from "buffer";
import { getApiUrl } from "../utils/helpers";

const useAuth = () => {
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  useEffect(() => {
    function parseJwt(token) {
      try {
        const base64Payload = token.substring(7).split(".")[1];
        const payload = Buffer.from(base64Payload, "base64");
        return JSON.parse(payload);
      } catch (e) {
        console.error(e);
        return null;
      }
    }

    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      const decodedJwt = parseJwt(localStorage.getItem("token"));
      if (decodedJwt.exp * 1000 < Date.now()) {
        handleLogout();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogin(values) {
    const response = await fetch(`${getApiUrl()}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const user = await response.json();
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
    localStorage.setItem("token", response.headers.get("Authorization"));
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser();
  }

  return { handleLogin, handleLogout };
};

export default useAuth;
