// Helper function to convert a given duration in seconds to "Xh Ym" or "Xm Ys" or "Xs" format
function convertSecondsToDuration(totalSeconds) {
  const seconds = parseInt(totalSeconds) || 0
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  } else {
    return `${remainingSeconds}s`
  }
}

module.exports = {
  convertSecondsToDuration,
}
