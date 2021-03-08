/**
 * Removes the token from the URL so we can log without revealing secrets
 * <p>
 * Normally this would be done by systems such as gitlab secrete removing feature. However,
 * for extra security it is removed to decrease the chance of leaking.
 *
 *
 * @param {String} url to process
 * @param {String} token to remove
 * @returns {String} updated url for logging
 */
export function removeTokenFromUrl(url, token) {
    return url.replace(token, "####")
}

export function genericUrlError(url, err) {
    return console.error('Failed to make call ' + url, err)
}