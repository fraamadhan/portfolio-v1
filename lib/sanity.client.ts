import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2023-05-03' // Menggunakan API version yang stabil
// Token for private dataset access (server-side only)
const token = process.env.SANITY_WRITE_TOKEN

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Admin always reads fresh — CDN causes delay after writes
  token,
  timeout: 15000,
})

// Client untuk menulis data - HANYA bisa berjalan di server-side (.env)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  timeout: 20000, // 20 second timeout
})
