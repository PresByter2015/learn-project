import { defineConfig } from 'umi';

export default defineConfig({
  ssr: {
    devServerRender: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
});
