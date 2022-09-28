import fs from 'fs';
import path from 'path';
import { api } from '../../utils/api';

const WHITELISTED = process.env.WHITELISTED_DOMAIN;
const handler = api().get(async (req, res) => {
  // if (req.headers.referer === WHITELISTED) {
    const isProduction = process.env.NODE_ENV === 'production';
    console.log(isProduction);
    const remoteEntryPath = isProduction ? '_next/static/runtime/remoteEntry.js' : '.next/static/runtime/remoteEntry.js'
    console.log(remoteEntryPath);
    const filePath = path.join(process.cwd(), remoteEntryPath);
    console.log(filePath);
    const file = fs.readFileSync(filePath, { encoding: 'utf-8' });
    console.log(file)
    return res.send(file)
  // }
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  return res.end(JSON.stringify({ status: 'error', message: 'not whitelisted', whitelisted: WHITELISTED }))
})

export default handler
