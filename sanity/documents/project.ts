export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  groups: [
    { name: 'info', title: 'Project Info' },
    { name: 'assets', title: 'Assets & Tech' },
    { name: 'story', title: 'Detailed Story' },
    { name: 'system', title: 'System / Owner' }
  ],
  fields: [
    {
      name: 'user',
      type: 'reference',
      to: [{ type: 'user' }],
      title: 'Owner (User)',
      group: 'system'
    },
    {
      name: 'title',
      type: 'localeString',
      title: 'Title',
      group: 'info'
    },
    {
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      title: 'Category App',
      group: 'info'
    },
    {
      name: 'description',
      type: 'localeString',
      title: 'Description',
      group: 'info'
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      group: 'assets',
      of: [{ type: 'image' }]
    },
    {
      name: 'roleInProject',
      type: 'localeString',
      title: 'Role in Project',
      group: 'info'
    },
    {
      name: 'keyHighlights',
      type: 'array',
      title: 'Key Highlights',
      group: 'assets',
      of: [{ type: 'localeString' }]
    },
    {
      name: 'toolsUsed',
      type: 'array',
      title: 'Tech Stack / Tools Used',
      group: 'assets',
      of: [{ type: 'reference', to: [{ type: 'tool' }] }]
    },
    {
      name: 'links',
      type: 'array',
      title: 'Important Links',
      group: 'assets',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label (e.g., Backend Repo)' },
            { name: 'url', type: 'url', title: 'URL' },
            { name: 'icon', type: 'image', title: 'Icon (Optional)' }
          ]
        }
      ]
    },
    {
      name: 'detailStory',
      type: 'localeBlock',
      title: 'Detail Story',
      group: 'story'
    }
  ]
}
