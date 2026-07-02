export default {
  name: 'certification',
  type: 'document',
  title: 'Certification',
  fields: [
    {
      name: 'user',
      type: 'reference',
      to: [{ type: 'user' }],
      title: 'Owner (User)'
    },
    {
      name: 'title',
      type: 'localeString',
      title: 'Title'
    },
    {
      name: 'issuer',
      type: 'string',
      title: 'Issuer / Penyelenggara'
    },
    {
      name: 'issuedDate',
      type: 'date',
      title: 'Issued Date'
    },
    {
      name: 'expiredDate',
      type: 'date',
      title: 'Expired Date'
    },
    {
      name: 'credentialUrl',
      type: 'url',
      title: 'Credential URL'
    },
    {
      name: 'icon',
      type: 'image',
      title: 'Icon (Optional)'
    }
  ],
  preview: {
    select: {
      titleEn: 'title.en',
      titleId: 'title.id',
      issuer: 'issuer'
    },
    prepare(selection: any) {
      const { titleEn, titleId, issuer } = selection
      return {
        title: titleId || titleEn || 'Untitled Certification',
        subtitle: issuer || 'No Issuer'
      }
    }
  }
}
