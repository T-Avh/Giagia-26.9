import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  if (!isProd) {
    // Development Mode with Vite Middleware
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    // Điều hướng mọi request không phải asset về index.html (SPA Fallback)
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Production Mode: Phục vụ static build từ thư mục dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));

    // Điều hướng mọi request về dist/index.html (SPA Fallback)
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server đang chạy trên cổng ${PORT} (http://0.0.0.0:${PORT}) - SPA Fallback đã kích hoạt.`);
  });
}

startServer().catch((err) => {
  console.error('Lỗi khởi động máy chủ:', err);
  process.exit(1);
});
