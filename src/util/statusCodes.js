import React from 'react'

const statusCodes = {
  INTRO : {
    message: "Search for a Soundcloud user to get started. Choice examples: ErraticNYC, Deep-Space-Helsinki, Reclaim-Your-City",
    tone: "neutral"
  },
  USERNAME_NOT_FOUND : {
    message: "Username could not be found.",
    tone: "negative"
  },
  CANNOT_CONNECT : {
    message: "There was a problem connecting to the API. Try again in a few minutes.",
    tone: "negative"
  },
  TRACK_COUNT_MISMATCH : {
    message: "There's probably more tracks on account than what's being shown. This is a limitation of the Soundcloud API",
    tone: "neutral"
  },
  NO_TRACKS : {
    message: "This user doesn't have any tracks",
    tone: "neutral"
  },
  LOGGED_IN_USER : {
    message: "Using the logged in account for initial search. Enjoy!",
    tone: "neutral"
  }
}

export { statusCodes }

