// test/CategoryFilter.test.ts
import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import CategoryFilter from '../CategoryFilter.vue'
import { useRaceStore } from '../../stores/races'

describe('CategoryFilter (radio)', () => {
  it('selects one category and updates store', async () => {
    render(CategoryFilter, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,   // <-- let real actions run
          }),
        ],
      },
    })
    const store = useRaceStore()

    const allRadio     = screen.getByRole('radio', { name: /All/i })
    const horseRadio   = screen.getByRole('radio', { name: /Horse/i })
    const greyRadio    = screen.getByRole('radio', { name: /Greyhound/i })
    const harnessRadio = screen.getByRole('radio', { name: /Harness/i })

    // starts at All
    expect(allRadio).toBeChecked()
    expect(store.selected).toBe(null)

    await fireEvent.click(horseRadio)
    expect(horseRadio).toBeChecked()
    expect(store.selected).toBe('4a2788f8-e825-4d36-9894-efd4baf1cfae')

    await fireEvent.click(greyRadio)
    expect(greyRadio).toBeChecked()
    expect(store.selected).toBe('9daef0d7-bf3c-4f50-921d-8e818c60fe61')

    await fireEvent.click(harnessRadio)
    expect(harnessRadio).toBeChecked()
    expect(store.selected).toBe('161d9be2-e909-4326-8c2c-35ed71fb460b')
  })
})
