export default {
  name: 'user',
  type: 'document',
  title: 'User Profile',
  groups: [
    { name: 'profile', title: 'Main Profile' },
    { name: 'slogans', title: 'Slogans' },
    { name: 'descriptions', title: 'Descriptions' },
    { name: 'socials', title: 'Social & Media' }
  ],
  fields: [
    {
      name: 'slug',
      type: 'slug',
      title: 'User Slug (e.g., username)',
      group: 'profile',
      options: {
        source: 'name',
      }
    },
    {
      name: 'name',
      type: 'string',
      title: 'Full Name',
      group: 'profile'
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email Address',
      group: 'profile',
      readOnly: true // Email otomatis diset dari login provider
    },
    {
      name: 'landingSlogan',
      type: 'localeString',
      title: 'Landing Page Slogan',
      group: 'slogans'
    },
    {
      name: 'skillsSlogan',
      type: 'localeString',
      title: 'Skills Section Slogan',
      group: 'slogans'
    },
    {
      name: 'experienceSlogan',
      type: 'localeString',
      title: 'Experience Section Slogan',
      group: 'slogans'
    },
    {
      name: 'projectsSlogan',
      type: 'localeString',
      title: 'Projects Section Slogan',
      group: 'slogans'
    },
    {
      name: 'shortDescription',
      type: 'localeString',
      title: 'Short Description',
      group: 'descriptions'
    },
    {
      name: 'fullDescription',
      type: 'localeBlock',
      title: 'Full Description (About Page)',
      group: 'descriptions'
    },
    {
      name: 'professionalStatus',
      type: 'object',
      title: 'Professional Status',
      group: 'profile',
      fields: [
        { name: 'role', type: 'string', title: 'Current Role' },
        { name: 'location', type: 'string', title: 'Location' },
        { name: 'status', type: 'string', title: 'Status (e.g. Open to work)' },
        { name: 'isActive', type: 'boolean', title: 'Is Active' }
      ]
    },
    {
      name: 'resume',
      type: 'file',
      title: 'Resume/CV File',
      group: 'profile',
      options: {
        accept: '.pdf,.doc,.docx'
      }
    },
    {
      name: 'pastRoles',
      type: 'array',
      title: 'Past Roles',
      group: 'profile',
      of: [{ type: 'string' }]
    },
    {
      name: 'socialMedias',
      type: 'array',
      title: 'Social Medias',
      group: 'socials',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              options: {
                list: [
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Email', value: 'email' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Other (Custom)', value: 'custom' }
                ]
              }
            },
            { name: 'url', type: 'string', title: 'URL or Username' },
            { 
              name: 'customIcon', 
              type: 'image', 
              title: 'Custom Icon',
              hidden: ({parent}: any) => parent?.platform !== 'custom'
            }
          ]
        }
      ]
    },
    {
      name: 'collaborationTitle',
      type: 'localeString',
      title: 'Collaboration Call To Action Title',
      group: 'descriptions'
    },
    {
      name: 'collaborationDescription',
      type: 'localeString',
      title: 'Collaboration Description',
      group: 'descriptions'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current'
    }
  }
}
