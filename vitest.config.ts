import { defineConfig } from 'vitest/config';

defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./test/setup.ts'],
    }
});