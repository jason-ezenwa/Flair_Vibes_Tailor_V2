import { CronJob } from 'cron';
import axios from 'axios';
import { response } from 'express';

const fvtRenderHomeUrl = 'https://fvt-backend.onrender.com/api/v1/';
//const localhostHomeUrl = 'http://localhost:3000/api/v1/';
const fvtBackendHomeUrl = fvtRenderHomeUrl;

/**
 * calls '/' endpoint every 0 seconds, 14 minutes to keep the application running 
 * this prevents the render app from sleeping after 15 minutes of inactivity 
 */
export const job = new CronJob('0 */14 * * * *', async function () {
  if (fvtBackendHomeUrl === fvtRenderHomeUrl) {
    //console.log('starting job')
    try {
      const response = await axios.get(fvtBackendHomeUrl);
      if (response.status === 200) {
        console.log('preventing inactivity');
      }
    } catch (error) {
      console.log(error)
      console.log('unable to perform cron job to prevent inactivity');
    }
  }
});