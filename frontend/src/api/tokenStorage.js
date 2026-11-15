const ACCESS_KEY = 'feedy_access_token'
const REFRESH_KEY = 'feedy_refresh_token'
const HOST_SESSION_KEY = 'feedy_host_session'

export function readHostSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(HOST_SESSION_KEY))
    return saved?.session_id ? saved : null
  } catch {
    return null
  }
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY)
}

export function setAccessToken(token) {
  localStorage.setItem(ACCESS_KEY, token)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY)
}

export function setRefreshToken(token) {
  localStorage.setItem(REFRESH_KEY, token)
}

export function clearStoredTokens() {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(HOST_SESSION_KEY)
}

export function writeHostSession(value) {
  try {
    if (value) localStorage.setItem(HOST_SESSION_KEY, JSON.stringify(value))
    else localStorage.removeItem(HOST_SESSION_KEY)
  } catch {
    // storage unavailable: still works until refresh
  }
}