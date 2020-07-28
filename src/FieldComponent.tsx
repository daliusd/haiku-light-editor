import React, { useRef, useCallback, useState } from 'react';
import { Field, PanStartCallback, PanMoveCallback } from './types';
import { usePannableRef } from './pannable';

interface Props {
  field: Field;
  ppmm: number;
}

export default (props: Props) => {
  const { field, ppmm } = props;
  const [x, setX] = useState<number>(field.x);
  const [y, setY] = useState<number>(field.y);

  const moved = useRef<boolean>(false);
  const panStartX = useRef<number>(0);
  const panStartY = useRef<number>(0);

  const handlePanStart: PanStartCallback = useCallback(
    (_x: number, _y: number, _touch: boolean) => {
      moved.current = false;
      panStartX.current = x;
      panStartY.current = y;
    },
    [x, y]
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

      setX(panStartX.current);
      setY(panStartY.current);
    },
    [ppmm]
  );

  const pannableRef = usePannableRef(handlePanStart, handlePanMove);
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
        top: y * ppmm,
        left: x * ppmm,
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
