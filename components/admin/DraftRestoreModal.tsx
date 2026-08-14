import React from 'react'
import { Sparkles } from 'lucide-react'

interface DraftRestoreModalProps {
  pendingDraft: any
  setPendingDraft: (draft: any) => void
  setEditingItem: (item: any) => void
  setShowForm: (show: boolean) => void
  clearDraft: (id?: string) => void
}

export default function DraftRestoreModal({
  pendingDraft,
  setPendingDraft,
  setEditingItem,
  setShowForm,
  clearDraft
}: DraftRestoreModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-fade-in">
        <div className="flex items-center gap-3 text-teal-400">
          <Sparkles className="w-6 h-6 animate-pulse" />
          <h3 className="text-lg font-bold">Unsaved Draft Found</h3>
        </div>
        <p className="text-sm text-slate-400 text-left">
          You have a draft that was saved locally before. Would you like to restore this draft or discard it and start fresh?
        </p>
        <div className="flex gap-3 justify-end pt-2">
          <button
            onClick={() => {
              clearDraft(pendingDraft._id)
              setEditingItem(pendingDraft._id ? { _id: pendingDraft._id, isDraft: false } : { isDraft: false })
              setPendingDraft(null)
              setShowForm(true)
            }}
            className="px-4 py-2 text-sm font-semibold text-rose-500 hover:bg-rose-500/5 rounded-xl border border-rose-500/10 transition cursor-pointer"
          >
            Discard & Fresh
          </button>
          <button
            onClick={() => {
              setEditingItem(pendingDraft)
              setPendingDraft(null)
              setShowForm(true)
            }}
            className="px-4 py-2 text-sm font-semibold text-slate-950 rounded-xl bg-teal-500 hover:bg-teal-400 transition cursor-pointer"
          >
            Restore Draft
          </button>
        </div>
      </div>
    </div>
  )
}
