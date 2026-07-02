import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {cloudinarySchemaPlugin} from 'sanity-plugin-cloudinary'
import {schemaTypes} from './sanity'

export default defineConfig({
  name: 'default',
  title: 'Portfolio CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  basePath: '/cms/admin', // Agar rute Studio sesuai dengan Next.js App Router

  plugins: [
    deskTool(), 
    visionTool(),
    cloudinarySchemaPlugin()
  ],

  schema: {
    types: schemaTypes,
  },
})
