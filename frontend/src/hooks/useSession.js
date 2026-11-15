import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createSession,
  fetchPulse,
  saveSnapshot,
  getSessionTimeline,
  endSession,
} from '../api/session'

export function useCreateSession() {
  return useMutation({
    mutationFn: createSession,
  })
}

export function usePulse(session_id) {
  return useQuery({
    queryKey: ['pulse', session_id],
    queryFn: () => fetchPulse(session_id),
    enabled: !!session_id,
    refetchInterval: 3000,
  })
}

export function useTimeline(session_id) {
  return useQuery({
    queryKey: ['timeline', session_id],
    queryFn: () => getSessionTimeline(session_id),
    enabled: !!session_id,
  })
}

export function useSaveSnapshot(session_id, active = true) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: () => saveSnapshot(session_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeline', session_id] })
    },
  })

  // save a graph point once a minute, only while the session is active
  useEffect(() => {
    if (!session_id || !active) return
    const timer = setInterval(() => mutate(), 60000)
    return () => clearInterval(timer)
  }, [session_id, active, mutate])
}

export function useEndSession() {
  return useMutation({
    mutationFn: endSession,
  })
}