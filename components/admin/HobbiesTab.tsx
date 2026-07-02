import React from 'react'
import { Plus, Trash2, Edit2, Save, Loader2, Upload, CheckCircle, Heart, ExternalLink } from 'lucide-react'
import RichTextEditor from './RichTextEditor'

interface HobbiesTabProps {
  collections: any[]
  showForm: boolean
  setShowForm: (show: boolean) => void
  editingItem: any
  setEditingItem: (item: any) => void
  uploading: string | null
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

export default function HobbiesTab({
  collections,
  showForm,
  setShowForm,
  editingItem,
  setEditingItem,
  uploading,
  handleFileUpload,
  handleSaveDocument,
  selectedIds,
  setSelectedIds,
  executeBulkDelete,
  handleStartForm,
  setDeleteTargetId,
  saving,
  setPreviewModalContent
}: HobbiesTabProps) {
  return (
    <div className="space-y-8">
      {showForm ? (
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold">{editingItem._id ? 'Edit Hobby Review' : 'Add Hobby Review'}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 col-span-1 sm:col-span-2">
                <label className="text-xs text-slate-400">Type</label>
                <select
                  value={editingItem.type || 'book'}
                  onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                >
                  <option value="book">Book</option>
                  <option value="manhwa">Manhwa</option>
                  <option value="manga">Manga</option>
                  <option value="music">Music</option>
                  <option value="movie">Movie</option>
                </select>
              </div>
              <div className="space-y-1 col-span-1 sm:col-span-2">
                <label className="text-xs text-slate-400">Title</label>
                <input
                  type="text"
                  value={editingItem.title || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>
              <div className="space-y-1 col-span-1 sm:col-span-2">
                <label className="text-xs text-slate-400">External URL Link (e.g. Spotify/MAL)</label>
                <input
                  type="url"
                  value={editingItem.externalUrl || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, externalUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>

              {/* Conditional inputs for Music */}
              {editingItem.type === 'music' ? (
                <>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Artist / Band</label>
                    <input
                      type="text"
                      value={editingItem.artistOrBand || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, artistOrBand: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Album</label>
                    <input
                      type="text"
                      value={editingItem.album || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, album: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1 col-span-1 sm:col-span-2">
                    <label className="text-xs text-slate-400">Genre</label>
                    <input
                      type="text"
                      value={editingItem.genre || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, genre: e.target.value })}
                      placeholder="J-Pop, Metal, Jazz"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                    />
                  </div>
                </>
              ) : (
                // Conditional inputs for Books/Movie/Manga/Manhwa
                <>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Author / Director</label>
                    <input
                      type="text"
                      value={editingItem.authorOrDirector || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, authorOrDirector: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Current Progress (e.g. Chapter 42, 1h 30m)</label>
                    <input
                      type="text"
                      value={editingItem.currentProgress || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, currentProgress: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-4 pl-2 col-span-1 sm:col-span-2">
                    <input
                      type="checkbox"
                      id="isCompleted"
                      checked={editingItem.isCompleted ?? false}
                      onChange={(e) => setEditingItem({ ...editingItem, isCompleted: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-800 text-teal-500 cursor-pointer"
                    />
                    <label htmlFor="isCompleted" className="text-xs text-slate-300 cursor-pointer">
                      Finished Reading / Watching (Completed)
                    </label>
                  </div>

                  {/* Cover Image Upload */}
                  <div className="space-y-2 col-span-1 sm:col-span-2">
                    <label className="text-xs text-slate-400 block">Cover Image</label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-850 cursor-pointer text-sm transition">
                        <Upload className="w-4 h-4 text-teal-400" />
                        <span>{uploading === 'cover' ? 'Uploading...' : 'Choose Cover File'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, { fieldName: 'cover' })}
                          className="hidden"
                        />
                      </label>
                      {editingItem.cover && (
                        <span className="text-xs text-teal-400 flex items-center gap-1 font-semibold">
                          <CheckCircle className="w-4 h-4" /> Cover Uploaded
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Review text editor */}
              <div className="space-y-2 col-span-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-400 font-bold block mb-1">
                  My Review (Rich Text Editor)
                </label>
                <RichTextEditor
                  value={editingItem.review?.en || ''}
                  onChange={(val) =>
                    setEditingItem({
                      ...editingItem,
                      review: { en: val, _type: 'localeBlock' }
                    })
                  }
                  activeTab="hobbies"
                  editingItem={editingItem}
                  placeholder="Tulis ulasan, opini, rating, atau catatan tentang musik/buku/film ini..."
                  rows={5}
                  setPreviewModalContent={setPreviewModalContent}
                />
              </div>
            </div>
             <div className="flex gap-4 pt-4 border-t border-slate-850">
               <button
                 onClick={() => handleSaveDocument('collection')}
                 disabled={saving}
                 className="px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 disabled:bg-teal-500/50 cursor-pointer transition flex items-center gap-1.5"
               >
                 {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                 Save Item
               </button>
               <button
                 onClick={() => setShowForm(false)}
                 disabled={saving}
                 className="px-5 py-2.5 rounded-xl bg-slate-855 hover:bg-slate-750 text-slate-200 cursor-pointer transition disabled:opacity-50"
               >
                 Cancel
               </button>
             </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Bulk Delete Controls */}
          {collections.length > 0 && (
            <div className="flex items-center justify-between bg-slate-900/40 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.length === collections.length && collections.length > 0}
                  onChange={(e) => setSelectedIds(e.target.checked ? collections.map((x) => x._id) : [])}
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

          {collections.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-950">
              <Heart className="w-10 h-10 text-slate-600 mx-auto mb-2.5" />
              <h4 className="text-sm font-bold text-slate-400">No hobby reviews found</h4>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collections.map((item) => {
                const isSelected = selectedIds.includes(item._id)
                return (
                  <div
                    key={item._id}
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
                            e.target.checked ? [...selectedIds, item._id] : selectedIds.filter((id) => id !== item._id)
                          )
                        }
                        className="w-4 h-4 rounded border-slate-800 text-teal-500 cursor-pointer"
                      />
                      {item.cover?.url && (
                        <img
                          src={item.cover.url}
                          alt="cover thumbnail"
                          className="w-10 h-10 object-cover bg-slate-950 rounded border border-slate-800 hidden sm:block"
                        />
                      )}
                      <div>
                        <h4 className="font-bold text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5 uppercase font-bold tracking-wider">
                          {item.type}
                        </p>
                        <div className="flex gap-2 items-center mt-1.5">
                          {item.artistOrBand && (
                            <span className="text-[10px] text-slate-500">Artist: {item.artistOrBand}</span>
                          )}
                          {item.authorOrDirector && (
                            <span className="text-[10px] text-slate-500">Author: {item.authorOrDirector}</span>
                          )}
                          {item.externalUrl && (
                            <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
                              <ExternalLink className="w-3 h-3 text-teal-500/80" /> Has Link
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartForm(item)}
                        className="p-2 bg-slate-855 rounded-lg text-slate-300 hover:text-white cursor-pointer transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(item._id)}
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
