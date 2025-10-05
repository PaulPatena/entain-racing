import {describe, expect, it} from 'vitest'
import {render, screen} from '@testing-library/vue'
import {createTestingPinia} from '@pinia/testing'
import RaceList from './RaceList.vue'
import {useRaceStore} from '@/stores/races'
import type {CategoryID, Race} from '@/types/racing'
import {nextTick} from 'vue'

const HORSE: CategoryID = '4a2788f8-e825-4d36-9894-efd4baf1cfae'
const GREY:  CategoryID = '9daef0d7-bf3c-4f50-921d-8e818c60fe61'

function race(id: string, deltaSec: number, cat: CategoryID): Race {
  const now = Date.now()
  return {
    id,
    meetingName: `M-${id}`,
    raceNumber: Number(id.replace(/\D/g, '')) || 1,
    startMs: now + deltaSec * 1000,
    categoryId: cat,
  }
}

describe('RaceList', () => {
  it('shows skeletons when loading and no visible races', async () => {
    render(RaceList, {
      global: { plugins: [createTestingPinia({ stubActions: false })] },
    })
    const store = useRaceStore()
    store.loading = true
    store.byId = {}
    await nextTick()

    // 5 skeleton rows
    const skeletons = document.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBe(5)
  })

  it('renders RaceCard items for visible races', async () => {
    render(RaceList, {
      global: { plugins: [createTestingPinia({ stubActions: false })] },
    })
    const store = useRaceStore()
    store.nowMs = Date.now()

    // three future races + one started within 60s
    store.byId = {
      r1: race('1', 30, HORSE),
      r2: race('2', 90, GREY),
      r3: race('3', 10, HORSE),
      r4: race('4', -20, GREY), // started 20s ago, still visible
    }
    store.loading = false
    await nextTick()

    // Should render 4 cards
    const cards = document.querySelectorAll('article')
    expect(cards.length).toBe(4)

    // Meeting names appear
    expect(screen.getByText('M-1')).toBeInTheDocument()
    expect(screen.getByText('M-2')).toBeInTheDocument()
    expect(screen.getByText('M-3')).toBeInTheDocument()
    expect(screen.getByText('M-4')).toBeInTheDocument()
  })
})
