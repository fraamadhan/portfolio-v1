import React from 'react'
import { Plus, Trash2, Edit2, Upload, CheckCircle } from 'lucide-react'

interface ToolsSkillsTabProps {
  tools: any[]
  skills: any[]
  categories: any[]
  showForm: boolean
  setShowForm: (show: boolean) => void
  editingItem: any
  setEditingItem: (item: any) => void
  toolsSkillsSubtab: 'tools' | 'skills'
  setToolsSkillsSubtab: (tab: 'tools' | 'skills') => void
  uploading: string | null
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    options: { isUser?: boolean; fieldName: string; index?: number; subFieldName?: string }
  ) => Promise<void>
  handleSaveDocument: (docType: string) => Promise<void>
  setDeleteTargetId: (id: string) => void
}

export default function ToolsSkillsTab({
  tools,
  skills,
  categories,
  showForm,
  setShowForm,
  editingItem,
  setEditingItem,
  toolsSkillsSubtab,
  setToolsSkillsSubtab,
  uploading,
  handleFileUpload,
  handleSaveDocument,
  setDeleteTargetId
}: ToolsSkillsTabProps) {
  const [justUploaded, setJustUploaded] = React.useState(false)
  const prevUploading = React.useRef(uploading)

  React.useEffect(() => {
    if (prevUploading.current?.startsWith('icon') && !uploading && editingItem?.icon) {
      setJustUploaded(true)
      const timer = setTimeout(() => setJustUploaded(false), 3000)
      return () => clearTimeout(timer)
    }
    prevUploading.current = uploading
  }, [uploading, editingItem])

  React.useEffect(() => {
    if (showForm && toolsSkillsSubtab === 'tools' && editingItem && !editingItem._id && !editingItem.items) {
      setEditingItem({
        ...editingItem,
        items: [{ name: '', icon: null }]
      })
    }
    setJustUploaded(false)
  }, [showForm, editingItem?._id, toolsSkillsSubtab])

  return (
    <div className="space-y-8">
      {/* Sub-tab navigation */}
      <div className="flex gap-4 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            setToolsSkillsSubtab('tools')
            setShowForm(false)
            setEditingItem(null)
          }}
          className={`pb-2 text-sm font-bold border-b-2 cursor-pointer transition ${
            toolsSkillsSubtab === 'tools'
              ? 'border-teal-500 text-teal-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Tools / Tech Stack List
        </button>
        <button
          onClick={() => {
            setToolsSkillsSubtab('skills')
            setShowForm(false)
            setEditingItem(null)
          }}
          className={`pb-2 text-sm font-bold border-b-2 cursor-pointer transition ${
            toolsSkillsSubtab === 'skills'
              ? 'border-teal-500 text-teal-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Skill Groups
        </button>
      </div>

      {toolsSkillsSubtab === 'tools' ? (
        // Managing individual Tools
        showForm ? (
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold">{editingItem._id ? 'Edit Tool' : 'Add Tool / Tech Stack'}</h3>
            <div className="space-y-4">
              {editingItem.items && Array.isArray(editingItem.items) ? (
                <div className="space-y-4">
                  {editingItem.items.map((item: any, index: number) => {
                    const isIconUploading = uploading === `items-${index}-icon`
                    return (
                      <div key={index} className="flex flex-col md:flex-row gap-4 items-end bg-slate-950/40 p-4 rounded-xl border border-slate-800 relative">
                        {editingItem.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newItems = editingItem.items.filter((_: any, i: number) => i !== index)
                              setEditingItem({ ...editingItem, items: newItems })
                            }}
                            className="absolute top-2 right-2 text-rose-500 hover:text-rose-450 p-1 cursor-pointer transition"
                            title="Remove tool row"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        
                        <div className="space-y-1 flex-1 w-full">
                          <label className="text-xs text-slate-400">Tool Name #{index + 1}</label>
                          <input
                            type="text"
                            value={item.name || ''}
                            onChange={(e) => {
                              const newItems = [...editingItem.items]
                              newItems[index] = { ...newItems[index], name: e.target.value }
                              setEditingItem({ ...editingItem, items: newItems })
                            }}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-850 text-slate-200 focus:outline-none"
                            placeholder="e.g. React, Docker"
                          />
                        </div>

                        {/* File Upload for Tool Icon */}
                        <div className="space-y-1.5 w-full md:max-w-[280px]">
                          <label className="text-xs text-slate-400 block">Tool Icon</label>
                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-800 cursor-pointer text-xs font-semibold transition w-full justify-center">
                              <Upload className="w-3.5 h-3.5 text-teal-400" />
                              <span className="truncate">{isIconUploading ? 'Uploading...' : 'Choose Icon'}</span>
                              <input
                                type="file"
                                accept=".svg,.webp,.png,.jpg"
                                onChange={(e) => handleFileUpload(e, { fieldName: 'items', index, subFieldName: 'icon' })}
                                className="hidden"
                              />
                            </label>
                            {item.icon && (
                              <div className="flex items-center gap-2 shrink-0">
                                {item.icon.url && (
                                  <img
                                    src={item.icon.url}
                                    alt="icon preview"
                                    className="w-9 h-9 rounded bg-slate-950 p-1 object-contain border border-slate-800"
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem({
                        ...editingItem,
                        items: [...editingItem.items, { name: '', icon: null }]
                      })
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-slate-800 border-dashed text-teal-400 hover:text-teal-300 text-sm font-semibold cursor-pointer transition w-full justify-center"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Tool Row</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Tool Name (e.g. React, Docker)</label>
                    <input
                      type="text"
                      value={editingItem.name || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                    />
                  </div>

                  {/* File Upload for Tool Icon */}
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 block">Tool Icon (SVG/WebP)</label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-800 cursor-pointer text-sm transition">
                        <Upload className="w-4 h-4 text-teal-400" />
                        <span>{uploading?.startsWith('icon') ? 'Uploading...' : 'Choose Icon File'}</span>
                        <input
                          type="file"
                          accept=".svg,.webp,.png,.jpg"
                          onChange={(e) => handleFileUpload(e, { fieldName: 'icon' })}
                          className="hidden"
                        />
                      </label>
                      {editingItem.icon && (
                        <div className="flex items-center gap-2">
                          {justUploaded && (
                            <span className="text-xs text-teal-400 flex items-center gap-1 font-semibold animate-pulse">
                              <CheckCircle className="w-4 h-4" /> Icon Uploaded
                            </span>
                          )}
                          {editingItem.icon.url && (
                            <img
                              src={editingItem.icon.url}
                              alt="icon preview"
                              className="w-8 h-8 rounded bg-slate-950 p-1 object-contain border border-slate-800"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => handleSaveDocument('tool')}
                  className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 cursor-pointer transition"
                >
                  Save Tool{editingItem.items ? 's' : ''}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((t) => (
              <div
                key={t._id}
                className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {t.icon?.url ? (
                    <img
                      src={t.icon.url}
                      alt={t.name}
                      className="w-7 h-7 object-contain bg-slate-950 p-1 rounded border border-slate-800/80"
                    />
                  ) : (
                    <div className="w-7 h-7 bg-slate-950 rounded flex items-center justify-center border border-slate-850 text-[10px] text-slate-500 font-bold">
                      Icon
                    </div>
                  )}
                  <span className="text-sm font-semibold">{t.name}</span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      setEditingItem(t)
                      setShowForm(true)
                    }}
                    className="text-slate-400 hover:text-white p-1 cursor-pointer transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(t._id)}
                    className="text-rose-500 hover:text-rose-450 p-1 cursor-pointer transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        // Managing Skill Groups
        showForm ? (
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold">{editingItem._id ? 'Edit Skill Group' : 'Add Skill Group'}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Skill Title (EN)</label>
                  <input
                    type="text"
                    value={editingItem.title?.en || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        title: { ...editingItem.title, en: e.target.value, _type: 'localeString' }
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Skill Title (ID)</label>
                  <input
                    type="text"
                    value={editingItem.title?.id || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        title: { ...editingItem.title, id: e.target.value, _type: 'localeString' }
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Category Reference</label>
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
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.title?.en || c.title?.id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Short Description (EN)</label>
                  <input
                    type="text"
                    value={editingItem.description?.en || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        description: { ...editingItem.description, en: e.target.value, _type: 'localeString' }
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Short Description (ID)</label>
                  <input
                    type="text"
                    value={editingItem.description?.id || ''}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        description: { ...editingItem.description, id: e.target.value, _type: 'localeString' }
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Tools Checkboxes list */}
              <div className="space-y-2 pt-2">
                <label className="text-xs text-slate-400 block font-semibold">Select Tools for this Skill Group</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950 p-4 rounded-xl border border-slate-850 max-h-40 overflow-y-auto">
                  {tools.map((tool) => {
                    const isChecked = editingItem.tools?.some((t: any) => t._ref === tool._id)
                    return (
                      <label
                        key={tool._id}
                        className="flex items-center gap-2 text-xs text-slate-300 hover:text-white cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked ?? false}
                          onChange={(e) => {
                            const list = editingItem.tools || []
                            const updatedList = e.target.checked
                              ? [...list, { _type: 'reference', _ref: tool._id }]
                              : list.filter((t: any) => t._ref !== tool._id)
                            setEditingItem({ ...editingItem, tools: updatedList })
                          }}
                          className="w-3.5 h-3.5 rounded border-slate-800 text-teal-500"
                        />
                        <span>{tool.name}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => handleSaveDocument('skill')}
                  className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 cursor-pointer transition"
                >
                  Save Skill Group
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-880 hover:bg-slate-700 text-slate-300 cursor-pointer transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((s) => {
              const catObj = categories.find((c) => c._id === s.category?._ref)
              const assignedTools = (s.tools || [])
                .map((refObj: any) => tools.find((t) => t._id === refObj._ref))
                .filter(Boolean)
              return (
                <div
                  key={s._id}
                  className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-bold text-sm text-teal-400">{s.title?.en || s.title?.id}</h4>
                        {catObj && (
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-0.5">
                            Category: {catObj.title?.en || catObj.title?.id}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingItem(s)
                            setShowForm(true)
                          }}
                          className="p-2 bg-slate-850 rounded-lg text-slate-300 hover:text-white cursor-pointer transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(s._id)}
                          className="p-2 bg-rose-500/10 text-rose-500 rounded-lg cursor-pointer transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">{s.description?.en || s.description?.id}</p>
                  </div>
                  {assignedTools.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/60">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-2">
                        Tech Stack:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {assignedTools.map((tool: any) => (
                          <div
                            key={tool._id}
                            className="flex items-center gap-1 px-2 py-0.5 bg-slate-950/60 border border-slate-850 rounded-md text-[10px] text-slate-300"
                          >
                            {tool.icon?.url && (
                              <img src={tool.icon.url} alt={tool.name} className="w-3 h-3 object-contain" />
                            )}
                            <span>{tool.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      )}
    </div>
  )
}
