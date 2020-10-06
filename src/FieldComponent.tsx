import React, { useRef, useCallback } from 'react';
import { Field, PanStartCallback, PanMoveCallback, Editable } from './types';
import { usePannableRef } from './pannable';

interface Props {
  editable: Editable;
  field: Field;
  ppmm: number;
  onChange?: (e: Editable) => void;
}

const MovePannableRef = (
  field: Field,
  ppmm: number,
  editable: Editable,
  onChange?: (e: Editable) => void
) => {
  const moved = useRef<boolean>(false);
  const panStartX = useRef<number>(0);
  const panStartY = useRef<number>(0);

  const handlePanStart: PanStartCallback = useCallback(
    (_x: number, _y: number, _touch: boolean) => {
      moved.current = false;
      panStartX.current = field.x;
      panStartY.current = field.y;
    },
    [field]
  );

  const handlePanMove: PanMoveCallback = useCallback(
    (
      _x: number,
      _y: number,
      dx: number,
      dy: number,
      _touch: boolean,
      _ctrlKey: boolean,
      event: MouseEvent | TouchEvent
    ) => {
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        moved.current = true;
      }

      event.preventDefault();
      panStartX.current += dx / ppmm;
      panStartY.current += dy / ppmm;

      if (onChange) {
        // FIXME: this is wrong implementation.
        const newEditable = {
          ...editable,
          fields: [
            {
              ...editable.fields[0],
              x: panStartX.current,
              y: panStartY.current
            }
          ]
        };
        onChange(newEditable);
      }
    },
    [ppmm, editable, onChange]
  );

  return usePannableRef(handlePanStart, handlePanMove, undefined, undefined);
};

export default (props: Props) => {
  const { editable, onChange, field, ppmm } = props;

  const pannableRef = MovePannableRef(field, ppmm, editable, onChange);

  const imageShift =
    field.imageRotation % 2 === 1
      ? ((field.imageRotation === 3 ? -1 : 1) *
          ((field.imageWidth - field.imageHeight) * ppmm * field.scale)) /
        2
      : 0;

  return (
    <div
      ref={pannableRef}
      data-testid={`field-${field.id}`}
      style={{
        position: 'absolute',
        top: field.y * ppmm,
        left: field.x * ppmm,
        width: field.width * ppmm,
        height: field.height * ppmm,
        transform: `rotate(${field.angle}rad)`
      }}
    >
      <img
        src={field.imageUrl}
        alt=''
        style={{
          width: field.imageWidth * ppmm * field.scale,
          height: field.imageHeight * ppmm * field.scale,
          position: 'absolute',
          left: field.cx * ppmm,
          top: field.cy * ppmm,
          transform: `scaleX(${field.imageFlip ? -1 : 1}) rotate(${
            field.imageRotation * 90
          }deg) translate(${imageShift}px, ${
            imageShift * (field.imageFlip ? -1 : 1)
          }px)`
        }}
      />
    </div>
  );
};
