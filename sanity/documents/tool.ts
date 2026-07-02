export default {
  name: 'tool',
  type: 'document',
  title: 'Tool / Tech Stack',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Tool Name',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'icon',
      type: 'image',
      title: 'Icon (Upload SVG or WebP)'
    },
    {
      name: 'user',
      type: 'reference',
      to: [{ type: 'user' }],
      title: 'Owner (User)'
    }
  ]
}
