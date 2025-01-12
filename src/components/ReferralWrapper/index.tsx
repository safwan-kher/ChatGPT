import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useCookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";

const addCookie = ({
  key,
  searchParams,
  setCookie,
}: {
  key: string;
  searchParams: URLSearchParams;
  setCookie: (name: string, value: any, options?: CookieSetOptions) => void;
}) => {
  const value = searchParams.get(key);

  if (value) {
    setCookie(key, value, {
      maxAge: 31622400,
      path: "/",
    });
  }
};

export const getReferral = (referralCookie: string) => {
  if (referralCookie) {
    if (referralCookie.toLowerCase().startsWith("partner-recommendation-")) {
      return ` - Referred by ${referralCookie.substring(
        "partner-recommendation-".length
      )}`;
    }
    return ` - Referred by ${referralCookie}`;
  } else {
    return "";
  }
};

const ReferralWrapper = ({ children }) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    const querySplit = router.asPath.split("?");
    if (querySplit.length === 2) {
      const query = new URLSearchParams(querySplit[1]);

      addCookie({ key: "ref", searchParams: query, setCookie });
      addCookie({ key: "utm_source", searchParams: query, setCookie });
      addCookie({ key: "utm_campaign", searchParams: query, setCookie });
      addCookie({ key: "utm_term", searchParams: query, setCookie });
      addCookie({ key: "utm_content", searchParams: query, setCookie });
    }
  }, []);

  return <>{children}</>;
};

export default ReferralWrapper;
