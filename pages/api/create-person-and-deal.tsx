import type { NextApiRequest, NextApiResponse } from "next";
import * as pipedrive from "pipedrive";
import getConfig from "next/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { serverRuntimeConfig } = getConfig();
  const defaultClient = pipedrive.ApiClient.instance;

  try {
    const source = req.cookies["utm_source"];
    const campaign = req.cookies["utm_campaign"];
    const term = req.cookies["utm_term"];
    const content = req.cookies["utm_content"];
    console.log(
      `Creating person and deal with the following data: ${JSON.stringify(
        { ...req.body, referer: req.headers.referer || "No referer :-(" },
        null,
        2
      )}`
    );
    const apiToken = defaultClient.authentications.api_key;
    apiToken.apiKey = serverRuntimeConfig.pipedriveApiKey;
    const personsApi = new pipedrive.PersonsApi();
    const {
      stageId,
      "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": leadSource,
      ...others
    } = req.body;

    const newLeadSource = leadSource
      ? source
        ? `${leadSource} - ${source}`
        : leadSource
      : undefined;

    const newPerson = pipedrive.NewPerson.constructFromObject({
      ...others,
      ...(source && { db06e3e14a0f82f5b83f222b7ca6fe063f27a672: source }),
      ...(campaign && { b490bf60434d42f0a3546a8ef14de8bbea2db9c9: campaign }),
      ...(term && { "993509904da8ed17ff9bf96d23d070dec8e196bb": term }),
      ...(content && { "757eda20fdb07e2f43a9fd755fb317b7c140c040": content }),
      ...(newLeadSource && {
        "19ddc486147c0bed2f2d0ca5a540854ef33bdf69": newLeadSource,
      }),
      owner_id: 11556668,
      visible_to: 3,
    });

    const person = await personsApi.addPerson(newPerson);

    const dealsApi = new pipedrive.DealsApi();
    const newDeal = pipedrive.NewDeal.constructFromObject({
      title: person.data.name,
      person_id: person.data.id,
      ...(stageId && { stage_id: stageId }),
      user_id: 11556668,
      visible_to: 3,
    });

    await dealsApi.addDeal(newDeal);

    res.status(200).json({ personId: person.data.id });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export default handler;
