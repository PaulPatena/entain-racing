// test/CategoryFilter.test.ts
import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import CategoryFilter from '../CategoryFilter.vue'
import { useRaceStore } from '../../stores/races'

describe('CategoryFilter (buttons)', () => {
  it('toggles active button and updates store', async () => {
    render(CategoryFilter, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
      },
    })
    const store = useRaceStore()

    const allBtn     = screen.getByRole('button', { name: /All/i })
    const horseBtn   = screen.getByRole('button', { name: /Horse/i })
    const greyBtn    = screen.getByRole('button', { name: /Greyhound/i })
    const harnessBtn = screen.getByRole('button', { name: /Harness/i })

    // starts at All
    expect(store.selected).toBe(null)
    expect(allBtn).toHaveAttribute('aria-pressed', 'true')
    expect(horseBtn).toHaveAttribute('aria-pressed', 'false')
    expect(greyBtn).toHaveAttribute('aria-pressed', 'false')
    expect(harnessBtn).toHaveAttribute('aria-pressed', 'false')

    // click Horse
    await fireEvent.click(horseBtn)
    expect(store.selected).toBe('4a2788f8-e825-4d36-9894-efd4baf1cfae')
    expect(horseBtn).toHaveAttribute('aria-pressed', 'true')
    expect(allBtn).toHaveAttribute('aria-pressed', 'false')

    // click Greyhound
    await fireEvent.click(greyBtn)
    expect(store.selected).toBe('9daef0d7-bf3c-4f50-921d-8e818c60fe61')
    expect(greyBtn).toHaveAttribute('aria-pressed', 'true')
    expect(horseBtn).toHaveAttribute('aria-pressed', 'false')

    // click Harness
    await fireEvent.click(harnessBtn)
    expect(store.selected).toBe('161d9be2-e909-4326-8c2c-35ed71fb460b')
    expect(harnessBtn).toHaveAttribute('aria-pressed', 'true')
    expect(greyBtn).toHaveAttribute('aria-pressed', 'false')

    // back to All
    await fireEvent.click(allBtn)
    expect(store.selected).toBe(null)
    expect(allBtn).toHaveAttribute('aria-pressed', 'true')
    expect(harnessBtn).toHaveAttribute('aria-pressed', 'false')
  })
})
