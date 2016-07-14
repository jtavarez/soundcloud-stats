// Entry point
import moment from 'moment'

export const DEFAULT_USERNAME_TEXT = 'Search for a username to get started'
export const keys = {
  ENTER : 13
}

function getTotal(array, key) {
  let total = 0;
  for (let i=0,l=array.length; i<l; i++) {
    total += array[i][key]
  }
  console.log(total)
  return total
}
function getMax(array, key) {
  let max = 0;
  for (let i=0,l=array.length; i<l; i++) {
    max = (max>array[i][key]) ? max : array[i][key]
  }
  console.log(max)
  return max
}

function sortArray(array,key) {
  let clonedArray = array.slice(0)
  clonedArray.sort((elementA,elementB)=>{
    if (elementA[key]>elementB[key]) return 1
    if (elementA[key]<elementB[key]) return -1
    return 0
  })
  return clonedArray
}

export function getProfileDetails(profile, tracks){

  const sortedTracks = sortArray(tracks,'created_at')

  return {
    username: profile.username,
    id: profile.id,
    url: profile.permalink_url,
    avatarUrl: profile.avatar_url,
    fullName: profile.full_name,
    totalTracks: profile.track_count,
    totalFollowers: profile.followers_count,
    //
    totalPlays: getTotal(tracks, 'playback_count'),
    totalComments: getTotal(tracks, 'comment_count'),
    totalFavorites: getTotal(tracks, 'favoritings_count'),
    totalDownloads: getTotal(tracks, 'download_count'),
    //
    maxPlays: getMax(tracks, 'playback_count'),
    maxComments: getMax(tracks, 'comment_count'),
    maxFavorites: getMax(tracks, 'favoritings_count'),
    maxDownloads: getMax(tracks, 'download_count'),
    firstUpload: (sortedTracks && sortedTracks.length > 0) ? moment(sortedTracks[0].created_at) : undefined,
  }
}


export function prepareTracks(tracks){
  tracks.forEach(track => track.created_at = moment(track.created_at))
  return tracks
}



