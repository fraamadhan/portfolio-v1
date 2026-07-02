export default {
  name: 'category',
  type: 'document',
  title: 'Category (App / Skill)',
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title'
    },
    {
      name: 'user',
      type: 'reference',
      to: [{ type: 'user' }],
      title: 'Owner (User)'
    }
  ]
}
