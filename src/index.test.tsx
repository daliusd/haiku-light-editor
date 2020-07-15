import React from 'react'

import { Editor } from '.'
import { render, screen } from '@testing-library/react'

describe('Editor', () => {
  it('is truthy', () => {
    expect(Editor).toBeTruthy()
  })

  it('renders empty square', () => {
    const settings = {
      width: 100,
      height: 100
    }

    const editable = {
      width: 20,
      height: 20
    }

    render(<Editor settings={settings} editable={editable} />)
    expect(screen.getByTestId('editor')).toMatchSnapshot()
  })
})
