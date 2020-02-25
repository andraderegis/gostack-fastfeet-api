import fs from 'fs';
import path from 'path';

export const JWT_PARAMS = {
  privateKey: fs.readFileSync(
    path.resolve(__dirname, './auth/private.key'),
    'utf8'
  ),
  publicKey: fs.readFileSync(
    path.resolve(__dirname, './auth/public.key'),
    'utf8'
  ),
  options: {
    expiresIn: '1h',
    algorithm: 'RS256',
  },
};
