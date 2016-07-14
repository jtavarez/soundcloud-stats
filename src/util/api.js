import SC from 'soundcloud'
import Promise from 'bluebird'
import moment from 'moment'
import { statusCodes } from 'util/statusCodes'


export default {
  // Registers SC client
  init() {
    SC.initialize({
      client_id: 'c253daf4ffcb302ab8a46e940a70a86d'
    });    
  },
  // Given username, grabs profile data
  fetchUserInfo(username){
    return new Promise((resolve, reject)=>{
      SC.get(`/users/${username}`).then(info=>{
        resolve(info)
      }, err=>{
        console.error(`Trouble getting profile info for ${username}`)
        reject(err)
      });      
    })
  },
  // Given username, fetches array of tracks
  fetchTracksByUser(username){
    return new Promise((resolve, reject)=>{
      let totalTracks = []
      let limit = 100
      let offset = 0
      
      function getTrackBatch(href=`/users/${username}/tracks`){
        
        return SC.get(`/users/${username}/tracks`,
          {
            limit:limit,
            linked_partitioning:1,
            offset:offset
          }).then(function(tracks){
          console.log(`%c Tracks ${offset} to ${offset + tracks.collection.length-1} obtained`,'background: lightgray;')
          totalTracks.push(...tracks.collection)

          if (tracks.next_href) {
            // Large accounts' tracks can't be loaded for some reason
            // Instead of wasting time loading each batch of empty arrays
            // we just check collection on first batch to see if empty
            if (tracks.collection.length===0) {
              // This is technically still successful
              resolve(totalTracks)
            // Else continue with next batch
            } else {
              offset += limit
              getTrackBatch(tracks.next_href)              
            }
              
              

          } else {
            resolve(totalTracks)
          }
        })
      }
      var url = `https://api.soundcloud.com/users/${username}/tracks`
      getTrackBatch()
    })
  },
  /**
   * Run on user submit. We setup promises to retrieve profile info
   * and tracks separately. If either of them fail, the promise is rejected.
   * Otherwise seperate actions are dispatched to update the state, and then
   * the promise is resolved so component can update UI on client side.
   */
  startUserSearch(name, setProgress) {
    return new Promise((resolve, reject)=>{

      //   // logic for codes
      //   let status = "LOADED"
      //   if (profile.track_count === 0)
      //     status = "NO_TRACKS"
      //   if (profile.track_count > 0 && tracks.length===0)
      //     status = "TRACKS_NOT_LOADED"
      //   // if (profile)
      //   resolve(createResponse(status, {profile, tracks, metaDetails}))
      // // One or both promises are no cigar, reject to update UI accordingly
      // }).catch(err=>{
      //   console.error(err)
      //   let status;
      //   switch (err.status) {
      //     case 404:
      //       status = 'NOT_FOUND'
      //       break;
      //     default:
      //       status = 'ERROR'
      //   }
      //   // This is an error but we still resolve 'successfuly' back to our Vue component
      //   // to render alert message
      //   // resolve(createResponse(status, {profile, tracks, metaDetails}))
      // })

      // Get profile and tracks
      Promise.all([
        this.fetchUserInfo(name),
        this.fetchTracksByUser(name)
        ])
      .spread((profile, tracks)=>{

        let metaDetails = {
           maxPlays : 0,
           maxComments : 0,
           maxFavorites : 0,
           maxDownloads : 0,
           firstUpload : (tracks && tracks.length>0) ? tracks[tracks.length-1].created_at : null,

           totalPlays : 0,
           totalComments : 0,
           totalFavorites : 0,
           totalDownloads : 0,
        }

        

        // this.firstUpload = tracks[tracks.length-1].created_at

        // Some stats from API call are undefined for whatever reason. That will mess up
        // our background bars if we don't check for that
        tracks.forEach( track=> {

          if (
            track.playback_count===undefined ||
            track.comment_count===undefined ||
            track.favoritings_count===undefined ||
            track.download_count===undefined
            ) {
            track.noStats = true;
          }

          track.playback_count = track.playback_count || 0
          track.comment_count = track.comment_count || 0
          track.favoritings_count = track.favoritings_count || 0
          track.download_count = track.download_count || 0

          
          metaDetails.maxPlays = metaDetails.maxPlays >= track.playback_count ? metaDetails.maxPlays : track.playback_count
          metaDetails.maxComments = metaDetails.maxComments >= track.comment_count ? metaDetails.maxComments : track.comment_count
          metaDetails.maxFavorites = metaDetails.maxFavorites >= track.favoritings_count ? metaDetails.maxFavorites : track.favoritings_count
          metaDetails.maxDownloads = metaDetails.maxDownloads >= track.download_count ? metaDetails.maxDownloads : track.download_count

          metaDetails.totalPlays += track.playback_count
          metaDetails.totalComments += track.comment_count
          metaDetails.totalFavorites += track.favoritings_count
          metaDetails.totalDownloads += track.download_count

          track.created_at = moment(track.created_at, 'YYYY/MM/DD') 
        })



        // default status, means no alert to show
        let status = null
        // Can go by tracks.length or profile.track_count
        
        if (profile.track_count !== tracks.length)
          status = statusCodes.TRACK_COUNT_MISMATCH
        else if (tracks.length === 0)
          status = statusCodes.NO_TRACKS

        resolve({
          profile : Object.assign(profile, metaDetails),
          tracks,
          status
        })
      // One or both promises are no cigar, reject to update UI accordingly
      }).catch(err=>{
        console.error(err)
        let status = null
        switch (err.status) {
          case 404:
            status = statusCodes.USERNAME_NOT_FOUND
            break;
          default:
            status = statusCodes.CANNOT_CONNECT
        }
        // This is an error but we still resolve 'successfuly' back to our Vue component
        // to render alert message
        resolve({
          profile : false,
          tracks : [],
          status
        })
      // We are finished with our loading of data (regardless of success)
      }).done(()=>{

    })
  })
  }
}