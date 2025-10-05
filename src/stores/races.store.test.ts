// test/races.store.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRaceStore } from '@/stores/races'
import type { Race, CategoryID } from '@/types/racing'

const HORSE: CategoryID = '4a2788f8-e825-4d36-9894-efd4baf1cfae'
const GREY:  CategoryID = '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
const HARN:  CategoryID = '161d9be2-e909-4326-8c2c-35ed71fb460b'

describe('race store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  function make(storeNow: number, deltas: Array<{ d: number; cat: CategoryID }>): Race[] {
    // d is seconds from "now" to start time (negative = already started)
    return deltas.map((x, i) => ({
      id: `r${i}`,
      meetingName: `M${i}`,
      raceNumber: i + 1,
      startMs: storeNow + x.d * 1000,
      categoryId: x.cat,
    }))
  }

  it('sorts ascending, caps at 5, excludes >60s past start', () => {
    const store = useRaceStore()
    const now = Date.now()
    store.nowMs = now

    const races = make(now, [
      { d: 300, cat: HORSE },  // +5:00
      { d: 20,  cat: HORSE },  // +0:20
      { d: -10, cat: GREY  },  // started 10s ago (should be included)
      { d: -61, cat: HARN  },  // started 61s ago (should be excluded)
      { d: 90,  cat: GREY  },  // +1:30
      { d: 60,  cat: HARN  },  // +1:00
      { d: 10,  cat: HORSE },  // +0:10
    ])

    store.merge(races)
    const visible = store.visible

    // Excludes the -61s race
    expect(visible.find(r => r.startMs === now - 61_000)).toBeFalsy()

    // Sorted ascending by start time
    for (let i = 1; i < visible.length; i++) {
      expect(visible[i - 1].startMs <= visible[i].startMs).toBe(true)
    }

    // Cap to 5
    expect(visible.length).toBe(5)

    // First item should be the minimum start time among the visible set
    const minStart = Math.min(...visible.map(r => r.startMs))
    expect(visible[0].startMs).toBe(minStart)
  })

  it('single-select category is enforced', () => {
    const store = useRaceStore()
    const now = Date.now()
    store.nowMs = now

    const races = make(now, [
      { d: 30,  cat: HORSE },
      { d: 40,  cat: GREY  },
      { d: 50,  cat: HARN  },
      { d: -30, cat: HORSE }, // still within +60s visible
      { d: 15,  cat: GREY  },
    ])
    store.merge(races)

    // All
    store.setCategory(null)
    expect(store.visible.length).toBeGreaterThan(0)

    // Only HORSE
    store.setCategory(HORSE)
    expect(store.visible.every(r => r.categoryId === HORSE)).toBe(true)

    // Only GREY
    store.setCategory(GREY)
    expect(store.visible.every(r => r.categoryId === GREY)).toBe(true)
  })
})
