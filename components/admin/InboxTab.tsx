import React from 'react'

interface InboxTabProps {
  inbox: any[]
}

export default function InboxTab({ inbox }: InboxTabProps) {
  return (
    <div className="space-y-4">
      {inbox.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl bg-slate-950/20 text-slate-500">
          <p className="text-sm">Your inbox is currently empty.</p>
        </div>
      ) : (
        inbox.map((msg) => (
          <div
            key={msg._id}
            className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-3"
          >
            <h4 className="font-bold text-sm">
              {msg.senderName} - <span className="text-teal-400 font-medium">{msg.senderEmail}</span>
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">{msg.message}</p>
          </div>
        ))
      )}
    </div>
  )
}
