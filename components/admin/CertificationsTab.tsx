import React from 'react'
import { Plus, Trash2, Edit2, Save, Loader2, Upload, CheckCircle, Award, Calendar } from 'lucide-react'

interface CertificationsTabProps {
  certifications: any[]
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
}

export default function CertificationsTab({
  certifications,
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
  saving
}: CertificationsTabProps) {
  return (
    <div className="space-y-8">
      {showForm ? (
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold">{editingItem._id ? 'Edit Certification' : 'Add Certification'}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Certification Name Bilingual */}
              <div className="space-y-1 col-span-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-400">Certification Name (EN)</label>
                <input
                  type="text"
                  value={editingItem.title?.en || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      title: { ...editingItem.title, en: e.target.value, _type: 'localeString' }
                    })
                  }
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1 col-span-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-400">Certification Name (ID - Optional)</label>
                <input
                  type="text"
                  value={editingItem.title?.id || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      title: { ...editingItem.title, id: e.target.value, _type: 'localeString' }
                    })
                  }
                  placeholder="Contoh: Arsitek Solusi Tersertifikasi AWS"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Issuer / Penyelenggara</label>
                <input
                  type="text"
                  value={editingItem.issuer || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, issuer: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Credential URL</label>
                <input
                  type="url"
                  value={editingItem.credentialUrl || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, credentialUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Issued Date</label>
                <input
                  type="date"
                  value={editingItem.issuedDate || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, issuedDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 [color-scheme:dark] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Expired Date</label>
                <input
                  type="date"
                  value={editingItem.expiredDate || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, expiredDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 [color-scheme:dark] outline-none"
                />
              </div>
            </div>

            {/* File Upload for Certification Icon */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 block">Certification Badge/Icon</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-850 cursor-pointer text-sm transition">
                  <Upload className="w-4 h-4 text-teal-400" />
                  <span>{uploading === 'icon' ? 'Uploading...' : 'Choose Badge Image'}</span>
                  <input
                    type="file"
                    accept=".svg,.webp,.png,.jpg"
                    onChange={(e) => handleFileUpload(e, { fieldName: 'icon' })}
                    className="hidden"
                  />
                </label>
                {editingItem.icon && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-teal-400 flex items-center gap-1 font-semibold">
                      <CheckCircle className="w-4 h-4" /> Badge Uploaded
                    </span>
                    {editingItem.icon.url && (
                      <img
                        src={editingItem.icon.url}
                        alt="badge preview"
                        className="w-8 h-8 rounded bg-slate-950 p-1 object-contain border border-slate-800"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-850">
              <button
                onClick={() => handleSaveDocument('certification')}
                disabled={saving}
                className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 disabled:bg-teal-500/50 cursor-pointer transition flex items-center gap-1.5"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Certificate
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
        </div>
      ) : (
        <div className="space-y-4">
          {/* Bulk Delete Controls */}
          {certifications.length > 0 && (
            <div className="flex items-center justify-between bg-slate-900/40 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.length === certifications.length && certifications.length > 0}
                  onChange={(e) => setSelectedIds(e.target.checked ? certifications.map((x) => x._id) : [])}
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

          {certifications.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-950">
              <Award className="w-10 h-10 text-slate-600 mx-auto mb-2.5" />
              <h4 className="text-sm font-bold text-slate-400">No certifications found</h4>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert) => {
                const isSelected = selectedIds.includes(cert._id)
                return (
                  <div
                    key={cert._id}
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
                            e.target.checked ? [...selectedIds, cert._id] : selectedIds.filter((id) => id !== cert._id)
                          )
                        }
                        className="w-4 h-4 rounded border-slate-800 text-teal-500 cursor-pointer"
                      />
                      {cert.icon?.url && (
                        <img
                          src={cert.icon.url}
                          alt="Badge thumbnail"
                          className="w-10 h-10 object-contain bg-slate-950 p-1 rounded border border-slate-800 hidden sm:block"
                        />
                      )}
                      <div>
                        <h4 className="font-bold text-sm">{cert.title?.en || cert.title?.id || 'Untitled Certificate'}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{cert.issuer}</p>
                        {cert.issuedDate && (
                          <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3 text-teal-500/80" />
                            <span>
                              {cert.issuedDate} s/d {cert.expiredDate || 'No Expire'}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartForm(cert)}
                        className="p-2 bg-slate-855 rounded-lg text-slate-300 hover:text-white cursor-pointer transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTargetId(cert._id)}
                        className="text-rose-500 hover:text-rose-450 cursor-pointer p-2 bg-rose-500/10 rounded-lg transition"
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
