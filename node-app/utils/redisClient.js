import { createClient } from 'redis';
// get env variables from .env file
import 'dotenv/config';

const redisClient = await createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
})
  .on('error', err => console.log('Redis Client Error', err))
  .connect();


export default redisClient;