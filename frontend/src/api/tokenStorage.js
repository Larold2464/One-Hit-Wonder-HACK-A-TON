const ACCESS_KEY = 'feedy_access_token'
const REFRESH_KEY = 'feedy_refresh_token'
const USER_ID_KEY = 'feedy_user_id'
const USERNAME_KEY = 'feedy_username'

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

export function getStoredUser() {
  const id = localStorage.getItem(USER_ID_KEY)
  const username = localStorage.getItem(USERNAME_KEY)
  return id && username ? { id: Number(id), username } : null
}

export function setStoredUser({ id, username }) {
  localStorage.setItem(USER_ID_KEY, String(id))
  localStorage.setItem(USERNAME_KEY, username)
}

export function clearStoredTokens() {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(USER_ID_KEY)
  localStorage.removeItem(USERNAME_KEY)
}