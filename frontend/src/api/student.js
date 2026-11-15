import apiClient from './client'

// join with a room code
// Join a session. Body: {code}. Returns participant_token, session_id, session_title, confusion_level.
export async function joinSession({ code }) {
  const res = await apiClient('/sessions/join/', {
    method: 'POST',
    body: JSON.stringify({ code: code.trim().toUpperCase() }),
  })

  const data = await res.json()
  // saves student token so they stay the same student after a refresh
  if (!res.ok) throw new Error(data.error)

  return data
}

// update last_seen so the student counts as active. Call every 5-10 seconds.
export async function sendHeartbeat(token) {
  const res = await apiClient(`/participants/${token}/heartbeat/`, {
    method: 'POST',
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
  return data

}

// confusion bar
// update the student's confusion level.
export async function setConfusion({ participant_token, confusion_level }) {
  const res = await apiClient('/participants/confusion/', {
    method: 'POST',
    body: JSON.stringify({ participant_token, confusion_level}),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
  return data
}