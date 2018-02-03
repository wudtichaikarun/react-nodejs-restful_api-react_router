import Cookies from 'js-cookie'

// get from header
function getTokenFromHeaders(headers) {
  return headers.get('Authorization')
}

// get from cookies
function getToken() {
  return Cookies.get('access-token')
}

// remove cookies
function removeToken() {
  Cookies.remove('access-token')
}

function setToken(headers) {
  Cookies.set('access-token', getTokenFromHeaders(headers))
}

export default { setToken, getToken, removeToken }