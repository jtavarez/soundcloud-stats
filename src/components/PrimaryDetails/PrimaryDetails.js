// Meta.js

import React from 'react'
import moment from 'moment'


export default function(props) {
  console.log('Meta: props')
  console.log(props)

  let firstUpload
  let tenure = ""

  if (props.profile) {

    firstUpload = moment(props.profile.firstUpload)
    // let firstUpload = moment('2016-06-07')

    const today = moment()
    let years = today.year() - firstUpload.year()
    let months = today.month() - firstUpload.month()
    let days = today.date() - firstUpload.date()

    if (days<0){
      months--
      days = moment(firstUpload).endOf('month').add(days, 'days').date()
    }  
    if (months<0){
      years--
      months = moment(firstUpload).endOf('year').add(months, 'months').month()+1
    }


    
    if (years>0) {
      tenure += (years===1) ? '1 year' : `${years} years`
      if (months>0 || days>0)
        tenure += ', '
    }
    if (months>0) {
      tenure += (months===1) ? '1 month' : `${months} months`
      if (days>0)
        tenure += ', '
    }
    if (days>0) {
      tenure += (days===1) ? '1 day' : `${days} days`
    }
  }
  // console.error((props.profile.id)?'true':'false')
  const id = props.profile.id
  let details = {
    totalTracks : id ? props.profile.totalTracks : 0,
    totalFollowers : id ? props.profile.totalFollowers : 0,
    totalPlays : id ? props.profile.totalPlays : 0,
    totalComments : id ? props.profile.totalComments : 0,
    totalFavorites : id ? props.profile.totalFavorites : 0,
    totalDownloads : id ? props.profile.totalDownloads : 0,
    tenure : id ? tenure : 'None',
    firstUpload : id ? firstUpload.format('MMM-DD-YYYY') : 'NA'
  }

  
  return (
  <table className="PrimaryDetails">
    <tbody>
      <tr>
        <th>Tracks</th>
        <th>Followers</th>
        <th>First Upload</th>
        <th className="PrimaryDetails__totals" colSpan="5">Totals</th>
      </tr>
      <tr>
        <td>{details.totalTracks}</td>
        <td>{details.totalFollowers}</td>
        <td>{details.firstUpload}</td>
        <td className="col-number col-plays">{details.totalPlays}</td>
        <td className="col-number col-comments">{details.totalComments}</td>
        <td className="col-number col-favorites">{details.totalFavorites}</td>
        <td className="col-number col-downloads">{details.totalDownloads}</td>
        <td className="col-number col-tenure">{details.tenure}</td>
      </tr>
    </tbody>
  </table>
    )
}
