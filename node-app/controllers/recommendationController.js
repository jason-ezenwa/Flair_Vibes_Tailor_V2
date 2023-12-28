import { response } from 'express';
import spotify_auth from '../utils/spotify_authentication.js';
import request from 'request';
import axios from 'axios'
import generateRecommendations from '../utils/generate_recommendations.js';
import getAudioFeatures from '../utils/get_audio_features.js';
import { cache } from '../utils/nodeCacheInstance.js';
class recommendationController {
  static async getRecommendations (req, res) {
    // handles the song inputed by the users and fetches its audio features.
    // get an access token whenever a user uses the service using client id and secret
    const access_token = await spotify_auth();
    let {song_name} = req.body;
    song_name = song_name.replace(/\./g, '').replace(/\?/g, '').trim();
    const {artist} = req.body;
    // search for the trackId and artistId which will be used to get audio features of the song
    const searchRequestOptions = {
      url: `https://api.spotify.com/v1/search?q=${song_name}+ artist:${artist}&type=track`,
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      json: true
    };
    const searchedSong = new Promise((resolve, reject) => {
      request.get(searchRequestOptions, async function (error, response, body) {
        if (!error && response.statusCode === 200) {
          resolve(body)
        }
        reject(error)
      })
    }).catch((error) => {
      return res.json({error: error});
    })
    const awaitedSearchResult = await searchedSong;
    let trackId;
    let artistId
    try {
      trackId = awaitedSearchResult['tracks']['items'][0]['id'];
      artistId = awaitedSearchResult['tracks']['items'][0]['album']['artists'][0]['id']
    } catch (error) {
      return res.status(500).json({error: 'wrong details inputed'});
    }

    // getting the audio features for the song
    const audioFeatures = await getAudioFeatures(trackId, access_token);
    const danceability = audioFeatures['danceability']
    const tempo = audioFeatures['tempo']
    const key = audioFeatures['key']
    
    try {
      //get recommendations
      const recommendations = await generateRecommendations(song_name, trackId, artistId, danceability, key, tempo, access_token)
      return res.status(200).json(recommendations);
    } catch (error) {
      res.status(500).json({error: error})
    }

  }

  static async getHottestSongs (request, response) {
    try {
      let hottestSongs = cache.get('hottestSongs');
      if (!hottestSongs) {
        // The Billboard-API is updated weekly and the Billboard chart is based on Saturday
        // so get the last saturday date:
        let today = new Date();
        // Check if today is Saturday (day index 6)
        if (today.getDay() === 6) {
          // If today is Saturday, lastSaturday will be the same as today
          var lastSaturday = today;
        } else {
          // Calculate the difference in days between today and the last Saturday
          let dayOfWeek = today.getDay(); // 0 for Sunday, 6 for Saturday
          let daysToSubtract = (dayOfWeek + 1) // Calculate days to subtract for last Saturday
          var lastSaturday = new Date(today.getTime() - daysToSubtract * 24 * 60 * 60 * 1000);
        }
    
        const formattedLastSaturday = lastSaturday.toISOString().slice(0, 10); // Format last Saturday's date (YYYY-MM-DD)
    
        const options = {
          method: 'GET',
          url: `https://billboard-api2.p.rapidapi.com/hot-100?date=${formattedLastSaturday}&range=1-10`,
          headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': `${process.env.RAPID_API_SECRET_KEY}`,
          'X-RapidAPI-Host': 'billboard-api2.p.rapidapi.com'
          },
        }
    
        const resp = (await axios(options)).data;
        hottestSongs = resp.content;
        console.log('new hottest songs gotten');
        cache.set('hottestSongs', hottestSongs, 86400);
      }
      console.log('existing hottest songs gotten');
      return response.status(200).json({
        message: 'hottest songs available',
        hottestSongs
      });
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
export default recommendationController;