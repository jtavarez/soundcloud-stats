

const statusCodes = {
  USERNAME_NOT_FOUND : {
    message: "Username could not be found.",
    tone: "negative"
  },
  CANNOT_CONNECT : {
    message: "There was a problem connecting to the API. Try again in a few minutes.",
    tone: "negative"
  },
  TRACK_COUNT_MISMATCH : {
    message: "There may be more tracks on account than what's being returned. This is a limitation of the Soundcloud API",
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

