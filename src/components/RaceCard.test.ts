// test/RaceCard.test.ts
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import RaceCard from '@/components/RaceCard.vue'
import { useRaceStore } from '@/stores/races'
import type { Race } from '@/types/racing'

const HORSE = '4a2788f8-e825-4d36-9894-efd4baf1cfae'

function mountWithNow(now: number, deltaSec: number) {
  const startMs = now + deltaSec * 1000
  const race: Race = {
    id: 'r1',
    meetingName: 'Test Meeting',
    raceNumber: 3,
    startMs,
    categoryId: HORSE as any,
  }

  const utils = render(RaceCard, {
    props: { race },
    global: { plugins: [createTestingPinia()] },
  })
  const store = useRaceStore()
  store.nowMs = now
  return utils
}

describe('RaceCard', () => {
  it('shows "Starts in" for future race', async () => {
    const now = Date.now()
    mountWithNow(now, 25) // +25s
    expect(await screen.findByText(/Starts in/i)).toBeInTheDocument()
  })

  it('shows "Removing in" for started race (within 60s)', async () => {
    const now = Date.now()
    mountWithNow(now, -30) // started 30s ago
    expect(await screen.findByText(/Started/i)).toBeInTheDocument()
    expect(await screen.findByText(/Removing in/i)).toBeInTheDocument()
  })
})
