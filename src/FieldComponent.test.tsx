import React, { useState } from 'react';

import { Editor, ImageField, Settings, Editable } from '.';
import { render, screen, fireEvent } from '@testing-library/react';

const DynamicEditor = (props: { settings: Settings; editable: Editable }) => {
  const [editable, setEditable] = useState(props.editable);

  return (
    <Editor
      settings={props.settings}
      editable={editable}
      onChange={setEditable}
    />
  );
};

describe('FieldComponent', () => {
  const settings: Settings = {
    width: 100,
    height: 100
  };

  const editable: Editable = {
    width: 80,
    height: 80,
    fields: []
  };

  const imageField: ImageField = {
    type: 'image',
    id: '1',
    x: 10,
    y: 10,
    width: 60,
    height: 60,
    angle: 0,
    scale: 1,
    cx: 0,
    cy: 0,
    imageWidth: 60,
    imageHeight: 60,
    imageUrl: '/test.png',
    imageFlip: false,
    imageRotation: 0
  };

  it('image can be moved using mouse', () => {
    render(
      <DynamicEditor
        settings={settings}
        editable={{ ...editable, fields: [imageField] }}
      />
    );
    expect(screen.getByTestId('editor')).toMatchSnapshot();

    const imageFieldElement = screen.getByTestId('field-1');
    fireEvent.mouseDown(imageFieldElement, { clientX: 30, clientY: 30 });
    fireEvent.mouseMove(imageFieldElement, { clientX: 40, clientY: 40 });
    fireEvent.mouseUp(imageFieldElement, { clientX: 40, clientY: 40 });

    expect(screen.getByTestId('editor')).toMatchSnapshot();
  });

  it('image can be moved using touch', () => {
    render(
      <DynamicEditor
        settings={settings}
        editable={{ ...editable, fields: [imageField] }}
      />
    );
    expect(screen.getByTestId('editor')).toMatchSnapshot();

    const imageFieldElement = screen.getByTestId('field-1');
    fireEvent.touchStart(imageFieldElement, {
      changedTouches: [{ clientX: 30, clientY: 30 }]
    });
    fireEvent.touchMove(imageFieldElement, {
      changedTouches: [{ clientX: 41, clientY: 42 }],
      touches: []
    });
    fireEvent.touchEnd(imageFieldElement, {
      changedTouches: [{ clientX: 41, clientY: 42 }]
    });

    expect(screen.getByTestId('editor')).toMatchSnapshot();
  });
});
