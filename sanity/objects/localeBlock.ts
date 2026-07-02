export default {
  name: 'localeBlock',
  type: 'object',
  title: 'Locale Block (Rich Text)',
  fields: [
    {
      name: 'id',
      type: 'array',
      title: 'Indonesian',
      of: [{ type: 'block' }, { type: 'image' }]
    },
    {
      name: 'en',
      type: 'array',
      title: 'English',
      of: [{ type: 'block' }, { type: 'image' }]
    }
  ],
  validation: (Rule: any) => Rule.custom((fields: any) => {
    const hasId = fields?.id && fields.id.length > 0
    const hasEn = fields?.en && fields.en.length > 0
    
    if (!hasId && !hasEn) {
      return 'At least one language must be filled (Indonesian or English)'
    }
    return true
  })
}
