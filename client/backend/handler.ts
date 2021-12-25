import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import session from 'express-session';
import { initializeDatabase } from './initialize_database';
import { existsSync } from 'fs';
import { DATABASE_PATH } from './paths';

(async () => {
  if (!existsSync(DATABASE_PATH)) {
    console.log('initialize db');
    await initializeDatabase();
  }
})();

const connectMiddleware = (req: NextApiRequest, res: NextApiResponse, middleware: Function) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

const config = {
  proxy: true,
  resave: false,
  saveUninitialized: false,
  secret: 'secret',
  cookie: {
    httpOnly: true,
    sameSite: true,
  },
};

export const withSession = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectMiddleware(req, res, session(config));
};

const handler = nextConnect<NextApiRequest & { session: any }, NextApiResponse>({
  onError(error, req, res) {
    console.log(error);
    res.status(500).send(error);
  },
  onNoMatch(req, res) {
    console.log('no match');
    res.status(404).send('Not Found');
  },
});

export default handler;
