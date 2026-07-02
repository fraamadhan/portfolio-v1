export default {
  name: 'collection',
  type: 'document',
  title: 'Collection (Hobbies / Entertainment)',
  groups: [
    { name: 'info', title: 'Basic Info' },
    { name: 'meta', title: 'Media Details' },
    { name: 'review', title: 'My Review' },
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
      name: 'type',
      type: 'string',
      title: 'Type',
      group: 'info',
      options: {
        list: [
          { title: 'Book', value: 'book' },
          { title: 'Manhwa', value: 'manhwa' },
          { title: 'Manga', value: 'manga' },
          { title: 'Movie', value: 'movie' },
          { title: 'Music', value: 'music' }
        ]
      }
    },
    // General / Shared Fields
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      group: 'info'
    },
    {
      name: 'releaseDate',
      type: 'date',
      title: 'Release Date',
      group: 'meta'
    },
    {
      name: 'review',
      type: 'localeBlock',
      title: 'User Review',
      group: 'review'
    },
    // Media Specific (Book, Manga, Manhwa, Movie)
    {
      name: 'cover',
      type: 'image',
      title: 'Cover Image',
      group: 'meta',
      hidden: ({parent}: any) => parent?.type === 'music'
    },
    {
      name: 'externalUrl',
      type: 'url',
      title: 'External Link (e.g., MyAnimeList, Spotify)',
      group: 'meta'
    },
    {
      name: 'authorOrDirector',
      type: 'string',
      title: 'Author / Director',
      group: 'meta',
      hidden: ({parent}: any) => parent?.type === 'music'
    },
    {
      name: 'isCompleted',
      type: 'boolean',
      title: 'Is Completed?',
      group: 'meta',
      hidden: ({parent}: any) => parent?.type === 'music'
    },
    {
      name: 'currentProgress',
      type: 'string',
      title: 'Current Progress (e.g., Chapter 42, 1h 30m)',
      group: 'meta',
      hidden: ({parent}: any) => parent?.type === 'music'
    },
    // Music Specific
    {
      name: 'album',
      type: 'string',
      title: 'Album',
      group: 'meta',
      hidden: ({parent}: any) => parent?.type !== 'music'
    },
    {
      name: 'artistOrBand',
      type: 'string',
      title: 'Artist / Band',
      group: 'meta',
      hidden: ({parent}: any) => parent?.type !== 'music'
    },
    {
      name: 'genre',
      type: 'string',
      title: 'Genre',
      group: 'meta',
      hidden: ({parent}: any) => parent?.type !== 'music'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type'
    }
  }
}
