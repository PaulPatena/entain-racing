import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Polyfill matchMedia for jsdom
if (!('matchMedia' in window)) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,          // pretend system is light mode
      media: query,
      onchange: null,
      addListener: vi.fn(),    // legacy
      removeListener: vi.fn(), // legacy
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}
