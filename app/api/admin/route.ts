import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { client, writeClient } from '@/lib/sanity.client'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Use readClient (CDN-enabled) for all reads, writeClient only for mutations
const readClient = client

// In-memory user cache to avoid repeated Sanity lookups per request (5 min TTL)
const userCache = new Map<string, { user: any; ts: number }>()
const USER_CACHE_TTL = 5 * 60 * 1000 // 5 minutes

// Helper to get or create Sanity User based on logged-in email
async function getOrCreateSanityUser(email: string, name: string) {
  // Check in-memory cache first
  const cached = userCache.get(email)
  if (cached && Date.now() - cached.ts < USER_CACHE_TTL) {
    return cached.user
  }

  // Try CDN read client first (fast) — will have the user if they've been created before
  const user = await client.fetch(
    `*[_type == "user" && email == $email][0]`,
    { email }
  )

  if (user) {
    userCache.set(email, { user, ts: Date.now() })
    return user
  }

  // User doesn't exist yet — create via writeClient
  const defaultSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const newUser = {
    _type: 'user',
    _id: `user-${Date.now()}`,
    name,
    email,
    slug: { _type: 'slug', current: defaultSlug },
    professionalStatus: {
      isActive: true,
      role: 'Software Engineer',
      location: 'Indonesia',
      status: 'Open to work'
    }
  }

  const created = await writeClient.create(newUser)
  userCache.set(email, { user: created, ts: Date.now() })
  return created
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const fetchType = searchParams.get('type') || 'profile'

  try {
    const user = await getOrCreateSanityUser(
      session.user.email,
      session.user.name || 'Anonymous'
    )

    const params = { userId: user._id }

    if (fetchType === 'profile') {
      // Profile tab only needs user data — inbox is fetched separately
      return NextResponse.json({ user })
    }

    if (fetchType === 'projects') {
      const data = await readClient.fetch(`{
        "projects": *[_type == "project" && user._ref == $userId] | order(_createdAt desc),
        "tools": *[_type == "tool" && user._ref == $userId],
        "categories": *[_type == "category" && user._ref == $userId]
      }`, params)
      return NextResponse.json(data)
    }

    if (fetchType === 'experiences') {
      const data = await readClient.fetch(`{
        "experiences": *[_type == "experience" && user._ref == $userId] | order(dateFrom desc),
        "tools": *[_type == "tool" && user._ref == $userId]
      }`, params)
      return NextResponse.json(data)
    }

    if (fetchType === 'collections') {
      const collections = await readClient.fetch(`*[_type == "collection" && user._ref == $userId] | order(_createdAt desc)`, params)
      return NextResponse.json({ collections })
    }

    if (fetchType === 'blogs') {
      const blogs = await readClient.fetch(`*[_type == "blog" && user._ref == $userId] | order(publishedAt desc)`, params)
      return NextResponse.json({ blogs })
    }

    if (fetchType === 'tools-skills') {
      const data = await readClient.fetch(`{
        "tools": *[_type == "tool" && user._ref == $userId],
        "skills": *[_type == "skill" && user._ref == $userId],
        "categories": *[_type == "category" && user._ref == $userId]
      }`, params)
      return NextResponse.json(data)
    }

    if (fetchType === 'categories') {
      const categories = await readClient.fetch(`*[_type == "category" && user._ref == $userId]`, params)
      return NextResponse.json({ categories })
    }

    if (fetchType === 'certifications') {
      const certifications = await readClient.fetch(`*[_type == "certification" && user._ref == $userId] | order(issuedDate desc)`, params)
      return NextResponse.json({ certifications })
    }

    if (fetchType === 'testimonials') {
      const testimonials = await readClient.fetch(`*[_type == "testimonial" && user._ref == $userId]`, params)
      return NextResponse.json({ testimonials })
    }

    if (fetchType === 'inbox') {
      const inbox = await readClient.fetch(`*[_type == "inbox" && user._ref == $userId] | order(_createdAt desc)`, params)
      return NextResponse.json({ inbox })
    }

    return NextResponse.json({ user })
  } catch (error: any) {
    console.error('[API /admin GET] Error:', error?.message || error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action') || 'profile'

  try {
    const user = await getOrCreateSanityUser(
      session.user.email,
      session.user.name || 'Anonymous'
    )

    // Handle file/image upload to Sanity (must be before req.json())
    if (action === 'upload-asset') {
      const formData = await req.formData()
      const file = formData.get('file') as File
      if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
      }

      // Read custom filename/path parameters from client query
      const customPrefix = searchParams.get('prefix') || 'assets' // e.g. tools, profile
      const customName = searchParams.get('name') || 'file'       // e.g. docker, resume

      const fileExt = file.name.split('.').pop() || 'png'
      const generatedFilename = `${customPrefix}/${user._id}_${Date.now()}/${customName}.${fileExt}`

      const buffer = Buffer.from(await file.arrayBuffer())
      const asset = await writeClient.assets.upload('image', buffer, {
        filename: generatedFilename,
        contentType: file.type
      })

      return NextResponse.json({ asset })
    }

    const body = await req.json()

    // Handle profile update
    if (action === 'profile') {
      const { _id, _type, _createdAt, _updatedAt, _rev, email, slug, ...updateData } = body
      const updatedUser = await writeClient
        .patch(user._id)
        .set(updateData)
        .commit()
      return NextResponse.json({ user: updatedUser })
    }

    // Handle generic document creation or modification (projects, experiences, tools, etc.)
    if (action === 'save-document') {
      const doc = body
      // Ensure the document is tied to the correct logged-in user
      doc.user = {
        _type: 'reference',
        _ref: user._id
      }

      const savedDoc = await writeClient.createOrReplace(doc)
      return NextResponse.json({ document: savedDoc })
    }

    // Handle document deletion
    if (action === 'delete-document') {
      const { id } = body
      // Verify first that this document belongs to the user to prevent unauthorized deletions
      const doc = await writeClient.fetch(`*[_id == $id][0]`, { id })
      
      // Allow deletion if:
      // 1. The document exists AND has no owner (legacy document)
      // 2. OR the document owner reference matches the current logged-in user
      if (!doc || (doc.user?._ref && doc.user._ref !== user._id)) {
        return NextResponse.json({ success: false, error: 'Unauthorized delete action' }, { status: 403 })
      }

      // Collect all nested asset references within this document to delete them
      // Common structures: doc.icon._ref, doc.cover._ref, doc.images[].asset._ref, etc.
      const assetIdsToDelete: string[] = []
      
      const findAssetRefs = (obj: any) => {
        if (!obj || typeof obj !== 'object') return
        if (obj._type === 'reference' && (obj._ref?.startsWith('image-') || obj._ref?.startsWith('file-'))) {
          // Skip if it's a weak reference or doesn't look like an asset ID
          assetIdsToDelete.push(obj._ref)
        } else if (obj.asset?._ref) {
          assetIdsToDelete.push(obj.asset._ref)
        } else {
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              findAssetRefs(obj[key])
            }
          }
        }
      }
      
      findAssetRefs(doc)

      // Delete the main document first
      try {
        await writeClient.delete(id)
      } catch (err: any) {
        // If deletion fails due to referential integrity (e.g. document is referenced elsewhere)
        if (err.message && err.message.includes('references to it from')) {
          const matches = err.message.match(/"([^"]+)"/g)
          let referrers = 'other documents'
          if (matches) {
            // Deduplicate matching IDs
            const refIds: string[] = Array.from(new Set(matches.map((m: string) => m.replace(/"/g, ''))))
            
            // Resolve actual titles/names from Sanity for the referencing documents
            try {
              const docs = await writeClient.fetch(`*[_id in $refIds]{ _id, _type, title, name }`, { refIds })
              referrers = docs.map((d: any) => {
                const titleStr = d.title?.en || d.title || d.name || d._id
                let typeStr = d._type
                if (d._type === 'skill') typeStr = 'Skill Group'
                if (d._type === 'project') typeStr = 'Project'
                if (d._type === 'experience') typeStr = 'Experience'
                // Return formatted as "**Skill Group: React Tools**"
                return `**${typeStr}: ${titleStr}**`
              }).join(', ')
            } catch (fetchErr) {
              // Fallback to parsed IDs if fetch fails
              referrers = refIds.map((refId: string) => {
                const label = refId.startsWith('skill-') ? 'Skill Group' : refId.startsWith('project-') ? 'Project' : 'Document'
                return `**${label} (${refId.split('-').pop()})**`
              }).join(', ')
            }
          }
          return NextResponse.json({
            success: false,
            error: `Cannot delete this item because it is currently used by: ${referrers}. Please remove it from those items first.`
          }, { status: 409 })
        }
        return NextResponse.json({ success: false, error: err.message }, { status: 500 })
      }

      // Clean up orphaned assets (ignore errors if other documents still reference them)
      if (assetIdsToDelete.length > 0) {
        await Promise.all(
          assetIdsToDelete.map(async (assetId) => {
            try {
              // Delete the asset from Sanity storage
              await writeClient.delete(assetId)
            } catch (err) {
              // If it fails (e.g. referenced elsewhere), let it remain safely
              console.log(`Soft skipped deleting asset ${assetId} (might be referenced elsewhere)`)
            }
          })
        )
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    console.error('[API /admin POST] Error:', error?.message || error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
