const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT) || 3000;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

function send(res, status, content, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type });
  res.end(content);
}

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  let rel = decoded === '/' ? '/index.html' : decoded;
  const candidates = [
    path.join(root, rel),
    path.join(root, rel.endsWith('/') ? `${rel}index.html` : ''),
    path.join(root, rel + '.html')
  ].filter(Boolean);
  for (const filePath of candidates) {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) return filePath;
  }
  return null;
}

const server = http.createServer((req, res) => {
  if (!req.url) return send(res, 400, 'Bad request');
  const urlPath = req.url.split('?')[0];
  let filePath = resolveFile(urlPath);
  if (!filePath) {
    const fallback = path.join(root, '404.html');
    if (fs.existsSync(fallback)) {
      return send(res, 404, fs.readFileSync(fallback), 'text/html; charset=utf-8');
    }
    return send(res, 404, 'Not found');
  }

  const ext = path.extname(filePath).toLowerCase();
  const type = mimeTypes[ext] || 'application/octet-stream';
  try {
    const content = fs.readFileSync(filePath);
    send(res, 200, content, type);
  } catch (err) {
    send(res, 500, `Server error: ${err.message}`);
  }
});

server.listen(port, () => {
  console.log(`Local preview server running at http://localhost:${port}/`);
});
