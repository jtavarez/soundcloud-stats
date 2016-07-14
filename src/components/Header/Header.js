// Search.js

import React from 'react'
import {
  DEFAULT_USERNAME_TEXT,
  keys
} from 'util.js'

export default class Search extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      searchValue : ''
    }
  }

  onKeyDown(e) {
    if (e.keyCode === keys.ENTER) {
      if (this.state.searchValue.trim().length>0) {
        this.props.submit(this.state.searchValue.trim())
        this.setState({searchValue:""})
      }
    }
  }

  onChange(value) {
    this.setState({searchValue:value})    
  }

  render(){

    // const avatarUrl = this.props.profile.avatar_url || iconSpeaker
    // const avatarUrl = this.props.profile.avatar_url || iconSpeaker
    const avatar = <div className="Header__user__avatar"><img src={this.props.profile.avatarUrl} /></div>

    const username = <span className="Header__user__accountName">{this.props.profile.username || DEFAULT_USERNAME_TEXT}</span>
    const fullName = <span className="Header__user__fullName"> ({this.props.profile.fullName})</span>
    const loader = (this.props.isLoading) ? <div className="loader"></div> : null

    return (
      <div className="Header">
        <hgroup>
        <header id="user" className="Header__user">
          {avatar}
          <h2>{username}{this.props.profile.fullName ? fullName : null}</h2>
        </header>
        <header className="Header__search">
          {loader}
          <input className="Header__search__input" type="text" onChange={e=>this.onChange(e.target.value)} onKeyDown={e=>this.onKeyDown(e)} value={this.state.searchValue} placeholder="Enter username" />
        </header>
        </hgroup>
        
      </div>
    )

  }


  


}