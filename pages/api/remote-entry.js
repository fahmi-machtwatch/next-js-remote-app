import { api } from '../../utils/api';

const WHITELISTED = process.env.WHITELISTED_DOMAIN;
const WHITELISTED_DOMAIN = WHITELISTED ? WHITELISTED.split(',') : [];
const HOST = process.env.HOST;

const handler = api().get(async (req, res) => {
  if (WHITELISTED_DOMAIN.includes(req.headers.referer)) {
    try {
      const file = await fetch(`${HOST}/_next/static/runtime/remoteEntry.js`)
      return res.send(file.body);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  return res.end(JSON.stringify({ status: 'error', message: 'not whitelisted', whitelisted: WHITELISTED_DOMAIN }))
})

export default handler
