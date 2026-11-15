import { useEffect } from 'react'
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

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await saveSnapshot(session_id)
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)
      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeline', session_id] })
    },
  })

  // save a graph point once a minute and only on this timer
  useEffect(() => {
    if (!session_id) return
    const timer = setInterval(() => mutate(), 60000)
    return () => clearInterval(timer)
  }, [session_id, mutate])
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