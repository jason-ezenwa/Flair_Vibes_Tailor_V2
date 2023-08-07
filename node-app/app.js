import express, { json } from 'express';

const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import allRoutes from './routes/index.js';
//const authJwt = require('./utils/jwt');
import errorHandler from './utils/error_handler.js';

// get env variables from .env file
import 'dotenv/config';
// middleware
app.use(cors());
app.options('*', cors());
app.use(json());
app.use(morgan('tiny')); // logger
app.use(errorHandler);

const api = process.env.API_URL;
const PORT = process.env.PORT || 3000

app.use(`${api}`, allRoutes);


app.listen(PORT, '0.0.0.0', () => {
  console.log('App is listening...');
  console.log(`${api}`)
});

export default app;
