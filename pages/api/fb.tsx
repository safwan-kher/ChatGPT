import type { NextApiRequest, NextApiResponse } from "next";
import {
  ServerEvent,
  EventRequest,
  UserData,
  CustomData,
} from "facebook-nodejs-business-sdk";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;
    const country = req.body.country;
    const city = req.body.city;
    const externalId = req.body.externalId;
    const clientUserAgent = req.body.userAgent;
    const eventId = req.body.eventId;
    const eventName = req.body.eventName;
    const eventSourceUrl = req.body.eventSourceUrl;
    const customDataObj = req.body.customDataObj || {};
    const clientIp = req.headers["x-nf-client-connection-ip"];
    // console.log(req.headers);
    const userAgent = req.headers["user-agent"];
    const fbp = req.cookies["_fbp"];
    const fbc = req.cookies["_fbc"];

    const userData = new UserData();
    userData.setClientUserAgent(clientUserAgent);
    userData.setExternalId(externalId);

    if (firstName) {
      userData.setFirstName(firstName);
    }
    if (lastName) {
      userData.setLastName(lastName);
    }
    if (email) {
      userData.setEmail(email);
    }
    if (phone) {
      userData.setPhone(phone);
    }
    if (country) {
      userData.setCountry(country);
    }
    if (city) {
      userData.setCity(city);
    }
    if (clientIp && typeof clientIp === "string") {
      userData.client_ip_address = clientIp;
    }
    if (userAgent && typeof userAgent === "string") {
      userData.client_user_agent = userAgent;
    }
    if (fbp) {
      userData.fbp = fbp;
    }
    if (fbc) {
      userData.fbc = fbc;
    }

    const customData = new CustomData();
    customData.setCustomProperties(customDataObj);
    if (eventName === "Purchase") {
      customData.setValue(500);
      customData.setCurrency("EUR");
    }

    const serverEvent = new ServerEvent();
    serverEvent.setEventName(eventName);
    serverEvent.setEventTime(Math.floor(new Date().getTime() / 1000));
    serverEvent.setUserData(userData);
    serverEvent.setActionSource("website");
    serverEvent.setEventId(eventId);
    serverEvent.setCustomData(customData);
    serverEvent.setEventSourceUrl(eventSourceUrl);
    // console.log(eventSourceUrl);

    const facebookAccessToken =
      "EAAEg5ZCH9u18BABC8oyD9cizgsicl3z4P0aFOvLCVnukSdjjfoPbqfgHyziGyb90VPJnxRfNFAlO4iaVQRNlAiaQ8fzLqRXr6OQ150BKZBER5ZC9xn0oR9Xm2ofvaJ0mqSY7dngCtJKGByZAefIOJf6vDMR2a2ZCOZAZAQf4k1bD3oObhn7rqyv1a3Ud7eV1ZBsZD";
    const facebookPixelId = "690276994903670";

    const eventRequest = new EventRequest(
      facebookAccessToken,
      facebookPixelId
    ).setEvents([serverEvent]);
    await eventRequest.execute();
    res.status(200).end();
  } catch (e) {
    console.error(e.message);
    res.status(200).end();
  }
};
