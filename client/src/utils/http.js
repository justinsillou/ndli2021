/**
 * Return true if the status code correspond to a success
 * @param {Number} status the status code
 * @returns {Boolean} true if the code is ok
 */
export const isOk = status => 200 <= status && status <= 299
