'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Loader2, Save, Plus, AlertCircle, Trash2, X, BookOpen, Sparkles } from 'lucide-react'

// Modular Components
import { blocksToMarkdown, markdownToBlocks, renderMarkdown, compressImage } from '@/components/admin/utils'
import Sidebar from '@/components/admin/Sidebar'
import DraftRestoreModal from '@/components/admin/DraftRestoreModal'
import ProfileTab from '@/components/admin/ProfileTab'
import CategoriesTab from '@/components/admin/CategoriesTab'
import ToolsSkillsTab from '@/components/admin/ToolsSkillsTab'
import ProjectsTab from '@/components/admin/ProjectsTab'
import ExperiencesTab from '@/components/admin/ExperiencesTab'
import BlogsTab from '@/components/admin/BlogsTab'
import CertificationsTab from '@/components/admin/CertificationsTab'
import TestimonialsTab from '@/components/admin/TestimonialsTab'
import HobbiesTab from '@/components/admin/HobbiesTab'
import InboxTab from '@/components/admin/InboxTab'

export default function CustomDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('profile')
  const [toolsSkillsSubtab, setToolsSkillsSubtab] = useState<'tools' | 'skills'>('tools')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [loadedTabs, setLoadedTabs] = useState<Record<string, boolean>>({})
  const [tabLoading, setTabLoading] = useState<Record<string, boolean>>({})

  // Database States
  const [userData, setUserData] = useState<any>({
    professionalStatus: { isActive: true, role: '', location: '', status: '' },
    socialMedias: []
  })
  const [projects, setProjects] = useState<any[]>([])
  const [experiences, setExperiences] = useState<any[]>([])
  const [collections, setCollections] = useState<any[]>([])
  const [tools, setTools] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [certifications, setCertifications] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [blogs, setBlogs] = useState<any[]>([])
  const [inbox, setInbox] = useState<any[]>([])

  // Modal / Form / Delete States
  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)

  // Markdown Editor States
  const [previewModalContent, setPreviewModalContent] = useState<string | null>(null)
  const [activeLanguageForm, setActiveLanguageForm] = useState<'en' | 'id'>('en')
  const [isMounted, setIsMounted] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [pendingDraft, setPendingDraft] = useState<any | null>(null)

  const loadTabData = async (tabId: string, force = false) => {
    setSelectedIds([])
    if (loadedTabs[tabId] && !force) return

    setTabLoading(prev => ({ ...prev, [tabId]: true }))
    try {
      let apiType = tabId
      if (tabId === 'hobbies') apiType = 'collections'

      const res = await fetch(`/api/admin?type=${apiType}&t=${Date.now()}`, { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()

        if (tabId === 'profile') {
          const u = data.user || {
            professionalStatus: { isActive: true, role: '', location: '', status: '' },
            socialMedias: []
          }
          if (u.fullDescription && Array.isArray(u.fullDescription.en)) {
            u.fullDescription.en = blocksToMarkdown(u.fullDescription.en)
          }
          if (u.fullDescription && Array.isArray(u.fullDescription.id)) {
            u.fullDescription.id = blocksToMarkdown(u.fullDescription.id)
          }
          setUserData(u)
          if (data.inbox) setInbox(data.inbox)
        } else if (tabId === 'projects') {
          setProjects((data.projects || []).map((p: any) => {
            if (p.detailStory && Array.isArray(p.detailStory.en)) {
              p.detailStory.en = blocksToMarkdown(p.detailStory.en)
            }
            if (p.detailStory && Array.isArray(p.detailStory.id)) {
              p.detailStory.id = blocksToMarkdown(p.detailStory.id)
            }
            return p
          }))
          if (data.tools) setTools(data.tools)
          if (data.categories) setCategories(data.categories)
        } else if (tabId === 'experiences') {
          setExperiences((data.experiences || []).map((e: any) => {
            if (e.detailStory && Array.isArray(e.detailStory.en)) {
              e.detailStory.en = blocksToMarkdown(e.detailStory.en)
            }
            if (e.detailStory && Array.isArray(e.detailStory.id)) {
              e.detailStory.id = blocksToMarkdown(e.detailStory.id)
            }
            return e
          }))
          if (data.tools) setTools(data.tools)
        } else if (tabId === 'hobbies') {
          setCollections((data.collections || []).map((c: any) => {
            if (c.review && Array.isArray(c.review.en)) {
              c.review.en = blocksToMarkdown(c.review.en)
            }
            if (c.review && Array.isArray(c.review.id)) {
              c.review.id = blocksToMarkdown(c.review.id)
            }
            return c
          }))
        } else if (tabId === 'tools-skills') {
          setTools(data.tools || [])
          setSkills(data.skills || [])
          setCategories(data.categories || [])
        } else if (tabId === 'categories') {
          setCategories(data.categories || [])
        } else if (tabId === 'certifications') {
          setCertifications(data.certifications || [])
        } else if (tabId === 'testimonials') {
          setTestimonials(data.testimonials || [])
        } else if (tabId === 'blogs') {
          setBlogs((data.blogs || []).map((b: any) => {
            if (b.content && Array.isArray(b.content.en)) {
              b.content.en = blocksToMarkdown(b.content.en)
            }
            if (b.content && Array.isArray(b.content.id)) {
              b.content.id = blocksToMarkdown(b.content.id)
            }
            return b
          }))
        } else if (tabId === 'inbox') {
          setInbox(data.inbox || [])
        }

        setLoadedTabs(prev => ({ ...prev, [tabId]: true }))
      }
    } catch (err) {
      console.error(`Error fetching tab data for ${tabId}:`, err)
    } finally {
      setTabLoading(prev => ({ ...prev, [tabId]: false }))
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      loadTabData(activeTab)
    }
  }, [activeTab, status])

  useEffect(() => {
    setIsMounted(true)
    const savedTab = localStorage.getItem('adminActiveTab')
    if (savedTab) setActiveTab(savedTab)

    if (typeof window !== 'undefined') {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('cms_draft_')) {
          localStorage.removeItem(key)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('adminActiveTab', activeTab)
    }
  }, [activeTab, isMounted])

  // Draft Syncing
  useEffect(() => {
    if (!isMounted || !showForm || !editingItem) return
    const draftKey = `cms_draft_${activeTab}_${editingItem._id || 'new'}`
    localStorage.setItem(draftKey, JSON.stringify(editingItem))
    return () => {
      // Clean up single item draft when form closes normally
    }
  }, [editingItem, showForm, activeTab, isMounted])

  // Lock body scroll when overlay is active
  useEffect(() => {
    const isLocked = saving || !!deleteTargetId || bulkDeleteConfirm || previewModalContent !== null || !!pendingDraft
    document.body.style.overflow = isLocked ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [saving, deleteTargetId, bulkDeleteConfirm, previewModalContent, pendingDraft])

  const handleStartForm = (item: any) => {
    const defaultItem = item || { isDraft: false }
    const draftKey = `cms_draft_${activeTab}_${defaultItem._id || 'new'}`
    const savedDraft = localStorage.getItem(draftKey)
    if (savedDraft) {
      try {
        setPendingDraft(JSON.parse(savedDraft))
        return
      } catch (e) {
        console.error(e)
      }
    }
    setEditingItem(defaultItem)
    setShowForm(true)
  }

  const clearDraft = (id?: string, tab?: string) => {
    const prefix = `cms_draft_${tab || activeTab}_`
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key)
      }
    })
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/cms/gateway')
    }
  }, [status, router])

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    options: { isUser?: boolean; fieldName: string; index?: number; subFieldName?: string }
  ) => {
    const rawFile = e.target.files?.[0]
    if (!rawFile) return

    const uploadKey = `${options.fieldName}-${options.index !== undefined ? options.index : ''}-${options.subFieldName || ''}`
    setUploading(uploadKey)
    try {
      const file = (rawFile.type === 'application/pdf' || rawFile.type === 'image/svg+xml') ? rawFile : await compressImage(rawFile)
      const uploadPrefix = options.fieldName === 'resume' ? 'resumes' : activeTab
      const uploadName = options.isUser ? 'profile_asset' : (editingItem.name || editingItem.title?.en || 'asset').toLowerCase().replace(/[^a-z0-9]+/g, '-')

      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(`/api/admin?action=upload-asset&prefix=${uploadPrefix}&name=${uploadName}`, {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        const data = await res.json()
        const isFileField = options.fieldName === 'resume'
        const assetRef = {
          _type: isFileField ? 'file' : 'image',
          asset: { _type: 'reference', _ref: data.asset._id },
          url: data.asset.url
        }

        if (options.isUser) {
          setUserData((prev: any) => {
            const next = { ...prev }
            if (options.index !== undefined && options.subFieldName) {
              const arr = [...(next[options.fieldName] || [])]
              arr[options.index] = { ...arr[options.index], [options.subFieldName]: assetRef }
              next[options.fieldName] = arr
            } else {
              next[options.fieldName] = assetRef
            }
            return next
          })
        } else {
          setEditingItem((prev: any) => {
            const next = { ...prev }
            if (options.index !== undefined && options.subFieldName) {
              const arr = [...(next[options.fieldName] || [])]
              arr[options.index] = { ...arr[options.index], [options.subFieldName]: assetRef }
              next[options.fieldName] = arr
            } else {
              next[options.fieldName] = assetRef
            }
            return next
          })
        }
      }
    } catch (err) {
      console.error('Upload error:', err)
    } finally {
      setUploading(null)
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaveSuccess(false)
    setSaveError(null)

    if (!userData.name?.trim()) {
      setSaveError('Full Name is required.')
      setSaving(false)
      setTimeout(() => setSaveError(null), 5000)
      return
    }

    try {
      const { _id, _type, _createdAt, _updatedAt, _rev, email, ...updateData } = userData
      
      if (updateData.fullDescription && typeof updateData.fullDescription.en === 'string') {
        updateData.fullDescription.en = markdownToBlocks(updateData.fullDescription.en)
      }
      if (updateData.fullDescription && typeof updateData.fullDescription.id === 'string') {
        updateData.fullDescription.id = markdownToBlocks(updateData.fullDescription.id)
      }

      const res = await fetch('/api/admin?action=profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      })
      const data = await res.json()
      if (res.ok) {
        setSaveSuccess(true)
        setTimeout(() => loadTabData('profile', true), 1000)
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        setSaveError(data.error || 'Failed to save profile')
        setTimeout(() => setSaveError(null), 5000)
      }
    } catch (err: any) {
      setSaveError(err.message || 'Network error')
      setTimeout(() => setSaveError(null), 5000)
    } finally {
      setSaving(false)
    }
  }

  const handleSaveDocument = async (docType: string) => {
    setSaving(true)
    setSaveError(null)
    try {
      const dataToSave = { ...editingItem, _type: docType }

      // Bulk tool saving handler
      if (docType === 'tool' && dataToSave.items && Array.isArray(dataToSave.items)) {
        const itemsToSave = dataToSave.items.filter((item: any) => item.name?.trim())
        
        if (itemsToSave.length === 0) {
          setSaveError('Please enter at least one tool name.')
          setSaving(false)
          return
        }

        const savedDocs: any[] = []
        await Promise.all(
          itemsToSave.map(async (item: any, index: number) => {
            const toolDoc = {
              _type: 'tool',
              _id: `tool-${Date.now()}-${index}`,
              name: item.name.trim(),
              icon: item.icon
            }
            const res = await fetch('/api/admin?action=save-document', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(toolDoc),
            })
            if (res.ok) {
              savedDocs.push(toolDoc)
            }
          })
        )

        clearDraft(dataToSave._id)
        setSaveSuccess(true)
        setShowForm(false)
        setEditingItem(null)

        setTools(prev => [...savedDocs, ...prev])
        setTimeout(() => loadTabData(activeTab, true), 2000)
        setTimeout(() => setSaveSuccess(false), 3000)
        return
      }

      if (!dataToSave._id) dataToSave._id = `${docType}-${Date.now()}`

      delete dataToSave.user

      if (dataToSave.detailStory && typeof dataToSave.detailStory.en === 'string') {
        dataToSave.detailStory.en = markdownToBlocks(dataToSave.detailStory.en)
      }
      if (dataToSave.detailStory && typeof dataToSave.detailStory.id === 'string') {
        dataToSave.detailStory.id = markdownToBlocks(dataToSave.detailStory.id)
      }
      if (dataToSave.review && typeof dataToSave.review.en === 'string') {
        dataToSave.review.en = markdownToBlocks(dataToSave.review.en)
      }
      if (dataToSave.review && typeof dataToSave.review.id === 'string') {
        dataToSave.review.id = markdownToBlocks(dataToSave.review.id)
      }
      if (dataToSave.content && typeof dataToSave.content.en === 'string') {
        dataToSave.content.en = markdownToBlocks(dataToSave.content.en)
      }
      if (dataToSave.content && typeof dataToSave.content.id === 'string') {
        dataToSave.content.id = markdownToBlocks(dataToSave.content.id)
      }

      const textFields = ['title', 'description', 'role', 'roleInProject', 'content', 'excerpt']

      if (docType === 'project') {
        const titleEn = dataToSave.title?.en?.trim()
        const titleId = dataToSave.title?.id?.trim()
        if (!titleEn && !titleId) {
          setSaveError('Please fill out at least one version of the Project Title (either English or Indonesian).')
          setSaving(false)
          setTimeout(() => setSaveError(null), 5000)
          return
        }
      }

      if (docType === 'experience') {
        const roleEn = dataToSave.role?.en?.trim()
        const roleId = dataToSave.role?.id?.trim()
        if (!roleEn && !roleId) {
          setSaveError('Please fill out at least one version of the Role Title (either English or Indonesian).')
          setSaving(false)
          setTimeout(() => setSaveError(null), 5000)
          return
        }
      }

      if (docType === 'certification') {
        const titleEn = dataToSave.title?.en?.trim()
        const titleId = dataToSave.title?.id?.trim()
        if (!titleEn && !titleId) {
          setSaveError('Please fill out at least one version of the Certification Name (either English or Indonesian).')
          setSaving(false)
          setTimeout(() => setSaveError(null), 5000)
          return
        }
      }

      if (docType === 'testimonial') {
        const contentEn = dataToSave.content?.en?.trim()
        const contentId = dataToSave.content?.id?.trim()
        if (!contentEn && !contentId) {
          setSaveError('Please fill out at least one version of the Testimonial Content (either English or Indonesian).')
          setSaving(false)
          setTimeout(() => setSaveError(null), 5000)
          return
        }
      }

      if (docType === 'blog') {
        const titleEn = dataToSave.title?.en?.trim()
        const titleId = dataToSave.title?.id?.trim()
        if (!titleEn && !titleId) {
          setSaveError('Please fill out at least one version of the Blog Title (either English or Indonesian).')
          setSaving(false)
          setTimeout(() => setSaveError(null), 5000)
          return
        }
        if (!dataToSave.slug?.current) {
          setSaveError('Please fill out the Slug.')
          setSaving(false)
          setTimeout(() => setSaveError(null), 5000)
          return
        }
      }

      textFields.forEach(field => {
        if (dataToSave[field] && !dataToSave[field]._type) {
          dataToSave[field]._type = 'localeString'
        }
      })

      const res = await fetch('/api/admin?action=save-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      })
      const data = await res.json()
      if (res.ok) {
        clearDraft(dataToSave._id)
        setSaveSuccess(true)
        setShowForm(false)
        setEditingItem(null)
        
        if (docType === 'project') setProjects(prev => [dataToSave, ...prev.filter(p => p._id !== dataToSave._id)])
        else if (docType === 'experience') setExperiences(prev => [dataToSave, ...prev.filter(p => p._id !== dataToSave._id)])
        else if (docType === 'certification') setCertifications(prev => [dataToSave, ...prev.filter(p => p._id !== dataToSave._id)])
        else if (docType === 'testimonial') setTestimonials(prev => [dataToSave, ...prev.filter(p => p._id !== dataToSave._id)])
        else if (docType === 'collection') setCollections(prev => [dataToSave, ...prev.filter(p => p._id !== dataToSave._id)])
        else if (docType === 'tool') setTools(prev => [dataToSave, ...prev.filter(p => p._id !== dataToSave._id)])
        else if (docType === 'skill') setSkills(prev => [dataToSave, ...prev.filter(p => p._id !== dataToSave._id)])
        else if (docType === 'category') setCategories(prev => [dataToSave, ...prev.filter(p => p._id !== dataToSave._id)])
        else if (docType === 'blog') setBlogs(prev => [dataToSave, ...prev.filter(b => b._id !== dataToSave._id)])

        setTimeout(() => loadTabData(activeTab, true), 2000)
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        setSaveError(data.error || `Failed to save ${docType}`)
        setTimeout(() => setSaveError(null), 5000)
      }
    } catch (err: any) {
      setSaveError(err.message || 'Network error')
      setTimeout(() => setSaveError(null), 5000)
    } finally {
      setSaving(false)
    }
  }

  const executeDelete = async () => {
    if (!deleteTargetId) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin?action=delete-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteTargetId }),
      })
      const data = await res.json()
      if (res.ok) {
        setSelectedIds(prev => prev.filter(id => id !== deleteTargetId))
        loadTabData(activeTab, true)
      } else {
        setSaveError(data.error || 'Failed to delete document')
        setTimeout(() => setSaveError(null), 7000)
      }
    } catch (err: any) {
      setSaveError(err.message || 'Network error')
      setTimeout(() => setSaveError(null), 5000)
    } finally {
      setSaving(false)
      setDeleteTargetId(null)
    }
  }

  const executeBulkDelete = () => {
    setBulkDeleteConfirm(true)
  }

  const confirmBulkDelete = async () => {
    setSaving(true)
    try {
      const results = await Promise.all(
        selectedIds.map(async (id) => {
          const res = await fetch('/api/admin?action=delete-document', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          })
          return { id, ok: res.ok, status: res.status }
        })
      )

      const failures = results.filter(r => !r.ok)
      if (failures.length > 0) {
        setSaveError(`Failed to delete ${failures.length} item(s). Items might still be referenced elsewhere.`)
        setTimeout(() => setSaveError(null), 7000)
      }
      setSelectedIds([])
      loadTabData(activeTab, true)
    } catch (err: any) {
      setSaveError(err.message || 'Network error during bulk delete')
      setTimeout(() => setSaveError(null), 5000)
    } finally {
      setSaving(false)
      setBulkDeleteConfirm(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-200">
        <Loader2 className="w-12 h-12 text-teal-400 animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-400 tracking-wider">LOADING CMS SYSTEMS...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-100 flex relative">
      
      {/* Draft Restore Modal */}
      {pendingDraft && (
        <DraftRestoreModal
          pendingDraft={pendingDraft}
          setPendingDraft={setPendingDraft}
          setEditingItem={setEditingItem}
          setShowForm={setShowForm}
          clearDraft={clearDraft}
        />
      )}

      {/* Custom Delete Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold">Delete Confirmation</h3>
            </div>
            <p className="text-sm text-slate-400">Are you sure you want to permanently delete this item from your Sanity database? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                disabled={saving}
                className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white rounded-xl bg-slate-850 hover:bg-slate-800 transition cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                disabled={saving}
                className="px-4 py-2 text-sm font-semibold text-white rounded-xl bg-rose-500 hover:bg-rose-600 transition cursor-pointer disabled:bg-rose-550/50 flex items-center gap-1.5"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete permanently</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Bulk Delete Confirm Modal */}
      {bulkDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/20 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl shadow-rose-900/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Bulk Delete Confirmation</h3>
                <p className="text-xs text-slate-500 mt-0.5">This action is irreversible</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              You are about to permanently delete <span className="font-bold text-white">{selectedIds.length} item{selectedIds.length > 1 ? 's' : ''}</span> from your database. This action <span className="text-rose-400 font-semibold">cannot be undone</span>.
            </p>
            <div className="flex gap-3 justify-end pt-1">
              <button
                onClick={() => setBulkDeleteConfirm(false)}
                disabled={saving}
                className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmBulkDelete}
                disabled={saving}
                className="px-4 py-2 text-sm font-semibold text-white rounded-xl bg-rose-500 hover:bg-rose-600 transition cursor-pointer disabled:bg-rose-500/50 flex items-center gap-1.5"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting {selectedIds.length} items...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Preview Modal */}
      {previewModalContent !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full flex flex-col shadow-2xl overflow-hidden h-[80vh]">
            <div className="flex justify-between items-center p-5 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2 text-teal-400">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Rich Text Markdown Preview</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModalContent(null)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto bg-slate-950/80 prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(previewModalContent) }} />
            </div>
            <div className="flex justify-end p-4 border-t border-slate-800 bg-slate-900/60 shrink-0">
              <button
                type="button"
                onClick={() => setPreviewModalContent(null)}
                className="px-5 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 cursor-pointer transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setShowForm={setShowForm}
        setEditingItem={setEditingItem}
        inboxCount={inbox.length || null}
        session={session}
      />

      {/* Main Work Area */}
      <main className="flex-1 min-w-0 p-8 overflow-y-auto relative pb-24">
        {/* Save alerts */}
        {saveSuccess && (
          <div className="fixed bottom-6 right-6 z-55 flex items-center gap-2 px-4 py-3 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl shadow-xl animate-bounce">
            <span className="text-xs font-bold uppercase tracking-wider">Save Success!</span>
          </div>
        )}
        {saveError && (
          <div className="fixed bottom-6 right-6 z-55 flex items-center gap-2.5 px-4 py-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl shadow-xl max-w-md animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="text-xs font-semibold leading-relaxed">{saveError}</span>
          </div>
        )}

        {/* Header Bar */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-800/80">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white capitalize">{activeTab.replace('-', ' & ')} Settings</h1>
            <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase mt-1">Manage content data in Sanity CMS</p>
          </div>

          {activeTab === 'profile' && (
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 disabled:bg-teal-500/50 transition-all duration-200 cursor-pointer shadow-lg shadow-teal-500/10"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Profile & Work
            </button>
          )}

          {['categories', 'tools-skills', 'projects', 'experiences', 'certifications', 'testimonials', 'hobbies', 'blogs'].includes(activeTab) && !showForm && (
            <button
              onClick={() => handleStartForm(null)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition-all duration-200 cursor-pointer shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          )}
        </div>

        {tabLoading[activeTab] ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="w-10 h-10 text-teal-400 animate-spin mb-4" />
            <p className="text-xs font-semibold tracking-wider uppercase">Loading tab data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'profile' && (
              <ProfileTab
                userData={userData}
                setUserData={setUserData}
                activeLanguageForm={activeLanguageForm}
                setActiveLanguageForm={setActiveLanguageForm}
                uploading={uploading}
                handleFileUpload={handleFileUpload}
                setPreviewModalContent={setPreviewModalContent}
              />
            )}

            {activeTab === 'categories' && (
              <CategoriesTab
                categories={categories}
                showForm={showForm}
                setShowForm={setShowForm}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                activeLanguageForm={activeLanguageForm}
                setActiveLanguageForm={setActiveLanguageForm}
                handleSaveDocument={handleSaveDocument}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                executeBulkDelete={executeBulkDelete}
                handleStartForm={handleStartForm}
                setDeleteTargetId={setDeleteTargetId}
                saving={saving}
              />
            )}

            {activeTab === 'tools-skills' && (
              <ToolsSkillsTab
                tools={tools}
                skills={skills}
                categories={categories}
                showForm={showForm}
                setShowForm={setShowForm}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                toolsSkillsSubtab={toolsSkillsSubtab}
                setToolsSkillsSubtab={setToolsSkillsSubtab}
                uploading={uploading}
                handleFileUpload={handleFileUpload}
                handleSaveDocument={handleSaveDocument}
                setDeleteTargetId={setDeleteTargetId}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsTab
                projects={projects}
                categories={categories}
                tools={tools}
                showForm={showForm}
                setShowForm={setShowForm}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                activeLanguageForm={activeLanguageForm}
                setActiveLanguageForm={setActiveLanguageForm}
                uploading={uploading}
                setUploading={setUploading}
                handleFileUpload={handleFileUpload}
                handleSaveDocument={handleSaveDocument}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                executeBulkDelete={executeBulkDelete}
                handleStartForm={handleStartForm}
                setDeleteTargetId={setDeleteTargetId}
                saving={saving}
                setPreviewModalContent={setPreviewModalContent}
              />
            )}

            {activeTab === 'experiences' && (
              <ExperiencesTab
                experiences={experiences}
                tools={tools}
                showForm={showForm}
                setShowForm={setShowForm}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                activeLanguageForm={activeLanguageForm}
                setActiveLanguageForm={setActiveLanguageForm}
                handleSaveDocument={handleSaveDocument}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                executeBulkDelete={executeBulkDelete}
                handleStartForm={handleStartForm}
                setDeleteTargetId={setDeleteTargetId}
                saving={saving}
                setPreviewModalContent={setPreviewModalContent}
              />
            )}

            {activeTab === 'blogs' && (
              <BlogsTab
                blogs={blogs}
                showForm={showForm}
                setShowForm={setShowForm}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                activeLanguageForm={activeLanguageForm}
                setActiveLanguageForm={setActiveLanguageForm}
                uploading={uploading}
                setUploading={setUploading}
                handleSaveDocument={handleSaveDocument}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                executeBulkDelete={executeBulkDelete}
                handleStartForm={handleStartForm}
                setDeleteTargetId={setDeleteTargetId}
                saving={saving}
                setPreviewModalContent={setPreviewModalContent}
              />
            )}

            {activeTab === 'certifications' && (
              <CertificationsTab
                certifications={certifications}
                showForm={showForm}
                setShowForm={setShowForm}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                uploading={uploading}
                handleFileUpload={handleFileUpload}
                handleSaveDocument={handleSaveDocument}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                executeBulkDelete={executeBulkDelete}
                handleStartForm={handleStartForm}
                setDeleteTargetId={setDeleteTargetId}
                saving={saving}
              />
            )}

            {activeTab === 'testimonials' && (
              <TestimonialsTab
                testimonials={testimonials}
                showForm={showForm}
                setShowForm={setShowForm}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                handleSaveDocument={handleSaveDocument}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                executeBulkDelete={executeBulkDelete}
                handleStartForm={handleStartForm}
                setDeleteTargetId={setDeleteTargetId}
                saving={saving}
              />
            )}

            {activeTab === 'hobbies' && (
              <HobbiesTab
                collections={collections}
                showForm={showForm}
                setShowForm={setShowForm}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                uploading={uploading}
                handleFileUpload={handleFileUpload}
                handleSaveDocument={handleSaveDocument}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                executeBulkDelete={executeBulkDelete}
                handleStartForm={handleStartForm}
                setDeleteTargetId={setDeleteTargetId}
                saving={saving}
                setPreviewModalContent={setPreviewModalContent}
              />
            )}

            {activeTab === 'inbox' && (
              <InboxTab inbox={inbox} />
            )}
          </>
        )}
      </main>
    </div>
  )
}
