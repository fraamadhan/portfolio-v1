export default {
  name: 'testimonial',
  type: 'document',
  title: 'Testimonial',
  fields: [
    {
      name: 'user',
      type: 'reference',
      to: [{ type: 'user' }],
      title: 'For User'
    },
    {
      name: 'giverName',
      type: 'string',
      title: 'Giver Name'
    },
    {
      name: 'giverRole',
      type: 'string',
      title: 'Giver Role / Context'
    },
    {
      name: 'giverInstitution',
      type: 'string',
      title: 'Giver Institution'
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }]
    },
    {
      name: 'content',
      type: 'localeString',
      title: 'Testimonial Content'
    }
  ],
  preview: {
    select: {
      title: 'giverName',
      role: 'giverRole',
      institution: 'giverInstitution'
    },
    prepare(selection: any) {
      const { title, role, institution } = selection
      const subtitle = [role, institution].filter(Boolean).join(' at ')
      return {
        title: title || 'Anonymous',
        subtitle: subtitle || 'No details provided'
      }
    }
  }
}
