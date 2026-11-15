import apiClient from './client'

// join with a room code
// Join a session. Body: {code}. Returns participant_token, session_id, session_title, confusion_level.
export async function joinSession({ code }) {
  const res = await apiClient('sessions/join/', {
    method: 'POST',
    body: JSON.stringify({ code: code.trim().toUpperCase() }),
  })

  
  const data = await res.json()
  // saves student token so they stay the same student after a refresh
  if (res.ok) {
    localStorage.setItem(`feedy-participant-${data.session_id}`, data.participant_token)
  }
  return data
}

// the student's saved token for the session
export function getParticipantToken(sessionId) {
  return localStorage.getItem(`feedy-participant-${sessionId}`)
}

// update last_seen so the student counts as active. Call every 5-10 seconds.
export async function sendHeartbeat(token) {
  return apiClient(`participants/${token}/heartbeat`, {
    method: 'POST',
  })
}

// confusion bar
// update the student's confusion level.
export async function setConfusion({ token, level }) {
  return apiClient('participants/confusion/', {
    method: 'POST',
    body: JSON.stringify({ participant_token: token, confusion_level: level }),
  })
}