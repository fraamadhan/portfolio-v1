import React, { useRef, useState } from 'react'
import { Bold, Italic, Heading1, Heading2, Link2, Image as ImageIcon, Loader2 } from 'lucide-react'
import { compressImage } from './utils'

interface RichTextEditorProps {
  value: string
  onChange: (val: string) => void
  activeTab: string
  editingItem: any
  placeholder?: string
  rows?: number
  setPreviewModalContent: (val: string) => void
}

export default function RichTextEditor({
  value,
  onChange,
  activeTab,
  editingItem,
  placeholder = 'Write content here...',
  rows = 8,
  setPreviewModalContent
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [uploading, setUploading] = useState(false)

  const insertTextAtCursor = (beforeText: string, afterText = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const currentText = textarea.value
    const selected = currentText.substring(start, end)
    const replacement = beforeText + (selected || 'text') + afterText
    const newValue = currentText.substring(0, start) + replacement + currentText.substring(end)

    onChange(newValue)

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + beforeText.length,
        start + beforeText.length + (selected || 'text').length
      )
    }, 50)
  }

  const handleImageInsertUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0]
    if (!rawFile) return

    setUploading(true)
    try {
      const file = await compressImage(rawFile)
      const prefix = activeTab + '-inline'
      const itemName = (
        editingItem?.name ||
        editingItem?.title?.en ||
        editingItem?.title?.id ||
        'editor-image'
      )
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')

      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(`/api/admin?action=upload-asset&prefix=${prefix}&name=${itemName}`, {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        const data = await res.json()
        insertTextAtCursor(`![Image Description](${data.asset.url})`, '')
      } else {
        alert('Failed to upload image.')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-0">
      {/* Editor Toolbar */}
      <div className="flex items-center gap-1.5 p-2 bg-slate-900 border-t border-x border-slate-800 rounded-t-xl">
        <button
          type="button"
          onClick={() => insertTextAtCursor('**', '**')}
          className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => insertTextAtCursor('*', '*')}
          className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => insertTextAtCursor('# ', '')}
          className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => insertTextAtCursor('## ', '')}
          className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => insertTextAtCursor('[', '](url)')}
          className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
          title="Insert Link"
        >
          <Link2 className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-800 mx-1" />

        <label
          className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer inline-flex items-center"
          title="Upload Image inside story"
        >
          <ImageIcon className="w-4 h-4" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageInsertUpload}
          />
        </label>

        {uploading && <Loader2 className="w-4 h-4 animate-spin text-teal-400 ml-2" />}

        <div className="flex-1 flex justify-end">
          <button
            type="button"
            onClick={() => setPreviewModalContent(value)}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 hover:bg-teal-500/35 transition cursor-pointer"
          >
            Preview
          </button>
        </div>
      </div>

      {/* Editor Textarea */}
      <textarea
        ref={textareaRef}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-b-xl bg-slate-950 border-x border-b border-slate-800 text-slate-200 text-sm focus:border-teal-500 focus:outline-none"
      />
    </div>
  )
}
