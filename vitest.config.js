import { defineConfig, configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    include:   ['src/**/*.spec.js'],
    exclude:   [...configDefaults.exclude, 'drafts'],
    watch:     false,
    reporters: ['verbose'],
  },
})
