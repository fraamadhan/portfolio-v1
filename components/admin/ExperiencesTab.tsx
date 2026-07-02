import React from 'react'
import { Plus, Trash2, Edit2, Save, Loader2, Upload, CheckCircle, Briefcase } from 'lucide-react'
import RichTextEditor from './RichTextEditor'

interface ExperiencesTabProps {
  experiences: any[]
  tools: any[]
  showForm: boolean
  setShowForm: (show: boolean) => void
  editingItem: any
  setEditingItem: (item: any) => void
  activeLanguageForm: 'en' | 'id'
  setActiveLanguageForm: (lang: 'en' | 'id') => void
  handleSaveDocument: (docType: string) => Promise<void>
  selectedIds: string[]
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
  executeBulkDelete: () => void
  handleStartForm: (item: any) => void
  setDeleteTargetId: (id: string) => void
  saving: boolean
  setPreviewModalContent: (val: string) => void
}

export default function ExperiencesTab({
  experiences,
  tools,
  showForm,
  setShowForm,
  editingItem,
  setEditingItem,
  activeLanguageForm,
  setActiveLanguageForm,
  handleSaveDocument,
  selectedIds,
  setSelectedIds,
  executeBulkDelete,
  handleStartForm,
  setDeleteTargetId,
  saving,
  setPreviewModalContent
}: ExperiencesTabProps) {
  return (
    <div className="space-y-8">
      {showForm ? (
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold">{editingItem._id ? 'Edit Experience' : 'Add Experience'}</h3>

          {/* Form Controls: Language Selector, Order, & Draft Switch */}
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
                    className="px-2.5 py-1 text-slate-400 hover:text-white hover:bg-slate-855 rounded text-xs font-bold transition cursor-pointer select-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Draft Status Switch */}
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="isDraftExp"
                  checked={editingItem.isDraft ?? false}
                  onChange={(e) => setEditingItem({ ...editingItem, isDraft: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-slate-950 cursor-pointer"
                />
                <label htmlFor="isDraftExp" className="text-xs text-slate-300 font-semibold cursor-pointer">
                  Save as Draft (Hide in portfolio)
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Company Name</label>
              <input
                type="text"
                value={editingItem.company || ''}
                onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                placeholder="e.g. Google Indonesia"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Location (City, Country)</label>
              <input
                type="text"
                value={editingItem.location || ''}
                onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                placeholder="e.g. Jakarta, Indonesia"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
              />
            </div>

            {/* Role Title Bilingual */}
            {activeLanguageForm === 'en' ? (
              <div className="space-y-1 col-span-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-400">Role Title (EN)</label>
                <input
                  type="text"
                  value={editingItem.role?.en || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      role: { ...editingItem.role, en: e.target.value, _type: 'localeString' }
                    })
                  }
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>
            ) : (
              <div className="space-y-1 col-span-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-400">Role Title (ID - Optional)</label>
                <input
                  type="text"
                  value={editingItem.role?.id || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      role: { ...editingItem.role, id: e.target.value, _type: 'localeString' }
                    })
                  }
                  placeholder="Contoh: Insinyur Frontend Senior"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>
            )}

            <div className="space-y-1 col-span-1 sm:col-span-2">
              <label className="text-xs text-slate-400 font-semibold">Program Type</label>
              <select
                value={editingItem.programType || 'Full-time'}
                onChange={(e) => setEditingItem({ ...editingItem, programType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-350 focus:outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Date From</label>
              <input
                type="date"
                value={editingItem.dateFrom || ''}
                onChange={(e) => setEditingItem({ ...editingItem, dateFrom: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 [color-scheme:dark] outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Date To</label>
              <input
                type="date"
                disabled={editingItem.isCurrent}
                value={editingItem.dateTo || ''}
                onChange={(e) => setEditingItem({ ...editingItem, dateTo: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 disabled:opacity-50 [color-scheme:dark] outline-none"
              />
            </div>
            <div className="flex items-center gap-2 col-span-1 sm:col-span-2 pl-2">
              <input
                type="checkbox"
                id="isCurrentExp"
                checked={editingItem.isCurrent ?? false}
                onChange={(e) => setEditingItem({ ...editingItem, isCurrent: e.target.checked })}
                className="w-4 h-4 rounded border-slate-800 text-teal-500 cursor-pointer"
              />
              <label htmlFor="isCurrentExp" className="text-xs text-slate-300 cursor-pointer">
                Currently working in this role (Active)
              </label>
            </div>

            {/* Keypoints */}
            <div className="space-y-4 pt-2 col-span-1 sm:col-span-2">
              {activeLanguageForm === 'en' ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-400">Keypoints (EN)</label>
                    <button
                      type="button"
                      onClick={() => {
                        const current = editingItem.keypoints || []
                        setEditingItem({
                          ...editingItem,
                          keypoints: [
                            ...current.filter((k: any) => k.en !== undefined),
                            { _type: 'localeString', en: '' }
                          ]
                        })
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 text-xs bg-teal-500/15 text-teal-400 font-semibold rounded-lg hover:bg-teal-500/25 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Keypoint (EN)
                    </button>
                  </div>

                  <div className="space-y-2 max-h-40 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-850">
                    {(!editingItem.keypoints ||
                      editingItem.keypoints.filter((k: any) => k.en !== undefined).length === 0) && (
                      <p className="text-xs text-slate-500 italic text-center py-2">No English keypoints added yet.</p>
                    )}
                    {editingItem.keypoints
                      ?.filter((k: any) => k.en !== undefined)
                      .map((kp: any, idx: number) => {
                        const realIdx = editingItem.keypoints.findIndex((k: any) => k === kp)
                        return (
                          <div key={idx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={kp.en || ''}
                              onChange={(e) => {
                                const arr = [...editingItem.keypoints]
                                arr[realIdx] = { ...arr[realIdx], en: e.target.value }
                                setEditingItem({ ...editingItem, keypoints: arr })
                              }}
                              placeholder="e.g. Led a team of 4 frontend engineers to rebuild the dashboard"
                              className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const arr = editingItem.keypoints.filter((_: any, i: number) => i !== realIdx)
                                setEditingItem({ ...editingItem, keypoints: arr })
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
                    <label className="text-xs font-semibold text-slate-400">Keypoints (ID - Optional)</label>
                    <button
                      type="button"
                      onClick={() => {
                        const current = editingItem.keypoints || []
                        setEditingItem({
                          ...editingItem,
                          keypoints: [
                            ...current.filter((k: any) => k.id !== undefined),
                            { _type: 'localeString', id: '' }
                          ]
                        })
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 text-xs bg-teal-500/15 text-teal-400 font-semibold rounded-lg hover:bg-teal-500/25 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Keypoint (ID)
                    </button>
                  </div>

                  <div className="space-y-2 max-h-40 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-850">
                    {(!editingItem.keypoints ||
                      editingItem.keypoints.filter((k: any) => k.id !== undefined).length === 0) && (
                      <p className="text-xs text-slate-500 italic text-center py-2">
                        No Indonesian keypoints added yet.
                      </p>
                    )}
                    {editingItem.keypoints
                      ?.filter((k: any) => k.id !== undefined)
                      .map((kp: any, idx: number) => {
                        const realIdx = editingItem.keypoints.findIndex((k: any) => k === kp)
                        return (
                          <div key={idx} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={kp.id || ''}
                              onChange={(e) => {
                                const arr = [...editingItem.keypoints]
                                arr[realIdx] = { ...arr[realIdx], id: e.target.value }
                                setEditingItem({ ...editingItem, keypoints: arr })
                              }}
                              placeholder="Contoh: Memimpin tim berisi 4 insinyur frontend"
                              className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const arr = editingItem.keypoints.filter((_: any, i: number) => i !== realIdx)
                                setEditingItem({ ...editingItem, keypoints: arr })
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

            {/* Tools list */}
            <div className="space-y-2 col-span-1 sm:col-span-2">
              <label className="text-xs text-slate-400 font-semibold block">Tools Used in this Experience</label>
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

            {/* Detailed story */}
            <div className="space-y-2 col-span-1 sm:col-span-2">
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
                  activeTab="experiences"
                  editingItem={editingItem}
                  placeholder="Ceritakan secara detail tantangan, pekerjaan, dan pengalaman seru di sini..."
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
                  activeTab="experiences"
                  editingItem={editingItem}
                  placeholder="Ceritakan pengalaman seru dalam Bahasa Indonesia di sini..."
                  rows={6}
                  setPreviewModalContent={setPreviewModalContent}
                />
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-850">
            <button
              onClick={() => handleSaveDocument('experience')}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 disabled:bg-teal-500/50 cursor-pointer transition flex items-center gap-1.5"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Experience
            </button>
            <button
              onClick={() => setShowForm(false)}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-slate-855 hover:bg-slate-750 text-slate-205 cursor-pointer transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Bulk delete controls */}
          {experiences.length > 0 && (
            <div className="flex items-center justify-between bg-slate-900/40 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.length === experiences.length && experiences.length > 0}
                  onChange={(e) => setSelectedIds(e.target.checked ? experiences.map((x) => x._id) : [])}
                  className="w-4 h-4 rounded border-slate-800 text-teal-500 cursor-pointer"
                />
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  {selectedIds.length === 0 ? 'Select all to bulk action' : `${selectedIds.length} item(s) selected`}
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
          {experiences.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-950">
              <Briefcase className="w-10 h-10 text-slate-600 mx-auto mb-2.5" />
              <h4 className="text-sm font-bold text-slate-400">No experiences found</h4>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {experiences.map((exp) => {
                const isSelected = selectedIds.includes(exp._id)
                return (
                  <div
                    key={exp._id}
                    className={`bg-slate-900/40 border p-6 rounded-2xl flex items-center justify-between transition-all duration-150 ${
                      isSelected ? 'border-teal-500/50 bg-teal-950/5' : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) =>
                          setSelectedIds(
                            e.target.checked ? [...selectedIds, exp._id] : selectedIds.filter((id) => id !== exp._id)
                          )
                        }
                        className="w-4 h-4 rounded border-slate-800 text-teal-500 cursor-pointer"
                      />
                      <div>
                        <h4 className="font-bold">{exp.role?.en || exp.role?.id || 'Untitled Role'}</h4>
                        <p className="text-xs text-teal-400">
                          {exp.company} - {exp.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartForm(exp)}
                        className="p-2 bg-slate-850 rounded-lg text-slate-350 hover:text-white cursor-pointer transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(exp._id)}
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
