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
    const user = await client.fetch(`*[_type == "user" && !(_id in path('drafts.**'))][0]{ _id, name, email }`);
    console.log("PUBLISHED USER WITH PATH FILTER:", JSON.stringify(user, null, 2));
  } catch (err) {
    console.error("ERROR FETCHING:", err);
  }
}

test();
