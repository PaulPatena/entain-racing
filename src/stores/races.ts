import { defineStore } from 'pinia'
import type { Race, CategoryID } from '@/types/racing'

type ApiRaceSummary = {
  race_id: string
  meeting_name: string
  race_number: number
  advertised_start: { seconds: number }
  category_id: CategoryID
}

type ApiResponse = {
  data: { race_summaries: Record<string, ApiRaceSummary> }
}

const NEXT_RACES_URL = (count: number) =>
  `https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=${count}`

const STALE_AFTER_MS = 60_000

export const useRaceStore = defineStore('races', {
  state: () => ({
    byId: {} as Record<string, Race>,
    nowMs: Date.now(),
    selected: new Set<CategoryID>() as Set<CategoryID>,
    loading: false,
    error: '' as string,
    _ticker: null as number | null,
    _poller: null as number | null,
  }),
  getters: {
    allRaces(state): Race[] {
      return Object.values(state.byId)
    },
    visible(state): Race[] {
      const list = Object.values(state.byId)
        .filter(r => state.nowMs - r.startMs <= STALE_AFTER_MS) // not beyond +60s
        .filter(r => state.selected.size === 0 || state.selected.has(r.categoryId))
        .sort((a, b) => a.startMs - b.startMs)
      return list.slice(0, 5)
    },
  },
  actions: {
    toggleCategory(cat: CategoryID) {
      if (this.selected.has(cat)) this.selected.delete(cat)
      else this.selected.add(cat)
    },
    clearCategories() {
      this.selected.clear()
    },
    merge(races: Race[]) {
      for (const r of races) this.byId[r.id] = r
      // Bound memory: keep only upcoming-ish
      const cutoff = this.nowMs - STALE_AFTER_MS
      for (const [id, r] of Object.entries(this.byId)) {
        if (r.startMs < cutoff) delete this.byId[id]
      }
    },
    async fetchNext(count = 50) {
      try {
        this.loading = true
        this.error = ''
        const res = await fetch(NEXT_RACES_URL(count))
        const json = (await res.json()) as ApiResponse
        const races = Object.values(json.data.race_summaries).map<Race>(s => ({
          id: s.race_id,
          meetingName: s.meeting_name,
          raceNumber: s.race_number,
          startMs: s.advertised_start.seconds * 1000,
          categoryId: s.category_id,
        }))
        this.merge(races)
      } catch (e: any) {
        this.error = e?.message ?? 'Failed to fetch races'
      } finally {
        this.loading = false
      }
    },
    startTicker() {
      if (this._ticker != null) return
      this._ticker = window.setInterval(() => {
        this.nowMs = Date.now()
      }, 1000)
    },
    stopTicker() {
      if (this._ticker != null) {
        clearInterval(this._ticker)
        this._ticker = null
      }
    },
    startPoller(intervalMs = 15000) {
      if (this._poller != null) return
      // initial fetch eager
      this.fetchNext(50)
      this._poller = window.setInterval(() => {
        this.fetchNext(50)
      }, intervalMs)
    },
    stopPoller() {
      if (this._poller != null) {
        clearInterval(this._poller)
        this._poller = null
      }
    },
  },
})
