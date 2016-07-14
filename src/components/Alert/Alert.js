// ALERT.js
import React from 'react'
import classNames from 'classnames'

const Alert = function({status}) {

  if (status===null)
    return null

  const alertClass = classNames(`Alert`, `Alert--${status.tone}`)
  return <div className={alertClass}><p>{status.message}</p></div>
}

Alert.propTypes = {
  status :  React.PropTypes.shape({
    tone: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired
  }),
}

export default Alert