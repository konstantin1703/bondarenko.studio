import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['@/lib/server/*', '@/lib/server/**'],
            message: 'Server-only modules must not enter client-facing components.'
          }
        ]
      }]
    }
  },
  globalIgnores([
    '.next/**',
    'node_modules/**',
    'tests/visual/**',
    'src/styles/foundations/_tokens.generated.scss'
  ])
]);
