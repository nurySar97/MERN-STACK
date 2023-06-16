import { useCallback, useState, useEffect } from "react";
const STORAGE_NAME = "USER_DATA";

export const useAuth = () => {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((token, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem(STORAGE_NAME, JSON.stringify({ userId, token }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(STORAGE_NAME);
  }, []);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem(STORAGE_NAME));

    if (data?.token) {
      login(data.token, data.userId);
    }

    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready };
};
