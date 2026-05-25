import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';
import { DEFAULT_POST_META } from './src/data/postsMeta';

const postPrerenderRoutes = DEFAULT_POST_META.filter((post) => post.status === 'published').map(
  (post) => `/writing/${post.id}`
);

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      vitePrerenderPlugin({
        renderTarget: '#root',
        prerenderScript: path.resolve(__dirname, 'src/prerender.tsx'),
        additionalPrerenderRoutes: ['/blog', ...postPrerenderRoutes],
        previewMiddlewareFallback: '/index.html',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) {
              if (id.includes('postContents') || id.includes('AdminPanel')) {
                return 'admin-content';
              }
              if (id.includes('BlogPostRoute') || id.includes('BlogPostPage')) {
                return 'blog-post';
              }
              return;
            }
            if (id.includes('motion')) return 'vendor-motion';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react';
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
