import React from 'react'

import { Editor } from '.'
import { render, screen } from '@testing-library/react'

describe('Editor', () => {
  it('is truthy', () => {
    expect(Editor).toBeTruthy()
  })

  it('renders empty square', () => {
    const editable = {
      width: 20,
      height: 20
    }

    render(<Editor width={100} height={100} editable={editable} />)
    expect(screen.getByTestId('editor')).toMatchSnapshot()
  })
})
