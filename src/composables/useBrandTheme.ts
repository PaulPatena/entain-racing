import { ref, onMounted, onBeforeUnmount } from 'vue'

export type Brand = 'blue' | 'red' | 'purple'
export type Theme = 'light' | 'dark'

const BRAND_KEY = 'brand'
const THEME_KEY = 'theme'

export function useBrandTheme() {
  const activeBrand = ref<Brand>('blue')
  const activeTheme = ref<Theme>('light')

  const applyBrand = (b: Brand) => {
    activeBrand.value = b
    document.documentElement.setAttribute('data-brand', b)
    localStorage.setItem(BRAND_KEY, b)
  }

  const applyTheme = (t: Theme) => {
    activeTheme.value = t
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem(THEME_KEY, t)
  }

  const init = () => {
    const savedBrand = (localStorage.getItem(BRAND_KEY) as Brand) || 'blue'

    // gate matchMedia; default to light when unavailable
    const hasMQ =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function'

    const prefersDark = hasMQ
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false

    const savedTheme =
      (localStorage.getItem(THEME_KEY) as Theme) ||
      (prefersDark ? 'dark' : 'light')

    applyBrand(savedBrand)
    applyTheme(savedTheme)
  }

  let mql: MediaQueryList | null = null
  const handleMql = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light')
    }
  }

  onMounted(() => {
    init()

    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      mql = window.matchMedia('(prefers-color-scheme: dark)')
      mql.addEventListener?.('change', handleMql)
      // (Optional) sync immediately in case theme changed before mount
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(mql.matches ? 'dark' : 'light')
      }
    }
  })

  onBeforeUnmount(() => {
    mql?.removeEventListener?.('change', handleMql)
    mql = null
  })

  return { activeBrand, activeTheme, applyBrand, applyTheme }
}
