import dotenv from 'dotenv';

const envFound = dotenv.config();
if (!envFound) {

  console.log("Couldn't find .env file");
}
export default {
  port: parseInt(process.env.PORT),
  databaseURL: process.env.MONGODB_URI,
  api: {
    prefix: '/api',
  },
  agenda:{
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY)
  }
};