import React from 'react'

export default class Track extends React.Component {
  shouldComponentUpdate(){
    return false
  }
  render(){
    const track = this.props.track
    return (
          <tr className="track">
            <td className="col-img">
              <span className="TrackList__thumbnail">
                <span className="TrackList__thumbnail__placeholder"></span>
                <img data-src={track.artwork_url || track.user.avatar_url} />
              </span>
              
            </td>
            <td>{this.props.index+1}</td>
            <td className="col-title"><a href={track.permalink_url} target="_blank">{track.title}</a></td>
            <td className="col-plays TrackList__number">
              <span className="bar" style={{width: (track.playback_count/this.props.profile.maxPlays)*100+'%'}}></span>
              <span className="label">{track.playback_count}</span>
            </td>
            <td className="col-comments TrackList__number">
              <span className="bar" style={{width: (track.comment_count/this.props.profile.maxComments)*100+'%'}}></span>
              <span className="label">{track.comment_count}</span>
            </td>
            <td className="col-favorites TrackList__number">
              <span className="bar" style={{width: (track.favoritings_count/this.props.profile.maxFavorites)*100+'%'}}></span>
              <span className="label">{track.favoritings_count}</span>
            </td>
            <td className="col-downloads TrackList__number">
              <span className="bar" style={{width: (track.download_count/this.props.profile.maxDownloads)*100+'%'}}></span>
              <span className="label">{track.download_count}</span>
            </td>
            <td className="col-date TrackList__date">{track.created_at.format('MMM-DD-YYYY')}</td>
          </tr>
          )
  }
}