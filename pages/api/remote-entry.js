import fs from 'fs';
import path from 'path';
import { api } from '../../utils/api';

const WHITELISTED = process.env.WHITELISTED_DOMAIN;
const handler = api().get(async (req, res) => {
  // if (req.headers.referer === WHITELISTED) {
    try {
      const isProduction = process.env.NODE_ENV === 'production';
      const remoteEntryPath = isProduction ? '_next/static/runtime/remoteEntry.js' : '.next/static/runtime/remoteEntry.js'
      const filePath = path.join(process.cwd(), remoteEntryPath);
      const file = fs.readFileSync(filePath, { encoding: 'utf-8' });
      return res.send(file);
    } catch (error) {
      console.log(error);
      return error;
    }
  // }
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  return res.end(JSON.stringify({ status: 'error', message: 'not whitelisted', whitelisted: WHITELISTED }))
})

export default handler
