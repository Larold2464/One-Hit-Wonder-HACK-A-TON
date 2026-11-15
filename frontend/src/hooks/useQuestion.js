// useCreateQuestion.js
import { useMutation } from '@tanstack/react-query'
import { createQuestion } from '../api/question'

export function useCreateQuestion() {
  return useMutation({
    mutationFn: createQuestion,
  })
}