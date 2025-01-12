import type { NextApiRequest, NextApiResponse } from "next";
import * as pipedrive from "pipedrive";
import getConfig from "next/config";
import { z } from "zod";

const updatePersonPayloadSchema = z
  .object({
    id: z.number(),
  })
  .catchall(z.string());

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { serverRuntimeConfig } = getConfig();
  const defaultClient = pipedrive.ApiClient.instance;

  try {
    const parsedPayload = updatePersonPayloadSchema.parse(req.body);
    const apiToken = defaultClient.authentications.api_key;
    apiToken.apiKey = serverRuntimeConfig.pipedriveApiKey;
    const personsApi = new pipedrive.PersonsApi();
    const { id, ...other } = parsedPayload;
    const basicPerson = pipedrive.BasicPerson.constructFromObject(other);
    await personsApi.updatePerson(id, basicPerson);
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export default handler;
