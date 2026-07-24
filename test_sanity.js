const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tspoltvg';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'development';
const token = process.env.SANITY_WRITE_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  useCdn: false,
  token
});

async function test() {
  try {
    const experiences = await client.fetch(`*[_type == "experience" && !(_id in path('drafts.**'))]{ _id, role, company, keypoints }`);
    console.log("EXPERIENCES:", JSON.stringify(experiences, null, 2));
  } catch (err) {
    console.error("ERROR FETCHING:", err);
  }
}

test();
