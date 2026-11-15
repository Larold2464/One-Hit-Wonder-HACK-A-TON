import apiClient from "./client"

export async function createQuestion({session_id, participant_token, text, title}){
    const res  = await apiClient(`/sessions/${session_id}/questions/`, {
        method: 'POST',
        body: JSON.stringify({participant_token, text, title})
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    return data
}

export async function getQuestions(session_id) {
  const res = await apiClient(`/sessions/${session_id}/questions/`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
  return data
}

export async function updateQuestion({question_id, status}) {
  const res = await apiClient(`/questions/${question_id}/status/`, {
    method : 'PATCH',
    body : JSON.stringify({status})
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error)
  return data
}