import apiClient from "./client"

export async function createQuestion({session_id, participant_token, text}){
    const res  = await apiClient('questions/', {
        method: 'POST',
        body: JSON.stringify({session_id, participant_token, text})
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    return data
}