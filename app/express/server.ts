import express, { NextFunction, Request, Response } from 'express';

import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self' https://www.inzhagi.com https://*.inzagi.com https://inzagi.com https://verify.walletconnect.org");
    next();
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});


