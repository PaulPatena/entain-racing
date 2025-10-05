import { describe, it, expect, beforeEach } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/vue'
import BrandThemeSwitcher from '../BrandThemeSwitcher.vue'

describe('BrandThemeSwitcher', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-brand')
    document.documentElement.removeAttribute('data-theme')
  })

  it('applies brand and theme and persists them', async () => {
    render(BrandThemeSwitcher)

    const blueBtn = screen.getByRole('button', { name: /blue/i })
    const redBtn = screen.getByRole('button', { name: /red/i })
    const purpleBtn = screen.getByRole('button', { name: /purple/i })
    const lightBtn = screen.getByRole('button', { name: /light/i })
    const darkBtn = screen.getByRole('button', { name: /dark/i })

    // default brand/theme are applied on mount (via composable)
    expect(document.documentElement.getAttribute('data-brand')).toBeTruthy()
    expect(document.documentElement.getAttribute('data-theme')).toBeTruthy()

    await fireEvent.click(redBtn)
    expect(document.documentElement.getAttribute('data-brand')).toBe('red')
    expect(localStorage.getItem('brand')).toBe('red')

    await fireEvent.click(purpleBtn)
    expect(document.documentElement.getAttribute('data-brand')).toBe('purple')
    expect(localStorage.getItem('brand')).toBe('purple')

    await fireEvent.click(darkBtn)
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    await fireEvent.click(lightBtn)
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')

    // switch back to blue
    await fireEvent.click(blueBtn)
    expect(document.documentElement.getAttribute('data-brand')).toBe('blue')
  })
})
