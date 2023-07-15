// function that handles generation of recommendations using the spotify API
import request from 'request';
import NodeCache from 'node-cache';
import spotify_auth from './spotify_authentication.js';
const cache = new NodeCache();
async function generateRecommendations(songTitle, trackId, artistId, danceability, key, tempo, access_token) {
  // audio features query parameters tuned
  const min_danceability = danceability - 0.031
  const max_danceability = danceability + 0.3
  const min_tempo = tempo - 4
  const max_tempo = tempo + 10
  const min_key = key - 1
  const max_key = key + 3
  const min_popularity = 15
  const max_popularity = 100

  const recommendationsRequestOptions = {
    url: `https://api.spotify.com/v1/recommendations?limit=10&seed_artists=${artistId}&seed_tracks=${trackId}&min_danceability=${min_danceability}&max_danceability=${max_danceability}&min_key=${min_key}&max_key=${max_key}&min_popularity=${min_popularity}&max_popularity=${max_popularity}&min_tempo=${min_tempo}&max_tempo=${max_tempo}`,
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    json: true
  };
  const recommendationsResults = new Promise((resolve, reject) => {
    request.get(recommendationsRequestOptions, async function (error, response, body) {
      if (!error && response.statusCode === 200) {

        resolve(body)
      }
      reject(error)
    })
  }).catch((error) => {
    console.log(error);
  })

  const recommendations = await recommendationsResults;

  let recommendedTracks = [];
  for (const track of recommendations['tracks']) {
    const artist = track['artists'][0]['name']
    const trackTitle = track['name']
    const testTrackTitle = trackTitle.replace(/\./g, '').replace(/\?/g, '').trim()
    const trackLink = track['external_urls']['spotify'];
    const recommendedTrackId = track['id'];
    if (testTrackTitle.toLower !== songTitle) {
      recommendedTracks.push({title: trackTitle, artist: artist, link: trackLink, id: recommendedTrackId});
    }
  }
  const recommendedTracksResponse = {tracks: recommendedTracks};
  return recommendedTracksResponse;
}

export default generateRecommendations;