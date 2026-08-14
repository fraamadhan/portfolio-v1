import React from 'react'
import { Plus, Trash2, Edit2, Save, Loader2, FolderGit, Upload, CheckCircle, X } from 'lucide-react'
import RichTextEditor from './RichTextEditor'
import { compressImage } from './utils'

interface ProjectsTabProps {
  projects: any[]
  categories: any[]
  tools: any[]
  showForm: boolean
  setShowForm: (show: boolean) => void
  editingItem: any
  setEditingItem: (item: any) => void
  activeLanguageForm: 'en' | 'id'
  setActiveLanguageForm: (lang: 'en' | 'id') => void
  uploading: string | null
  setUploading: (val: string | null) => void
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    options: { isUser?: boolean; fieldName: string; index?: number; subFieldName?: string }
  ) => Promise<void>
  handleSaveDocument: (docType: string) => Promise<void>
  selectedIds: string[]
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
  executeBulkDelete: () => void
  handleStartForm: (item: any) => void
  setDeleteTargetId: (id: string) => void
  saving: boolean
  setPreviewModalContent: (val: string) => void
}

export default function ProjectsTab({
  projects,
  categories,
  tools,
  showForm,
  setShowForm,
  editingItem,
  setEditingItem,
  activeLanguageForm,
  setActiveLanguageForm,
  uploading,
  setUploading,
  handleFileUpload,
  handleSaveDocument,
  selectedIds,
  setSelectedIds,
  executeBulkDelete,
  handleStartForm,
  setDeleteTargetId,
  saving,
  setPreviewModalContent
}: ProjectsTabProps) {
  return (
    <div className="space-y-8">
      {showForm ? (
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold">{editingItem._id ? 'Edit Project' : 'Add New Project'}</h3>
          {/* Form Controls */}
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
              {/* Order Priority */}
              <div className="flex items-center gap-3">
                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Priority / Order</label>
                <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg overflow-hidden p-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      setEditingItem({ ...editingItem, order: Math.max(0, (editingItem.order || 0) - 1) })
                    }
                    className="px-2.5 py-1 text-slate-400 hover:text-white hover:bg-slate-850 rounded text-xs font-bold transition cursor-pointer select-none"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    pattern="[0-9]*"
                    value={editingItem.order ?? 0}
                    onChange={(e) => {
                      const val = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0
                      setEditingItem({ ...editingItem, order: val })
                    }}
                    className="w-10 bg-transparent text-slate-200 text-center font-bold text-xs focus:outline-none select-none pointer-events-none"
                  />
                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...editingItem, order: (editingItem.order || 0) + 1 })}
                    className="px-2.5 py-1 text-slate-400 hover:text-white hover:bg-slate-850 rounded text-xs font-bold transition cursor-pointer select-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Draft Status Switch */}
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="isDraft"
                  checked={editingItem.isDraft ?? false}
                  onChange={(e) => setEditingItem({ ...editingItem, isDraft: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-slate-950 cursor-pointer"
                />
                <label htmlFor="isDraft" className="text-xs text-slate-300 font-semibold cursor-pointer">
                  Save as Draft (Hide in portfolio)
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Title */}
            {activeLanguageForm === 'en' ? (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Project Title (EN)</label>
                <input
                  type="text"
                  value={editingItem.title?.en || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      title: { ...editingItem.title, en: e.target.value, _type: 'localeString' }
                    })
                  }
                  placeholder="e.g. Antigravity Developer Hub"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Project Title (ID - Optional)</label>
                <input
                  type="text"
                  value={editingItem.title?.id || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      title: { ...editingItem.title, id: e.target.value, _type: 'localeString' }
                    })
                  }
                  placeholder="Contoh: Pusat Pengembang Antigravity"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>
            )}

            {/* Role in Project */}
            {activeLanguageForm === 'en' ? (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Role in Project (EN)</label>
                <input
                  type="text"
                  value={editingItem.roleInProject?.en || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      roleInProject: { ...editingItem.roleInProject, en: e.target.value, _type: 'localeString' }
                    })
                  }
                  placeholder="e.g. Lead Architect / Full Stack Engineer"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Role in Project (ID - Optional)</label>
                <input
                  type="text"
                  value={editingItem.roleInProject?.id || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      roleInProject: { ...editingItem.roleInProject, id: e.target.value, _type: 'localeString' }
                    })
                  }
                  placeholder="Contoh: Arsitek Utama / Insinyur Full Stack"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>
            )}

            {/* Category Selection */}
            <div className="space-y-1">
              <label className="text-xs text-slate-400 font-semibold">Category Reference</label>
              <select
                value={editingItem.category?._ref || ''}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    category: { _type: 'reference', _ref: e.target.value }
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-350 focus:outline-none"
              >
                <option value="">-- Choose Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title?.en || cat.title?.id}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            {activeLanguageForm === 'en' ? (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Short Description (EN)</label>
                <textarea
                  rows={2}
                  value={editingItem.description?.en || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: { ...editingItem.description, en: e.target.value, _type: 'localeString' }
                    })
                  }
                  placeholder="e.g. A next-generation developer tooling suite powered by advanced agents."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 resize-none focus:outline-none"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Short Description (ID - Optional)</label>
                <textarea
                  rows={2}
                  value={editingItem.description?.id || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: { ...editingItem.description, id: e.target.value, _type: 'localeString' }
                    })
                  }
                  placeholder="Contoh: Rangkaian perkakas pengembang generasi berikutnya yang didukung agen cerdas."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 resize-none focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Highlights */}
          <div className="space-y-4 pt-2">
            {activeLanguageForm === 'en' ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-400">Key Highlights (EN)</label>
                  <button
                    type="button"
                    onClick={() => {
                      const current = editingItem.keyHighlights || []
                      setEditingItem({
                        ...editingItem,
                        keyHighlights: [...current, { _type: 'localeString', en: '' }]
                      })
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs bg-teal-500/15 text-teal-400 font-semibold rounded-lg hover:bg-teal-500/25 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Highlight (EN)
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-850">
                  {(!editingItem.keyHighlights ||
                    editingItem.keyHighlights.length === 0) && (
                    <p className="text-xs text-slate-500 italic text-center py-2">No English highlights added yet.</p>
                  )}
                  {editingItem.keyHighlights?.map((hl: any, idx: number) => {
                    return (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={hl.en || ''}
                          onChange={(e) => {
                            const arr = [...editingItem.keyHighlights]
                            arr[idx] = { ...arr[idx], en: e.target.value }
                            setEditingItem({ ...editingItem, keyHighlights: arr })
                          }}
                          placeholder="e.g. Optimized database queries by 40% with Redis caching"
                          className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const arr = editingItem.keyHighlights.filter((_: any, i: number) => i !== idx)
                            setEditingItem({ ...editingItem, keyHighlights: arr })
                          }}
                          className="p-1.5 text-rose-500 hover:bg-rose-500/5 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-400">Key Highlights (ID - Optional)</label>
                  <button
                    type="button"
                    onClick={() => {
                      const current = editingItem.keyHighlights || []
                      setEditingItem({
                        ...editingItem,
                        keyHighlights: [...current, { _type: 'localeString', id: '' }]
                      })
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs bg-teal-500/15 text-teal-400 font-semibold rounded-lg hover:bg-teal-500/25 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Highlight (ID)
                  </button>
                </div>

                <div className="space-y-2 max-h-40 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-850">
                  {(!editingItem.keyHighlights ||
                    editingItem.keyHighlights.length === 0) && (
                    <p className="text-xs text-slate-500 italic text-center py-2">
                      No Indonesian highlights added yet.
                    </p>
                  )}
                  {editingItem.keyHighlights?.map((hl: any, idx: number) => {
                    return (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={hl.id || ''}
                          onChange={(e) => {
                            const arr = [...editingItem.keyHighlights]
                            arr[idx] = { ...arr[idx], id: e.target.value }
                            setEditingItem({ ...editingItem, keyHighlights: arr })
                          }}
                          placeholder="Contoh: Mengoptimalkan kueri basis data sebesar 40% dengan Redis"
                          className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const arr = editingItem.keyHighlights.filter((_: any, i: number) => i !== idx)
                            setEditingItem({ ...editingItem, keyHighlights: arr })
                          }}
                          className="p-1.5 text-rose-500 hover:bg-rose-500/5 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Tech stack checkboxes */}
          <div className="space-y-2">
            <label className="text-xs text-slate-400 block font-semibold">Tech Stack / Tools Used</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950 p-4 rounded-xl border border-slate-850 max-h-40 overflow-y-auto">
              {tools.map((tool) => {
                const isChecked = editingItem.toolsUsed?.some((t: any) => t._ref === tool._id)
                return (
                  <label
                    key={tool._id}
                    className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked ?? false}
                      onChange={(e) => {
                        const list = editingItem.toolsUsed || []
                        const updatedList = e.target.checked
                          ? [...list, { _type: 'reference', _ref: tool._id }]
                          : list.filter((t: any) => t._ref !== tool._id)
                        setEditingItem({ ...editingItem, toolsUsed: updatedList })
                      }}
                      className="w-3.5 h-3.5 rounded border-slate-800 text-teal-500"
                    />
                    <span>{tool.name}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Detailed Story (Markdown Editor) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 font-bold block mb-1">
              Detailed Story (Rich Text Editor)
            </label>
            {activeLanguageForm === 'en' ? (
              <RichTextEditor
                value={editingItem.detailStory?.en || ''}
                onChange={(val) =>
                  setEditingItem({
                    ...editingItem,
                    detailStory: { ...editingItem.detailStory, en: val, _type: 'localeBlock' }
                  })
                }
                activeTab="projects"
                editingItem={editingItem}
                placeholder="Mulai bercerita tentang case study atau proses pembuatan proyek ini..."
                rows={6}
                setPreviewModalContent={setPreviewModalContent}
              />
            ) : (
              <RichTextEditor
                value={editingItem.detailStory?.id || ''}
                onChange={(val) =>
                  setEditingItem({
                    ...editingItem,
                    detailStory: { ...editingItem.detailStory, id: val, _type: 'localeBlock' }
                  })
                }
                activeTab="projects"
                editingItem={editingItem}
                placeholder="Tulis cerita detail proyek dalam Bahasa Indonesia di sini..."
                rows={6}
                setPreviewModalContent={setPreviewModalContent}
              />
            )}
          </div>

          {/* Multiple Screenshots Upload */}
          <div className="space-y-2">
            <label className="text-xs text-slate-400 block font-semibold">Project Screenshots / Pictures</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-950 rounded-xl border border-slate-855">
              {editingItem.images?.map((img: any, idx: number) => (
                <div
                  key={idx}
                  className="relative group rounded-lg overflow-hidden border border-slate-800 aspect-video bg-slate-900 flex items-center justify-center"
                >
                  <img src={img.url || '/api/placeholder/400/225'} className="object-cover w-full h-full" alt="screenshot" />
                  <button
                    type="button"
                    onClick={() => {
                      const list = editingItem.images.filter((_: any, i: number) => i !== idx)
                      setEditingItem({ ...editingItem, images: list })
                    }}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rose-500 font-bold transition duration-200 cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}

              <label className="border border-dashed border-slate-850 hover:border-teal-500 rounded-lg aspect-video flex flex-col items-center justify-center cursor-pointer text-slate-500 hover:text-teal-400 transition bg-slate-950/20">
                {uploading === 'projImages' ? (
                  <Loader2 className="w-5 h-5 animate-spin text-teal-400" />
                ) : (
                  <>
                    <Upload className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Add Screenshot</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    setUploading('projImages')
                    try {
                      const projName = (editingItem?.title?.en || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-')
                      const formData = new FormData()
                      formData.append('file', await compressImage(file))
                      const res = await fetch(`/api/admin?action=upload-asset&prefix=projects&name=${projName}_ss_${Date.now()}`, {
                        method: 'POST',
                        body: formData
                      })
                      if (res.ok) {
                        const data = await res.json()
                        const ref = {
                          _type: 'image',
                          asset: { _type: 'reference', _ref: data.asset._id },
                          url: data.asset.url
                        }
                        setEditingItem((prev: any) => ({
                          ...prev,
                          images: [...(prev.images || []), ref]
                        }))
                      }
                    } catch (err) {
                      console.error(err)
                    } finally {
                      setUploading(null)
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Project Links */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center">
              <label className="text-xs text-slate-400 font-semibold block">
                Important Links (e.g. Code Repositories, Live Demos)
              </label>
              <button
                type="button"
                onClick={() =>
                  setEditingItem((prev: any) => ({
                    ...prev,
                    links: [...(prev.links || []), { label: '', url: '' }]
                  }))
                }
                className="flex items-center gap-1.5 px-3 py-1 text-xs bg-teal-500/15 text-teal-455 font-semibold rounded-lg hover:bg-teal-500/25 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Link
              </button>
            </div>

            <div className="space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-850">
              {editingItem.links?.map((link: any, idx: number) => (
                <div
                  key={idx}
                  className="flex gap-4 items-end border-b border-slate-900 pb-4 last:border-none last:pb-0"
                >
                  <div className="w-1/3 space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-bold">Label</label>
                    <input
                      type="text"
                      value={link.label || ''}
                      onChange={(e) => {
                        const arr = [...editingItem.links]
                        arr[idx].label = e.target.value
                        setEditingItem({ ...editingItem, links: arr })
                      }}
                      placeholder="e.g. Github Repo, live demo"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-bold">URL</label>
                    <input
                      type="url"
                      value={link.url || ''}
                      onChange={(e) => {
                        const arr = [...editingItem.links]
                        arr[idx].url = e.target.value
                        setEditingItem({ ...editingItem, links: arr })
                      }}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300"
                    />
                  </div>
                  <div className="w-1/4 space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-bold block">Icon Upload</label>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer transition">
                        <Upload className="w-3 h-3" />
                        <span>{uploading === `links-${idx}-icon` ? '...' : 'Upload'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, { fieldName: 'links', index: idx, subFieldName: 'icon' })}
                          className="hidden"
                        />
                      </label>
                      {link.icon && <CheckCircle className="w-3.5 h-3.5 text-teal-400" />}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const arr = editingItem.links.filter((_: any, i: number) => i !== idx)
                      setEditingItem({ ...editingItem, links: arr })
                    }}
                    className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
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
              onClick={() => handleSaveDocument('project')}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 hover:bg-teal-400 disabled:bg-teal-500/50 text-sm font-bold transition flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Project
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header bar: total counter and bulk delete */}
          {projects.length > 0 && (
            <div className="flex justify-between items-center bg-slate-900/20 border border-slate-850 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={projects.length > 0 && selectedIds.length === projects.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(projects.map((p) => p._id))
                    } else {
                      setSelectedIds([])
                    }
                  }}
                  className="w-4 h-4 rounded border-slate-800 text-teal-500 cursor-pointer"
                />
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  {selectedIds.length > 0 ? `${selectedIds.length} of ${projects.length} Selected` : `Total Projects: ${projects.length}`}
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

          {/* List */}
          {projects.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-950">
              <FolderGit className="w-10 h-10 text-slate-600 mx-auto mb-2.5" />
              <h4 className="text-sm font-bold text-slate-400">No projects found</h4>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {projects.map((proj) => {
                const isSelected = selectedIds.includes(proj._id)
                return (
                  <div
                    key={proj._id}
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
                            setSelectedIds((prev) => [...prev, proj._id])
                          } else {
                            setSelectedIds((prev) => prev.filter((id) => id !== proj._id))
                          }
                        }}
                        className="w-4 h-4 rounded border-slate-800 text-teal-500 cursor-pointer"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">{proj.title?.en || proj.title?.id || 'Untitled Project'}</h4>
                          {proj.isDraft && (
                            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 rounded-md border border-amber-500/20">
                              Draft
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 mt-1">{proj.roleInProject?.en || proj.roleInProject?.id}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartForm(proj)}
                        className="p-2 bg-slate-855 text-slate-300 hover:text-white rounded-lg cursor-pointer transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(proj._id)}
                        className="p-2 bg-rose-500/10 text-rose-500 rounded-lg cursor-pointer transition"
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
