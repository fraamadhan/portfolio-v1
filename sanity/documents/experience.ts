export default {
  name: 'experience',
  type: 'document',
  title: 'Experience Journey',
  groups: [
    { name: 'info', title: 'Work Info' },
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
      name: 'role',
      type: 'localeString',
      title: 'Role',
      group: 'info'
    },
    {
      name: 'company',
      type: 'string',
      title: 'Company Name',
      group: 'info'
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location (City & Nation)',
      group: 'info'
    },
    {
      name: 'dateFrom',
      type: 'date',
      title: 'From Date',
      group: 'info'
    },
    {
      name: 'dateTo',
      type: 'date',
      title: 'To Date',
      group: 'info'
    },
    {
      name: 'isCurrent',
      type: 'boolean',
      title: 'Is Current Role (Active)?',
      group: 'info',
      initialValue: false
    },
    {
      name: 'programType',
      type: 'string',
      title: 'Program Type',
      group: 'info',
      options: {
        list: ['Full-time', 'Part-time', 'Internship', 'Freelance', 'Contract']
      }
    },
    {
      name: 'keypoints',
      type: 'array',
      title: 'Key Points',
      group: 'story',
      of: [{ type: 'localeString' }]
    },
    {
      name: 'toolsUsed',
      type: 'array',
      title: 'Tools Used',
      group: 'story',
      of: [{ type: 'reference', to: [{ type: 'tool' }] }]
    },
    {
      name: 'detailStory',
      type: 'localeBlock',
      title: 'Detail Story',
      group: 'story'
    }
  ]
}
