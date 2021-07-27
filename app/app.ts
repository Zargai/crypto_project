import 'reflect-metadata';
import config from './config/index';
import express from 'express';
//import Logger from './lib/logger';

async function startServer() {
  const app = express();
  await require('./lib').default({ expressApp: app });
  app.listen(config.port, (err: any) => {
    if (err) {
      console.log(err);
      process.exit(1);
      // return;
    }
    console.log(`
      ################################################
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
             Server listening on port: ${config.port}
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      ################################################
    `);
  });
}

startServer();