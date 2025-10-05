import { render, screen } from '@testing-library/vue'
import Greeting from '@/components/Greeting.vue'

describe('Greeting', () => {
  it('renders name', () => {
    render(Greeting, { props: { name: 'Paul' } })
    expect(screen.getByText('Hello, Paul')).toBeInTheDocument()
  })
})
