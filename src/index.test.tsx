import React from 'react'

import { Editor } from '.'
import { render, screen } from '@testing-library/react'

describe('Editor', () => {
  it('is truthy', () => {
    expect(Editor).toBeTruthy()
  })

  const settings = {
    width: 100,
    height: 100
  }

  const editable = {
    width: 20,
    height: 20
  }

  it('renders empty square', () => {
    render(<Editor settings={settings} editable={editable} />)
    expect(screen.getByTestId('editor')).toMatchSnapshot()
  })

  it('renders empty square in black background', () => {
    render(
      <Editor
        settings={{ ...settings, backgroundColor: '#000000' }}
        editable={editable}
      />
    )
    expect(screen.getByTestId('editor')).toMatchSnapshot()
  })
})
