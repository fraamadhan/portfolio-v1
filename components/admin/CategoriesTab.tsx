import React from 'react'
import { Plus, Trash2, Edit2, Save, Loader2, Layers } from 'lucide-react'

interface CategoriesTabProps {
  categories: any[]
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
}

export default function CategoriesTab({
  categories,
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
  saving
}: CategoriesTabProps) {
  return (
    <div className="space-y-8">
      {showForm ? (
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold">{editingItem._id ? 'Edit Category' : 'Add New Category'}</h3>
          
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
            <div className="flex gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-850">
              <button
                type="button"
                onClick={() => setActiveLanguageForm('en')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${activeLanguageForm === 'en' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                English (EN)
              </button>
              <button
                type="button"
                onClick={() => setActiveLanguageForm('id')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${activeLanguageForm === 'id' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                Bahasa Indonesia (ID)
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {activeLanguageForm === 'en' ? (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Category Title (EN)</label>
                <input
                  type="text"
                  value={editingItem.title?.en || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: { ...editingItem.title, en: e.target.value, _type: 'localeString' } })}
                  placeholder="e.g. Backend Development"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Category Title (ID - Optional)</label>
                <input
                  type="text"
                  value={editingItem.title?.id || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: { ...editingItem.title, id: e.target.value, _type: 'localeString' } })}
                  placeholder="Contoh: Pengembangan Backend"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>
            )}

            {activeLanguageForm === 'en' ? (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Short Description (EN)</label>
                <textarea
                  rows={2}
                  value={editingItem.description?.en || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: { ...editingItem.description, en: e.target.value, _type: 'localeString' } })}
                  placeholder="e.g. Server-side development tools, APIs, and cloud services."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 resize-none focus:outline-none"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Short Description (ID - Optional)</label>
                <textarea
                  rows={2}
                  value={editingItem.description?.id || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: { ...editingItem.description, id: e.target.value, _type: 'localeString' } })}
                  placeholder="Contoh: Perkakas pengembangan sisi server, API, dan layanan awan."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 resize-none focus:outline-none"
                />
              </div>
            )}
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
              onClick={() => handleSaveDocument('category')}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 hover:bg-teal-400 disabled:bg-teal-500/50 text-sm font-bold transition flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Category
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.length > 0 && (
            <div className="flex justify-between items-center bg-slate-900/20 border border-slate-850 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={categories.length > 0 && selectedIds.length === categories.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(categories.map(c => c._id))
                    } else {
                      setSelectedIds([])
                    }
                  }}
                  className="w-4 h-4 rounded border-slate-800 text-teal-500 cursor-pointer"
                />
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  {selectedIds.length > 0 ? `${selectedIds.length} of ${categories.length} Selected` : `Total Categories: ${categories.length}`}
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

          {categories.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-950">
              <Layers className="w-10 h-10 text-slate-600 mx-auto mb-2.5" />
              <h4 className="text-sm font-bold text-slate-400">No categories found</h4>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {categories.map((cat) => {
                const isSelected = selectedIds.includes(cat._id)
                return (
                  <div key={cat._id} className={`bg-slate-900/40 border p-6 rounded-2xl flex items-center justify-between transition-all duration-150 ${isSelected ? 'border-teal-500/50 bg-teal-950/5' : 'border-slate-800'}`}>
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds(prev => [...prev, cat._id])
                          } else {
                            setSelectedIds(prev => prev.filter(id => id !== cat._id))
                          }
                        }}
                        className="w-4 h-4 rounded border-slate-800 text-teal-500 cursor-pointer"
                      />
                      <div>
                        <h4 className="font-bold">{cat.title?.en || cat.title?.id || 'Untitled Category'}</h4>
                        <p className="text-xs text-slate-500 mt-1">{cat.description?.en || cat.description?.id}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleStartForm(cat)} className="p-2 bg-slate-855 rounded-lg text-slate-300 hover:text-white cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteTargetId(cat._id)} className="text-rose-500 hover:text-rose-400 cursor-pointer p-2 bg-rose-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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
