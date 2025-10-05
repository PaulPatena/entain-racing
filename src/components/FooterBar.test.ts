// src/components/__tests__/FooterBar.spec.ts
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/vue'
import FooterBar from './FooterBar.vue'

describe('FooterBar', () => {
  it('renders copyright and external link', () => {
    render(FooterBar)

    // Scope all assertions to the footer to avoid duplicate matches elsewhere
    const footer = screen.getByRole('contentinfo')
    const scoped = within(footer)

    // Assert distinct fragments so we don’t rely on a single node containing all text
    expect(footer).toHaveTextContent(/made by/i)
    scoped.getByText('Paul Patena')
    scoped.getByText(/©\s*2025/)

    // External link + attributes
    const link = scoped.getByRole('link', { name: /paulpatena\.com/i })
    expect(link).toHaveAttribute('href', 'https://paulpatena.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))

    // Themeable classes smoke check
    expect(footer.className).toMatch(/bg-surface/)
    expect(footer.className).toMatch(/border-primary-soft/)
  })
})
