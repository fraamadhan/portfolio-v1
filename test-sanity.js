const https = require('https')

const options = {
  hostname: 'tspoltvg.apicdn.sanity.io',
  port: 443,
  path: '/v2023-05-03/data/query/development?query=1',
  method: 'GET',
  timeout: 10000
}

const req = https.request(options, (res) => {
  let data = ''
  res.on('data', (chunk) => { data += chunk })
  res.on('end', () => {
    console.log('STATUS:', res.statusCode)
    console.log('BODY:', data.slice(0, 200))
    process.exit(0)
  })
})

req.on('error', (e) => {
  console.error('ERR:', e.code, e.message)
  process.exit(1)
})

req.on('timeout', () => {
  console.error('TIMEOUT')
  req.destroy()
  process.exit(1)
})

req.end()
console.log('Connecting to Sanity CDN...')
