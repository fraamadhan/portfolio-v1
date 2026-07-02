import React from 'react'
import { Save, Loader2, BookOpen, Upload, X, Trash2, Edit2 } from 'lucide-react'
import RichTextEditor from './RichTextEditor'
import { compressImage } from './utils'

interface BlogsTabProps {
  blogs: any[]
  showForm: boolean
  setShowForm: (show: boolean) => void
  editingItem: any
  setEditingItem: (item: any) => void
  activeLanguageForm: 'en' | 'id'
  setActiveLanguageForm: (lang: 'en' | 'id') => void
  uploading: string | null
  setUploading: (val: string | null) => void
  handleSaveDocument: (docType: string) => Promise<void>
  selectedIds: string[]
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
  executeBulkDelete: () => void
  handleStartForm: (item: any) => void
  setDeleteTargetId: (id: string) => void
  saving: boolean
  setPreviewModalContent: (val: string) => void
}

export default function BlogsTab({
  blogs,
  showForm,
  setShowForm,
  editingItem,
  setEditingItem,
  activeLanguageForm,
  setActiveLanguageForm,
  uploading,
  setUploading,
  handleSaveDocument,
  selectedIds,
  setSelectedIds,
  executeBulkDelete,
  handleStartForm,
  setDeleteTargetId,
  saving,
  setPreviewModalContent
}: BlogsTabProps) {
  return (
    <div className="space-y-8">
      {showForm ? (
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold">{editingItem._id ? 'Edit Blog Post' : 'Add New Blog Post'}</h3>
          {/* Form Controls: Language Selector & Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
            <div className="flex gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-850">
              <button
                type="button"
                onClick={() => setActiveLanguageForm('en')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${
                  activeLanguageForm === 'en' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                English (EN)
              </button>
              <button
                type="button"
                onClick={() => setActiveLanguageForm('id')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${
                  activeLanguageForm === 'id' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Bahasa Indonesia (ID)
              </button>
            </div>

            <div className="flex items-center gap-6">
              {/* Status Selection */}
              <div className="flex items-center gap-2.5">
                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Status</label>
                <select
                  value={editingItem.status || 'draft'}
                  onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 focus:outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Title */}
            {activeLanguageForm === 'en' ? (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Blog Title (EN)</label>
                <input
                  type="text"
                  value={editingItem.title?.en || ''}
                  onChange={(e) => {
                    const newTitle = e.target.value
                    const newSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    setEditingItem({
                      ...editingItem,
                      title: { ...editingItem.title, en: newTitle, _type: 'localeString' },
                      slug: editingItem.slug?.current ? editingItem.slug : { _type: 'slug', current: newSlug }
                    })
                  }}
                  placeholder="e.g. Building standard-compliant Next.js applications"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Blog Title (ID - Optional)</label>
                <input
                  type="text"
                  value={editingItem.title?.id || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      title: { ...editingItem.title, id: e.target.value, _type: 'localeString' }
                    })
                  }
                  placeholder="Contoh: Membangun aplikasi Next.js standar"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>
            )}

            {/* Slug Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Slug</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editingItem.slug?.current || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      slug: { _type: 'slug', current: e.target.value.toLowerCase().replace(/[^a-z0-9-/]+/g, '') }
                    })
                  }
                  placeholder="e.g. building-compliant-nextjs-apps"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    const baseTitle = editingItem.title?.en || editingItem.title?.id || ''
                    const generatedSlug = baseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    setEditingItem({ ...editingItem, slug: { _type: 'slug', current: generatedSlug } })
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-850 text-xs font-bold text-slate-250 hover:bg-slate-800 transition cursor-pointer"
                >
                  Regenerate
                </button>
              </div>
            </div>

            {/* Excerpt / Summary */}
            {activeLanguageForm === 'en' ? (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Excerpt / Summary (EN)</label>
                <textarea
                  rows={2}
                  value={editingItem.excerpt?.en || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      excerpt: { ...editingItem.excerpt, en: e.target.value, _type: 'localeString' }
                    })
                  }
                  placeholder="Short teaser description of the blog post..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none resize-none"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Excerpt / Summary (ID - Optional)</label>
                <textarea
                  rows={2}
                  value={editingItem.excerpt?.id || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      excerpt: { ...editingItem.excerpt, id: e.target.value, _type: 'localeString' }
                    })
                  }
                  placeholder="Deskripsi singkat artikel blog..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none resize-none"
                />
              </div>
            )}

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400">Cover Image</label>
              <div className="flex items-center gap-4">
                {editingItem.coverImage?.asset?._ref ? (
                  <div className="relative w-40 h-24 rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
                    <img
                      src={`https://cdn.sanity.io/images/tspoltvg/development/${editingItem.coverImage.asset._ref
                        .replace('image-', '')
                        .replace('-png', '.png')
                        .replace('-jpg', '.jpg')
                        .replace('-webp', '.webp')
                        .replace('-svg', '.svg')}`}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setEditingItem({ ...editingItem, coverImage: null })}
                      className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-rose-500 hover:bg-black transition cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="w-40 h-24 flex flex-col items-center justify-center border border-dashed border-slate-800 hover:border-teal-500/50 rounded-xl bg-slate-950 cursor-pointer transition">
                    {uploading === 'coverImage' ? (
                      <Loader2 className="w-5 h-5 animate-spin text-teal-400" />
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-slate-500 mb-1" />
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Upload Cover</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const rawFile = e.target.files?.[0]
                        if (!rawFile) return
                        setUploading('coverImage')
                        try {
                          const file = await compressImage(rawFile)
                          const formData = new FormData()
                          formData.append('file', file)
                          const res = await fetch(`/api/admin?action=upload-asset&prefix=blogs&name=cover_${Date.now()}`, {
                            method: 'POST',
                            body: formData
                          })
                          if (res.ok) {
                            const data = await res.json()
                            setEditingItem({
                              ...editingItem,
                              coverImage: {
                                _type: 'image',
                                asset: { _type: 'reference', _ref: data.asset._id }
                              }
                            })
                          }
                        } catch (err) {
                          console.error(err)
                        } finally {
                          setUploading(null)
                        }
                      }}
                    />
                  </label>
                )}
                <span className="text-xs text-slate-500">Notion-like article header cover image. WebP or JPEG recommended.</span>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Tags (Comma-separated)</label>
              <input
                type="text"
                value={editingItem.tags?.join(', ') || ''}
                onChange={(e) => {
                  const tagsArray = e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter((t) => t !== '')
                  setEditingItem({ ...editingItem, tags: tagsArray })
                }}
                placeholder="e.g. React, NextJS, Styling, WebDev"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none"
              />
            </div>

            {/* Content Body */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 font-bold block mb-1">
                Content Body (Rich Editor)
              </label>
              {activeLanguageForm === 'en' ? (
                <RichTextEditor
                  value={editingItem.content?.en || ''}
                  onChange={(val) =>
                    setEditingItem({
                      ...editingItem,
                      content: { ...editingItem.content, en: val, _type: 'localeBlock' }
                    })
                  }
                  activeTab="blogs"
                  editingItem={editingItem}
                  placeholder="Write your article in Markdown/Notion blocks..."
                  rows={10}
                  setPreviewModalContent={setPreviewModalContent}
                />
              ) : (
                <RichTextEditor
                  value={editingItem.content?.id || ''}
                  onChange={(val) =>
                    setEditingItem({
                      ...editingItem,
                      content: { ...editingItem.content, id: val, _type: 'localeBlock' }
                    })
                  }
                  activeTab="blogs"
                  editingItem={editingItem}
                  placeholder="Tulis konten artikel dalam Bahasa Indonesia di sini..."
                  rows={10}
                  setPreviewModalContent={setPreviewModalContent}
                />
              )}
            </div>

            {/* Published At Date & Time */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Published At</label>
              <input
                type="datetime-local"
                value={
                  editingItem.publishedAt
                    ? new Date(editingItem.publishedAt).toISOString().slice(0, 16)
                    : new Date().toISOString().slice(0, 16)
                }
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    publishedAt: e.target.value ? new Date(e.target.value).toISOString() : new Date().toISOString()
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none"
              />
            </div>

            {/* SEO Settings */}
            <div className="pt-4 border-t border-slate-850 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">SEO Settings (Optional)</h4>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Meta Title</label>
                  <input
                    type="text"
                    value={editingItem.seoMetaTitle || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, seoMetaTitle: e.target.value })}
                    placeholder="Custom title tag for search engines..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Meta Description</label>
                  <textarea
                    rows={2}
                    value={editingItem.seoMetaDescription || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, seoMetaDescription: e.target.value })}
                    placeholder="Short description snippet for search results..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-slate-850">
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingItem(null)
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-sm font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSaveDocument('blog')}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 hover:bg-teal-400 disabled:bg-teal-500/50 text-sm font-bold transition flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Article
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header bar: total counter and bulk delete */}
          {blogs.length > 0 && (
            <div className="flex justify-between items-center bg-slate-900/20 border border-slate-850 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={blogs.length > 0 && selectedIds.length === blogs.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(blogs.map((b) => b._id))
                    } else {
                      setSelectedIds([])
                    }
                  }}
                  className="w-4 h-4 rounded border-slate-800 text-teal-500 cursor-pointer"
                />
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  {selectedIds.length > 0 ? `${selectedIds.length} of ${blogs.length} Selected` : `Total Articles: ${blogs.length}`}
                </span>
              </div>
              {selectedIds.length > 0 && (
                <button
                  onClick={executeBulkDelete}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-bold rounded-xl border border-rose-500/20 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Bulk Delete
                </button>
              )}
            </div>
          )}

          {/* Articles List */}
          {blogs.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-950">
              <BookOpen className="w-10 h-10 text-slate-600 mx-auto mb-2.5" />
              <h4 className="text-sm font-bold text-slate-400">No blog posts found</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Create your first blog post using the Notion-like editor to write articles.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {blogs.map((b) => {
                const isSelected = selectedIds.includes(b._id)
                return (
                  <div
                    key={b._id}
                    className={`bg-slate-900/40 border p-6 rounded-2xl flex items-center justify-between transition-all duration-150 ${
                      isSelected ? 'border-teal-500/50 bg-teal-950/5' : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds((prev) => [...prev, b._id])
                          } else {
                            setSelectedIds((prev) => prev.filter((id) => id !== b._id))
                          }
                        }}
                        className="w-4 h-4 rounded border-slate-800 text-teal-500 cursor-pointer"
                      />
                      {b.coverImage?.asset?._ref && (
                        <img
                          src={`https://cdn.sanity.io/images/tspoltvg/development/${b.coverImage.asset._ref
                            .replace('image-', '')
                            .replace('-png', '.png')
                            .replace('-jpg', '.jpg')
                            .replace('-webp', '.webp')
                            .replace('-svg', '.svg')}`}
                          alt="Cover Thumbnail"
                          className="w-12 h-12 rounded-lg object-cover border border-slate-850 hidden sm:block"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">{b.title?.en || b.title?.id || 'Untitled Article'}</h4>
                          <span
                            className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md border ${
                              b.status === 'published'
                                ? 'bg-teal-500/10 text-teal-400 border-teal-500/20'
                                : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            }`}
                          >
                            {b.status || 'draft'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                          {b.slug?.current && <span>Slug: /{b.slug.current}</span>}
                          {b.tags && b.tags.length > 0 && <span className="text-slate-400">Tags: {b.tags.join(', ')}</span>}
                          {b.publishedAt && <span>Date: {new Date(b.publishedAt).toLocaleDateString()}</span>}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartForm(b)}
                        className="p-2 bg-slate-855 rounded-lg text-slate-300 hover:text-white cursor-pointer transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(b._id)}
                        className="text-rose-500 hover:text-rose-400 cursor-pointer p-2 bg-rose-500/10 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
