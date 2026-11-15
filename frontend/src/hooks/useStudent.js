// hooks/useStudent.js
import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { joinSession, sendHeartbeat, setConfusion } from '../api/student'
import { useParticipant } from '../context/ParticipantContext'

// Join page: saves the response into ParticipantContext (and localStorage)
export function useJoinSession() {
  const { saveParticipant } = useParticipant()
  return useMutation({
    mutationFn: joinSession,
    onSuccess: (data) => saveParticipant(data),
  })
}

// Confusion buttons: mutate({ participant_token, confusion_level })
export function useSetConfusion() {
  return useMutation({
    mutationFn: setConfusion,
  })
}

// Heartbeat: runs on a timer, no UI. Call once inside the student page.
export function useHeartbeat(token, intervalMs = 5000) {
  const { clearParticipant } = useParticipant()

  useEffect(() => {
    if (!token) return

    const beat = () => {
      sendHeartbeat(token).catch((err) => {
        // Token unknown (e.g. database reset): drop it so the student re-joins
        if (err.message === 'Participant not found') clearParticipant()
        // Any other error (network blip): ignore, the next beat retries
      })
    }

    beat() // send one immediately so the student counts as active right away
    const id = setInterval(beat, intervalMs)
    return () => clearInterval(id) // stop when the component unmounts
  }, [token, intervalMs])
}