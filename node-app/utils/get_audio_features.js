// handles retrieveal of audio features
import request from 'request';
async function getAudioFeatures(trackId, access_token) {
  const audioFeaturesRequestOptions = {
    url: `https://api.spotify.com/v1/audio-features/${trackId}`,
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    json: true
  };
  const audioFeaturesResults = new Promise((resolve, reject) => {
    request.get(audioFeaturesRequestOptions, async function (error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(body)
      }
      reject(error)
    })
  }).catch((error) => {
    return {error: error};
  })

  const resolvedAudioFeaturesResults = await audioFeaturesResults;
  // get the important audio features danceability, tempo and key
  const danceability = resolvedAudioFeaturesResults['danceability']
  const tempo = resolvedAudioFeaturesResults['tempo']
  const key = resolvedAudioFeaturesResults['key']
  return {tempo, danceability, key};
}

export default getAudioFeatures;