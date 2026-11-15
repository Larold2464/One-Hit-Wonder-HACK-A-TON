// useQuestions.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getQuestions, createQuestion, updateQuestion } from '../api/question'

export function useQuestions(session_id) {
  return useQuery({
    queryKey: ['questions', session_id],
    queryFn: () => getQuestions(session_id),
    enabled: !!session_id,
    refetchInterval: 3000,
  })
}

export function useCreateQuestion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createQuestion,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['questions', variables.session_id] })
    },
  })
}

export function useUpdateQuestion(session_id) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions', session_id] })
    },
  })
}