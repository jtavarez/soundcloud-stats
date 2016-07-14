// Entry point
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'App'

import 'styles/normalize.css'
import 'styles/main.styl'

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

  export function getProfileDetails(profile, tracks){

    const sortedTracks = this.sortArray(tracks,'created_at')

    return {
      username: profile.username,
      id: profile.id,
      url: profile.permalink_url,
      avatarUrl: profile.avatar_url,
      fullName: profile.full_name,
      totalTracks: profile.track_count,
      totalFollowers: profile.followers_count,
      //
      totalPlays: this.getTotal(tracks, 'playback_count'),
      totalComments: this.getTotal(tracks, 'comment_count'),
      totalFavorites: this.getTotal(tracks, 'favoritings_count'),
      totalDownloads: this.getTotal(tracks, 'download_count'),
      //
      maxPlays: this.getMax(tracks, 'playback_count'),
      maxComments: this.getMax(tracks, 'comment_count'),
      maxFavorites: this.getMax(tracks, 'favoritings_count'),
      maxDownloads: this.getMax(tracks, 'download_count'),
      firstUpload: (sortedTracks && sortedTracks.length > 0) ? moment(sortedTracks[0].created_at) : undefined,


    }
  }

ReactDOM.render(<App/>, document.getElementById('root'))

