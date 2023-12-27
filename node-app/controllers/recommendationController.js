import { response } from 'express';
import spotify_auth from '../utils/spotify_authentication.js';
import request from 'request';
import generateRecommendations from '../utils/generate_recommendations.js';
import getAudioFeatures from '../utils/get_audio_features.js';
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

  static async getHottestSongs () {
    const options = {
      method: 'GET',
      url: 'https://billboard-api2.p.rapidapi.com/hot-100?date=2023-12-23&range=1-10',
      headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': `${process.env.RAPID_API_SECRET_KEY}`
      },
    }

    const response = axio
  }
}
export default recommendationController;