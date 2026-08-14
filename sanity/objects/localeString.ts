export default {
  name: 'localeString',
  type: 'object',
  title: 'Locale String',
  fields: [
    {
      name: 'id',
      type: 'string',
      title: 'Indonesian',
    },
    {
      name: 'en',
      type: 'string',
      title: 'English',
    }
  ],
  validation: (Rule: any) => Rule.custom((fields: any) => {
    if (!fields?.id && !fields?.en) {
      return 'At least one language must be filled (Indonesian or English)'
    }
    return true
  })
}
