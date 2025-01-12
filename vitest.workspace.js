import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  './vitest.config.ts',
  './common/hooks/vitest.config.ts',
  './common/utils/vitest.config.ts',
  './common/plugins/vitest.config.ts',
  './common/bem-helper/vitest.config.ts'
])
