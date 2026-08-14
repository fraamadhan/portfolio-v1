// Helper: split newline text to array of localeString objects
export const textToLocaleArray = (txt: string) =>
  txt ? txt.split('\n').filter(t => t.trim() !== '').map(val => ({ _type: 'localeString', id: val, en: val })) : []

// Helper: localeString array to newline text
export const localeArrayToText = (arr: any[]) =>
  arr ? arr.map(item => item.en || item.id || '').join('\n') : ''

// Helper: split newline text to array of strings
export const textToArray = (txt: string) => txt ? txt.split('\n').filter(t => t.trim() !== '') : []
export const arrayToText = (arr: any[]) => arr ? arr.join('\n') : ''

// Bi-directional Markdown to Sanity Portable Text Block Converter
export const markdownToBlocks = (markdown: string) => {
  if (!markdown) return []

  const lines = markdown.split('\n')
  const blocks: any[] = []

  lines.forEach((line, index) => {
    const trimmed = line.trim()
    if (trimmed === '') return

    // Check for Heading 1-3
    const hMatch = trimmed.match(/^(#{1,3})\s+(.*)$/)
    if (hMatch) {
      const level = hMatch[1].length
      const text = hMatch[2]
      blocks.push({
        _key: `block-${index}-${Date.now()}`,
        _type: 'block',
        style: `h${level}`,
        children: [{ _key: `span-${index}-${Date.now()}`, _type: 'span', text }]
      })
      return
    }

    // Check for Image
    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/)
    if (imgMatch) {
      const url = imgMatch[2]
      if (url.includes('cdn.sanity.io/images')) {
        const parts = url.split('/')
        const filename = parts[parts.length - 1]
        const dotIndex = filename.lastIndexOf('.')
        if (dotIndex !== -1) {
          const nameWithoutExt = filename.substring(0, dotIndex)
          const ext = filename.substring(dotIndex + 1)
          const assetRefId = `image-${nameWithoutExt}-${ext}`
          blocks.push({
            _key: `image-${index}-${Date.now()}`,
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetRefId
            }
          })
          return
        }
      }
    }

    // Default Paragraph Block
    blocks.push({
      _key: `block-${index}-${Date.now()}`,
      _type: 'block',
      style: 'normal',
      children: [{ _key: `span-${index}-${Date.now()}`, _type: 'span', text: line }]
    })
  })

  return blocks
}

// Bi-directional Sanity Portable Text Block to Markdown Converter
export const blocksToMarkdown = (blocks: any[]) => {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks.map(block => {
    if (block._type === 'block') {
      const text = block.children?.map((c: any) => c.text).join('') || ''
      if (block.style === 'h1') return `# ${text}`
      if (block.style === 'h2') return `## ${text}`
      if (block.style === 'h3') return `### ${text}`
      return text
    }
    if (block._type === 'image' && block.asset?._ref) {
      const ref = block.asset._ref
      const match = ref.match(/^image-(.*?)-(.*?)-(.*?)$/)
      if (match) {
        const [_, id, dimensions, ext] = match
        const projectId = 'tspoltvg'
        const dataset = 'development'
        const url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${ext}`
        return `![Image Description](${url})`
      }
    }
    return ''
  }).filter(t => t !== '').join('\n\n')
}

// Lightweight Markdown to HTML Preview Renderer
export const renderMarkdown = (md: string) => {
  if (!md) return ''
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.*$)/gim, '<h3 class="text-md font-bold my-2 text-teal-400">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold my-3 text-teal-300">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold my-4 text-teal-200 border-b border-slate-800 pb-1">$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" class="my-4 rounded-xl max-h-60 object-cover border border-slate-800" />')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" class="text-teal-400 underline hover:text-teal-300 inline-flex items-center gap-1">$1</a>')
    .replace(/\n/g, '<br />')
  return html
}

// Client-side image compression helper using Canvas
export const compressImage = (file: File): Promise<Blob | File> => {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve(file)
      return
    }
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        
        const MAX_WIDTH = 1280
        const MAX_HEIGHT = 720
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }
        
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height)
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }))
            } else {
              resolve(file)
            }
          }, 'image/jpeg', 0.82)
        } else {
          resolve(file)
        }
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  })
}

export const getFileUrl = (resumeObj: any) => {
  if (!resumeObj) return ''
  if (resumeObj.url) return resumeObj.url
  if (resumeObj.asset?._ref) {
    const ref = resumeObj.asset._ref
    const match = ref.match(/^file-(.*?)-(.*?)$/)
    if (match) {
      const [_, id, ext] = match
      const projectId = 'tspoltvg'
      const dataset = 'development'
      return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`
    }
    const imgMatch = ref.match(/^image-(.*?)-(.*?)-(.*?)$/)
    if (imgMatch) {
      const [_, id, dimensions, ext] = imgMatch
      const projectId = 'tspoltvg'
      const dataset = 'development'
      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${ext}`
    }
  }
  return ''
}
