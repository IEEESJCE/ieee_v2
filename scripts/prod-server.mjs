import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.resolve(__dirname, '../dist')

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
}

export function createProdServer(port = 4174) {
  const server = http.createServer((req, res) => {
    console.log(`[PROD-SERVER] ${req.method} ${req.url}`)
    const rawPath = decodeURIComponent(req.url.split('?')[0])
    let target = path.join(DIST_DIR, rawPath === '/' ? '/index.html' : rawPath)

    if (fs.existsSync(target) && fs.statSync(target).isFile()) {
      const stat = fs.statSync(target)
      const ext = path.extname(target).toLowerCase()
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Content-Length': stat.size,
      })
      fs.createReadStream(target).pipe(res)
      return
    }

    const cleanHtml = target + '.html'
    if (fs.existsSync(cleanHtml) && fs.statSync(cleanHtml).isFile()) {
      const stat = fs.statSync(cleanHtml)
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': stat.size,
      })
      fs.createReadStream(cleanHtml).pipe(res)
      return
    }

    const notFoundHtml = path.join(DIST_DIR, '404.html')
    if (fs.existsSync(notFoundHtml)) {
      const stat = fs.statSync(notFoundHtml)
      res.writeHead(404, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': stat.size,
      })
      fs.createReadStream(notFoundHtml).pipe(res)
      return
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('404 Not Found')
  })

  return new Promise((resolve) => {
    server.listen(port, '0.0.0.0', () => {
      resolve(server)
    })
  })
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT) || 4174
  createProdServer(port).then(() => {
    console.log(`Production static server running at http://localhost:${port}`)
  })
}
