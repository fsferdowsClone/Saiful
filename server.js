/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from './src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware for parsing request bodies
  app.use(express.json());

  // API Routes
  app.get('/api/products', (req, res) => {
    // Simulate a slight database delay
    setTimeout(() => {
      res.json(products);
    }, 300);
  });

  app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', server: 'SaifCart Express Core' });
  });

  app.post('/api/checkout', (req, res) => {
    const { items, total } = req.body;
    
    // Simulate payment processing
    console.log(`[SaifCart] Processing payment for $${total}...`);
    
    setTimeout(() => {
      // 95% success rate for simulation
      const success = Math.random() < 0.95;
      if (success) {
        res.json({ 
          status: 'success', 
          transactionId: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          message: 'Payment verified and captured.'
        });
      } else {
        res.status(402).json({ 
          status: 'error', 
          message: 'The transaction was declined by the bank. Please try another card.' 
        });
      }
    }, 2000);
  });

  // Configure Vite for development or serve static files for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SaifCart] Full-stack engine running at http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('[SaifCart] Failed to spark engine:', error);
});
