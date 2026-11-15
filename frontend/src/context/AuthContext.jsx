import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { loginUser, refreshToken as refreshTokenRequest } from '../api/auth'
import { setAuthCallbacks } from '../api/client'
import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  clearStoredTokens,
  readHostSession,
  writeHostSession
} from '../api/tokenStorage'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Lazy initial state: read localStorage once on mount, so a page reload
  // starts out logged in if a token is already stored.
  const [token, setToken] = useState(() => getAccessToken())
  const [hostSession, setHostSession] = useState(readHostSession)

  // Call with the POST /sessions/ response: { session_id, title, code, ... }
  const saveHostSession = useCallback((data) => {
    const value = { session_id: data.session_id, title: data.title, code: data.code }
    writeHostSession(value)
    setHostSession(value)
  }, [])

  const clearHostSession = useCallback(() => {
    writeHostSession(null)
    setHostSession(null)
  }, [])

  const logout = useCallback(() => {
    clearStoredTokens()
    setToken(null)
    clearHostSession()
  }, [clearHostSession])

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

  // what useMemo does is just make sure it doesn't get recalcuated everytime it is ran
  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
      hostSession,
      saveHostSession,
      clearHostSession,
    }),
    [token, login, logout, hostSession, saveHostSession, clearHostSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
