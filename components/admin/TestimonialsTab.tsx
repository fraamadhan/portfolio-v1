import React from 'react'
import { Plus, Trash2, Edit2, Save, Loader2, MessageSquare } from 'lucide-react'
import { textToArray, arrayToText } from './utils'

interface TestimonialsTabProps {
  testimonials: any[]
  showForm: boolean
  setShowForm: (show: boolean) => void
  editingItem: any
  setEditingItem: (item: any) => void
  handleSaveDocument: (docType: string) => Promise<void>
  selectedIds: string[]
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
  executeBulkDelete: () => void
  handleStartForm: (item: any) => void
  setDeleteTargetId: (id: string) => void
  saving: boolean
}

export default function TestimonialsTab({
  testimonials,
  showForm,
  setShowForm,
  editingItem,
  setEditingItem,
  handleSaveDocument,
  selectedIds,
  setSelectedIds,
  executeBulkDelete,
  handleStartForm,
  setDeleteTargetId,
  saving
}: TestimonialsTabProps) {
  return (
    <div className="space-y-8">
      {showForm ? (
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold">{editingItem._id ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Giver Name</label>
              <input
                type="text"
                value={editingItem.giverName || ''}
                onChange={(e) => setEditingItem({ ...editingItem, giverName: e.target.value })}
                placeholder="e.g. Jane Doe"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Giver Role / Context</label>
              <input
                type="text"
                value={editingItem.giverRole || ''}
                onChange={(e) => setEditingItem({ ...editingItem, giverRole: e.target.value })}
                placeholder="e.g. Senior Product Manager"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
              />
            </div>
            <div className="space-y-1 col-span-1 sm:col-span-2">
              <label className="text-xs text-slate-400">Institution</label>
              <input
                type="text"
                value={editingItem.giverInstitution || ''}
                onChange={(e) => setEditingItem({ ...editingItem, giverInstitution: e.target.value })}
                placeholder="e.g. Google"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
              />
            </div>
            <div className="space-y-1 col-span-1 sm:col-span-2">
              <label className="text-xs text-slate-400">Tags / Filter Label (Comma-separated)</label>
              <input
                type="text"
                value={arrayToText(editingItem.tags)}
                onChange={(e) => setEditingItem({ ...editingItem, tags: textToArray(e.target.value) })}
                placeholder="e.g. Backend, Teamwork, Leadership"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
              />
            </div>
            {/* Bilingual Testimonial Content */}
            <div className="space-y-1 col-span-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-400">Testimonial Content (EN)</label>
              <textarea
                rows={3}
                value={editingItem.content?.en || ''}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    content: { ...editingItem.content, en: e.target.value, _type: 'localeString' }
                  })
                }
                placeholder="e.g. Fakhri is an outstanding developer who consistently delivers high-quality code."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 resize-none text-slate-200 focus:outline-none"
              />
            </div>
            <div className="space-y-1 col-span-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-400">Testimonial Content (ID - Optional)</label>
              <textarea
                rows={3}
                value={editingItem.content?.id || ''}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    content: { ...editingItem.content, id: e.target.value, _type: 'localeString' }
                  })
                }
                placeholder="Contoh: Fakhri adalah pengembang luar biasa yang konsisten menghasilkan kode berkualitas tinggi."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 resize-none text-slate-200 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4 pt-4 border-t border-slate-855">
            <button
              onClick={() => handleSaveDocument('testimonial')}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 disabled:bg-teal-500/50 cursor-pointer transition flex items-center gap-1.5"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Testimonial
            </button>
            <button
              onClick={() => setShowForm(false)}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Bulk Delete Controls */}
          {testimonials.length > 0 && (
            <div className="flex items-center justify-between bg-slate-900/40 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.length === testimonials.length && testimonials.length > 0}
                  onChange={(e) => setSelectedIds(e.target.checked ? testimonials.map((x) => x._id) : [])}
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
          {testimonials.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-950">
              <MessageSquare className="w-10 h-10 text-slate-600 mx-auto mb-2.5" />
              <h4 className="text-sm font-bold text-slate-400">No testimonials found</h4>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {testimonials.map((testi) => {
                const isSelected = selectedIds.includes(testi._id)
                return (
                  <div
                    key={testi._id}
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
                            e.target.checked ? [...selectedIds, testi._id] : selectedIds.filter((id) => id !== testi._id)
                          )
                        }
                        className="w-4 h-4 rounded border-slate-800 text-teal-500 cursor-pointer"
                      />
                      <div>
                        <h4 className="font-bold text-sm">{testi.giverName}</h4>
                        <p className="text-xs text-teal-400 mt-0.5">
                          {testi.giverRole} at {testi.giverInstitution}
                        </p>
                        {testi.tags && testi.tags.length > 0 && (
                          <div className="flex gap-1 mt-2">
                            {testi.tags.map((t: string) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 text-[9px] bg-slate-800 text-slate-400 rounded-full font-bold uppercase"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartForm(testi)}
                        className="p-2 bg-slate-855 rounded-lg text-slate-300 hover:text-white cursor-pointer transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(testi._id)}
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
