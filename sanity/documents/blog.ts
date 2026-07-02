export default {
  name: 'blog',
  type: 'document',
  title: 'Blog Post',
  groups: [
    { name: 'info', title: 'Blog Info' },
    { name: 'content', title: 'Content & Media' },
    { name: 'seo', title: 'SEO Settings' },
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
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      group: 'info',
      options: {
        source: (doc: any) => {
          // Fallback sequence: title.en -> title.id -> default random string
          if (doc?.title?.en) return doc.title.en;
          if (doc?.title?.id) return doc.title.id;
          return `post-${Date.now()}`;
        },
        maxLength: 96,
      }
    },
    {
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      group: 'content',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      group: 'content',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'excerpt',
      type: 'localeString',
      title: 'Excerpt / Summary',
      group: 'info'
    },
    {
      name: 'content',
      type: 'localeBlock',
      title: 'Content',
      group: 'content'
    },
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      group: 'info',
      initialValue: 'draft',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' }
        ],
        layout: 'radio'
      }
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      group: 'info',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'seoMetaTitle',
      type: 'string',
      title: 'SEO Meta Title',
      group: 'seo'
    },
    {
      name: 'seoMetaDescription',
      type: 'text',
      title: 'SEO Meta Description',
      group: 'seo'
    }
  ],
  preview: {
    select: {
      title: 'title.en',
      titleId: 'title.id',
      media: 'coverImage',
      status: 'status'
    },
    prepare(selection: any) {
      const { title, titleId, media, status } = selection;
      return {
        title: title || titleId || 'Untitled Post',
        subtitle: `Status: ${status ? status.toUpperCase() : 'DRAFT'}`,
        media
      }
    }
  }
}
