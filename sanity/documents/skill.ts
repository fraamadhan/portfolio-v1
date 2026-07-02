export default {
  name: 'skill',
  type: 'document',
  title: 'Skill',
  fields: [
    {
      name: 'user',
      type: 'reference',
      to: [{ type: 'user' }],
      title: 'Owner (User)'
    },
    {
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      title: 'Category'
    },
    {
      name: 'title',
      type: 'localeString',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'localeString',
      title: 'Description'
    },
    {
      name: 'tools',
      type: 'array',
      title: 'Tools',
      of: [{ type: 'reference', to: [{ type: 'tool' }] }]
    }
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      titleId: 'title.id',
      descEn: 'description.en',
      descId: 'description.id'
    },
    prepare(selection: any) {
      const { titleEn, titleId, descEn, descId } = selection
      return {
        title: titleId || titleEn || 'Untitled Skill',
        subtitle: descId || descEn || 'No description'
      }
    }
  }
}
