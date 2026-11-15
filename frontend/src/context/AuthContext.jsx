import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { loginUser, refreshToken as refreshTokenRequest } from '../api/auth'
import { setAuthCallbacks } from '../api/client'
import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  clearStoredTokens,
} from '../api/tokenStorage'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Lazy initial state: read localStorage once on mount, so a page reload
  // starts out logged in if a token is already stored.
  const [token, setToken] = useState(() => getAccessToken())

  const logout = useCallback(() => {
    clearStoredTokens()
    setToken(null)
  }, [])

  const login = useCallback(async ({ username, password }) => {
    const res = await loginUser({ username, password })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.detail ?? 'Login failed')
    }
    // SimpleJWT's TokenObtainPairView returns { access, refresh }
    setAccessToken(data.access)
    setRefreshToken(data.refresh)
    setToken(data.access)
  }, [])

  // Give the API client a way to refresh the token on a 401 and to log out
  // when refreshing is no longer possible.
  useEffect(() => {
    setAuthCallbacks({
      onTokenRefresh: async () => {
        const refresh = getRefreshToken()
        if (!refresh) throw new Error('No refresh token')
        const res = await refreshTokenRequest({ refresh })
        if (!res.ok) throw new Error('Refresh failed')
        const data = await res.json()
        setAccessToken(data.access)
        // Only present if ROTATE_REFRESH_TOKENS is on in Django settings
        if (data.refresh) setRefreshToken(data.refresh)
        setToken(data.access)
        return data.access
      },
      onLogout: logout,
    })
  }, [logout])

  // Keep other open tabs in sync when one tab logs in or out.
  useEffect(() => {
    const onStorage = () => setToken(getAccessToken())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // what useMemo does is just make sure it doesn't get recalcuated everytime it is ran
  const value = useMemo(
    () => ({ token, isAuthenticated: Boolean(token), login, logout }),
    [token, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

