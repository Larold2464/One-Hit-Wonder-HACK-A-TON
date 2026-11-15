// useCreateQuestion.js
import { useMutation } from '@tanstack/react-query'
import { createQuestion } from '../question'

export function useCreateQuestion() {
  return useMutation({
    mutationFn: createQuestion,
  })
}