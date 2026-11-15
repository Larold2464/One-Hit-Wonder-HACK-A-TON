import apiClient from './client'

// instructor --> start a class session
// Create a session. Body: {title}. Returns session_id, code, title, started_at, is_active.

export async function createSession({ title }) {
  const res = await apiClient('sessions/', {
    method: 'POST',
    body: JSON.stringify({ title }),
  })
}

// instructor --> live confusion + graph data
// Get live confusion stats (active count, average, count per level). Also saves this minute's snapshot.
// used a plain value for the read functions

export async function fetchPulse(sessionId) {
  return apiClient(`sessions/${sessionId}/pulse/`)
}

// save a confusion snapshot 
export async function saveSnapshot(sessionId) {
  return apiClient(`sessions/${sessionId}/snapshot/`, {
    method: 'POST',
  }) 
}

// instructor --> graph data for end of session
// Get all saved snapshots for the session, for the end-of-session chart.

export async function getSessionTimeline(sessionId) {
  return apiClient(`sessions/${sessionId}/timeline/`, {
    method: 'GET',
  })
}