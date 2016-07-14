import React from 'react'
import moment from 'moment'
import debounce from 'lodash.debounce'

import {Header} from 'components/Header'
import {PrimaryDetails} from 'components/PrimaryDetails'
import {Alert} from 'components/Alert'
import {TrackList} from 'components/TrackList'

import sc from 'util/api.js'
import profile from 'util/_mockdata_profile.json'
import tracks from 'util/_mockdata_tracks.json'

import {
  getProfileDetails,
  prepareTracks,
} from 'util.js'
import { statusCodes } from 'util/statusCodes'

// Array of DOM nodes for <img> lazy loading
// Kept out of React lifecycle
let imgArray = []

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : false,
      sortCol : 'created_at',
      sortDir : -1,
      status : statusCodes.INTRO,
      // tracks : prepareTracks(tracks),
      // profile: getProfileDetails(profile,tracks),
      tracks : [],
      profile: {},
    }
  }
  componentWillMount(){
    // Ready Soundcloud API
    sc.init()

    window.addEventListener('scroll', debounce( (e)=>{
      checkViewPortLazyLoads()
    }, 250))
  }
  
  // Initial render
  componentDidMount(){
    imgArray = document.querySelectorAll('.TrackList__thumbnail img')
    checkViewPortLazyLoads()
  }
  componentDidUpdate(){
    imgArray = document.querySelectorAll('.TrackList__thumbnail img')
  }



  sortArray(array,key) {
    let clonedArray = array.slice(0)
    clonedArray.sort((elementA,elementB)=>{
      if (elementA[key]>elementB[key]) return 1
      if (elementA[key]<elementB[key]) return -1
      return 0
    })
    return clonedArray
  }



  setProgress(message, counter=null) {
    console.log('setProgress()')
    console.log(message, counter)
    // this.setState({
    //   alert : {
    //     tone : isNeutral ? 'neutral' : 'negative',
    //     message
    //   },
    //   isLoading : false
    // })
  }

  setColSort = name => {
    console.log(`setColSort(${name})`)
    
    // Clicking on column headers (to sort table)
    this.setState({
      sortCol : name,
      sortDir : (name===this.state.sortCol) ? this.state.sortDir*-1 : -1
    })

    // ga('send', {
    //   hitType: 'event',
    //   eventCategory: name,
    //   eventAction: this.state.sortDir===-1 ? 'DESC' : 'ASC',
    //   eventLabel: 'Sorting'
    // });
    
  }



  // When user presses enter with text in input
  submitUserSearch = (name) => {
    
    this.setState({
      isLoading : true
    })


    sc.startUserSearch(name, this.setProgress).then(data=>{
      this.setState({
        isLoading : false,
        tracks : prepareTracks(data.tracks),
        profile: getProfileDetails(data.profile,data.tracks),
        status : data.status,
        sortCol : 'created_at',
        sortDir : -1,
      })
    }).catch(err=>{
      console.warn(err)
    })


  }

  sortByColumn = (array) => {

    const name = this.state.sortCol
    const dir  = this.state.sortDir
    
    array.sort((a,b)=>{
      if (a[name] < b[name])
        return -(dir);
      else if (a[name] > b[name])
        return dir;
      else 
        return 0;  
    })

    window.setTimeout(()=>{
      checkViewPortLazyLoads()  
    },100)
    
    return array

  }

  render() {
    const tracklist = this.sortByColumn(this.state.tracks)
    return (
      <div id="app" className={this.state.isLoading?'loading':''}>
        <h1><b>PURE STATS.</b> Get stats for any* Soundcloud user’s track collection. Learn more.</h1>
        
        <Header
          submit={this.submitUserSearch}
          isLoading={this.state.isLoading}
          profile={this.state.profile}/>

        <Alert status={this.state.status} />
        <PrimaryDetails profile={this.state.profile} />
        <TrackList profile={this.state.profile} sortBy={this.setColSort} tracks={this.state.tracks} />
      </div>
    )
  }
}




function checkViewPortLazyLoads(){
  console.log('checkViewPortLazyLoads')
  var doc = document.documentElement;
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  
  var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
  
  let minRange = top
  let maxRange = top + h
  for (let img of imgArray) {
    if (img.y > minRange && img.y < maxRange && !img.getAttribute('src')) {
      window.setTimeout(()=>{loadImage(img)}, randomIntFromInterval(0,700))
    }
  }
}

/**
 * Given an <img/> with a data-src attribute, sets 'src' attr of img
 * (creating http request for image). Also adds 'loaded' class to parent
 * element
 */
function loadImage(elem){
  elem.setAttribute('src', elem.dataset.src)
  elem.parentElement.classList.add('TrackList__thumbnail--loaded')
}

function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
