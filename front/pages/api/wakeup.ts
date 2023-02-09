import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    return res.status(200).send('wakeup');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error wakeup');
  }
}
