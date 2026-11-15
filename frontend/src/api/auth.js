import apiClient from './client'

export async function loginUser({ username, password }) {
  return apiClient('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
}

export async function registerUser({ username, email, password }) {
  return apiClient('/auth/register/', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  })
}

export async function refreshToken({ refresh }) {
  return apiClient('/auth/token/refresh/', {
    method: 'POST',
    body: JSON.stringify({ refresh }),
  })
}