// src/api/client.js – Thin fetch wrapper for the backend API
// In dev: Vite proxy forwards /api → localhost:4000
// In production (Vercel): VITE_API_URL must point to the Railway backend

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  const json = await res.json()

  if (!res.ok) {
    const err = new Error(json.message || 'API error')
    err.status = res.status
    throw err
  }

  return json
}

export const api = {
  get:    (path)         => apiFetch(path),
  post:   (path, body)   => apiFetch(path, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (path, body)   => apiFetch(path, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: (path)         => apiFetch(path, { method: 'DELETE' }),
}

// ─── Endpoint helpers ──────────────────────────────────────────
export const endpoints = {
  navigation:   (location = 'header') => api.get(`/navigation?location=${location}`),
  footer:       ()                    => api.get('/footer'),
  page:         (slug)                => api.get(`/pages/${slug}`),
  section:      (slug, key)           => api.get(`/pages/${slug}/sections/${key}`),
  campaigns:    (params = {})         => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ''))
    ).toString()
    return api.get(`/campaigns${qs ? '?' + qs : ''}`)
  },
  campaign:     (id)                  => api.get(`/campaigns/${id}`),
  categories:   ()                    => api.get('/categories'),
  testimonials: ()                    => api.get('/testimonials'),
  faqs:         ()                    => api.get('/faqs'),
  settings:     (group)               => api.get(`/settings${group ? '?group=' + group : ''}`),
}