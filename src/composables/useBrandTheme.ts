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
    const savedTheme =
      (localStorage.getItem(THEME_KEY) as Theme) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

    applyBrand(savedBrand)
    applyTheme(savedTheme)
  }

  // Track OS changes only if user hasn't chosen explicitly
  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const handleMql = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches ? 'dark' : 'light')
  }

  onMounted(() => {
    init()
    mql.addEventListener('change', handleMql)
  })
  onBeforeUnmount(() => {
    mql.removeEventListener('change', handleMql)
  })

  return { activeBrand, activeTheme, applyBrand, applyTheme }
}
