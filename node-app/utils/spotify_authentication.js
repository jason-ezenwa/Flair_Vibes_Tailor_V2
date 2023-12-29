// handles getting auth token for the app.
import request from 'request';
import redisClient from './redisClient.js'


async function spotify_auth() {
  const access_token = await redisClient.get('access_token');
  if (access_token) {
    return access_token;
  }
  const client_id = process.env.CLIENT_ID
  const client_secret = process.env.CLIENT_SECRET

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
    
  const newAccessToken = new Promise((resolve, reject) => {
    request.post(authOptions, async function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const token = await body.access_token;
        resolve(token);
      }
      reject(error);
    })
  })
  const resolvedAccessToken = await newAccessToken;
  await redisClient.set('access_token', resolvedAccessToken)
  await redisClient.expire('access_token', 3200)
  return resolvedAccessToken;
}

export default spotify_auth;