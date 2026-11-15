// context/ParticipantContext.jsx
import { createContext, useContext, useState } from 'react'

const STORAGE_KEY = 'participant'
const ParticipantContext = createContext(null)

function loadSaved() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

export function ParticipantProvider({ children }) {
  const [participant, setParticipant] = useState(loadSaved)

  // Call with the joinSession response
  const saveParticipant = (data) => {
    const value = {
      participant_token: data.participant_token,
      session_id: data.session_id,
      session_title: data.session_title,
      code: data.code, 
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      // storage unavailable: still works until refresh
    }
    setParticipant(value)
  }

  // Call when the session ends or the student leaves
  const clearParticipant = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    setParticipant(null)
  }

  return (
    <ParticipantContext.Provider value={{ participant, saveParticipant, clearParticipant }}>
      {children}
    </ParticipantContext.Provider>
  )
}

export function useParticipant() {
  const ctx = useContext(ParticipantContext)
  if (!ctx) {
    throw new Error('useParticipant must be used inside <ParticipantProvider>')
  }
  return ctx
}