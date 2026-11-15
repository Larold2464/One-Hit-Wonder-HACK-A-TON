import apiClient from './client'

export async function createSession({ title }) {
  const res = await apiClient('/sessions/', {
    method: 'POST',
    body: JSON.stringify({ title }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || data.detail)
  return data
}

export async function fetchPulse(session_id) {
  const res = await apiClient(`/sessions/${session_id}/pulse/`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || data.detail)
  return data
}

export async function saveSnapshot(session_id) {
  const res = await apiClient(`/sessions/${session_id}/snapshot/`, {
    method: 'POST',
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || data.detail)
  return data
}

export async function getSessionTimeline(session_id) {
  const res = await apiClient(`/sessions/${session_id}/timeline/`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || data.detail)
  return data
}

export async function endSession(session_id) {
  const res = await apiClient(`/sessions/${session_id}/end/`, {
    method: 'POST',
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || data.detail)
  return data
}