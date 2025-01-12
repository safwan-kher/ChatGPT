import React, { useEffect } from "react";
import { useContext } from "react";

import { useCookies } from "react-cookie";
import { AppContext } from "../../../pages/_app";

export const getSession = (sessionCookie) => {
  return sessionCookie;
};

export const createEventId = () => {
  return createRandomString();
};

export const createRandomString = () => {
  return Math.random().toString(36).substr(2, 9);
};

const SessionWrapper = ({ children }) => {
  const [cookies, setCookie] = useCookies();
  const context = useContext(AppContext);

  useEffect(() => {
    if (!cookies.session) {
      const uniqueString = createRandomString();
      context.setSession(uniqueString);
      setCookie("session", uniqueString, {
        expires: new Date(Date.now() + 2592000),
        path: "/",
      });
    } else {
      context.setSession(cookies.session);
    }
  }, [cookies.session]);

  return <>{children}</>;
};

export default SessionWrapper;
