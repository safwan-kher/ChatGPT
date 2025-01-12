import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  score?: number,
  error?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const body = req.body
  const params = new URLSearchParams(Object.entries({
    secret: "6LdKe8kZAAAAAPpjYuFfkBWTkmNjEnBxyAszozMB",
    response: body.token,
  })).toString();
  const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: params,
    // body: JSON.stringify(),
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
  const json = await recaptchaResponse.json()
  if (json.score >= 0.5) {
    res.status(200).json({ score: json.score })
  } else {
    res.status(200).json({ error: "score too low" })
  }
}

export default handler