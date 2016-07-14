// TrackList.js

import React from 'react'

import moment from 'moment'
import Track from 'components/Tracklist/Track'
// const HelloMessage = (props) => <div>Hello {props.name}</div>;

export default function(props) {

  console.log('Tracklist: props')
  console.log(props)

  const thumbs = []

  const tracks = props.tracks.map(function(track, index){
    return <Track track={track} index={index} profile={props.profile} key={track.id} />
  })


  // <Track key={track.id} track={track} />
  return (
  <table className="TrackList">
    <tbody>
      <tr>
        <th></th>
        <th>#</th>
        <th onClick={e=>props.sortBy('title')}>Title</th>
        <th onClick={e=>props.sortBy('playback_count')} className="col-plays number">Plays</th>
        <th onClick={e=>props.sortBy('comment_count')} className="col-comments number">Comments</th>
        <th onClick={e=>props.sortBy('favoritings_count')} className="col-favorites number">Favorites</th>
        <th onClick={e=>props.sortBy('download_count')} className="col-downloads number">Downloads</th>
        <th onClick={e=>props.sortBy('created_at')} className="col-date number">Uploaded</th>
      </tr>
      {tracks}
    </tbody>
  </table>
    )
}
