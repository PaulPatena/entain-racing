// test/useBrandTheme.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useBrandTheme } from '@/composables/useBrandTheme'

describe('useBrandTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-brand')
    document.documentElement.removeAttribute('data-theme')
  })

  it('applies and persists brand/theme', () => {
    const { applyBrand, applyTheme } = useBrandTheme()
    applyBrand('purple')
    applyTheme('dark')

    expect(document.documentElement.getAttribute('data-brand')).toBe('purple')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('brand')).toBe('purple')
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
