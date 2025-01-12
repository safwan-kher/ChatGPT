import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setPreviewData({});
  res.end("Preview mode enabled");
};
