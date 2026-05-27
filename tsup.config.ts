import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node26',
  clean: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
});
