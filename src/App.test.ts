import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import App from './App.vue'
import { useRaceStore } from '@/stores/races'

describe('App.vue', () => {
  it('starts ticker and poller on mount and renders header/footer', async () => {
    render(App, {
      global: {
        plugins: [
          // stubActions true gives us spies for actions
          createTestingPinia({ stubActions: true }),
        ],
      },
    })

    const store = useRaceStore()
    expect(store.startTicker).toHaveBeenCalledTimes(1)
    expect(store.startPoller).toHaveBeenCalledTimes(1)

    // Header exists
    expect(
      screen.getByRole('heading', { name: /Entain .*Races/i })
    ).toBeInTheDocument()

    // Footer exists (contentinfo)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()

    // BrandThemeSwitcher buttons visible
    expect(screen.getByRole('button', { name: /blue/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /red/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /purple/i })).toBeInTheDocument()
  })
})
