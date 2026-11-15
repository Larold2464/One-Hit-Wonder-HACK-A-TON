import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createSession, fetchPulse, saveSnapshot, getSessionTimeline } from '../api/session'

export function useCreateSession() {
  return useMutation({
    mutationFn: async ({ title }) => {
      const res = await createSession({ title })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)
      return data
    },
  })
}

export function usePulse(session_id) {
  return useQuery({
    queryKey: ['pulse', session_id],
    queryFn: async () => {
      const res = await fetchPulse(session_id)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)
      return data
    },

    enabled: !!session_id,
    refetchInterval: 3000,
  })
}

export function useSaveSnapshot(session_id) {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: ['snapshot', session_id],
    queryFn: async () => {
      const res = await saveSnapshot(session_id)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)
      queryClient.invalidateQueries({ queryKey: ['timeline', session_id] })
      return data
    },

    enabled: !!session_id,
    refetchInterval: 60000, // saves a graph point every minute for the instructor
  })
}

export function useTimeline(session_id) {
  return useQuery({
    queryKey: ['timeline', session_id],
    queryFn: async () => {
      const res = await getSessionTimeline(session_id)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)
      return data
    },

    enabled: !!session_id,
  })
}