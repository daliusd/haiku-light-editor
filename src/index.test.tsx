import React from 'react';

import { Editor, ImageField, Settings, Editable } from '.';
import { render, screen } from '@testing-library/react';

describe('Editor', () => {
  it('is truthy', () => {
    expect(Editor).toBeTruthy();
  });

  const settings: Settings = {
    width: 100,
    height: 100
  };

  const editable: Editable = {
    width: 20,
    height: 20
  };

  const imageField: ImageField = {
    type: 'image',
    id: '1',
    x: 2,
    y: 2,
    width: 5,
    height: 5,
    angle: 0,
    scale: 0.5,
    cx: 0,
    cy: 0,
    imageWidth: 10,
    imageHeight: 10,
    imageUrl: '/test.png',
    imageFlip: false,
    imageRotation: 0
  };

  it('renders empty square', () => {
    render(<Editor settings={settings} editable={editable} />);
    expect(screen.getByTestId('editor')).toMatchSnapshot();
  });

  it('renders empty square in black background', () => {
    render(
      <Editor
        settings={{ ...settings, backgroundColor: '#000000' }}
        editable={editable}
      />
    );
    expect(screen.getByTestId('editor')).toMatchSnapshot();
  });

  it('renders image properly', () => {
    render(
      <Editor
        settings={settings}
        editable={{ ...editable, fields: [imageField] }}
      />
    );
    expect(screen.getByTestId('editor')).toMatchSnapshot();
  });
});
