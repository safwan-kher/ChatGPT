import React, { useEffect } from "react";
import { useRouter } from "next/router";

import api from "api";

import { useCookies } from "react-cookie";

import { getSession } from "components/Session";
import { useContext } from "react";
import { AppContext } from "../../../pages/_app";

const PixelWrapper = ({ children }) => {
  const [cookies] = useCookies();
  const router = useRouter();
  const context = useContext(AppContext);

  useEffect(() => {
    if ((window as any).ttq) {
      (window as any).ttq.track("Browse");
    }
    const handleRouteChange = () => {
      if ((window as any).ttq) {
        (window as any).ttq.track("Browse");
      }
      if (context.session) {
        api.trackFbEvent({
          eventName: "PageView",
          externalId: context.session,
          customDataObj: {},
        });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [context.session]);

  return <>{children}</>;
};

export default PixelWrapper;
