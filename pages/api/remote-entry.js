import fs from 'fs';
import path from 'path';
import { api } from '../../utils/api';

const WHITELISTED = process.env.WHITELISTED_DOMAIN;
const handler = api().get(async (req, res) => {
  if(req.headers.referer === WHITELISTED) {
    const filePath = path.join(process.cwd(), `.next/static/runtime/remoteEntry.js`);
    const file = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return res.send(file)
  }
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  return res.end(JSON.stringify({ status: 'error', message: 'not whitelisted', whitelisted: WHITELISTED }))
})

export default handler
