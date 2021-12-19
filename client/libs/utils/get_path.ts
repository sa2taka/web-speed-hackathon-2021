/**
 * @param {string} imageId
 * @returns {string}
 */
function getImagePath(imageId: string): string {
  return `/images/${imageId}.jpg`;
}

/**
 * @param {string} movieId
 * @returns {string}
 */
function getMoviePath(movieId: string): string {
  return `/movies/${movieId}.gif`;
}

/**
 * @param {string} soundId
 * @returns {string}
 */
function getSoundPath(soundId: string): string {
  return `/sounds/${soundId}.mp3`;
}

/**
 * @param {string} profileImageId
 * @returns {string}
 */
function getProfileImagePath(profileImageId: string): string {
  return `/images/profiles/${profileImageId}.jpg`;
}

export { getImagePath, getMoviePath, getSoundPath, getProfileImagePath };
