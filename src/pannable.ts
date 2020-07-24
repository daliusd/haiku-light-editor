import { useRef, useCallback } from 'react';
import { PanStartCallback, PanMoveCallback } from './types';

export function usePannableRef(
  panStartCallback: PanStartCallback,
  panMoveCallback: PanMoveCallback
) {
  const ref = useRef<HTMLElement | null>(null);

  const touchHandled = useRef<boolean>(false);
  const x = useRef<number>(0);
  const y = useRef<number>(0);
  const pinchHypot = useRef<number | undefined>(undefined);
  const pinchX = useRef<number>(0);
  const pinchY = useRef<number>(0);

  const handleClick = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

  const handlePanMove = useCallback(
    (
      eventPos: MouseEvent | Touch,
      event: MouseEvent | TouchEvent,
      touch: boolean
    ) => {
      const ctrlKey = event.ctrlKey;
      const dx = eventPos.clientX - x.current;
      const dy = eventPos.clientY - y.current;
      x.current = eventPos.clientX;
      y.current = eventPos.clientY;

      panMoveCallback(x.current, y.current, dx, dy, touch, ctrlKey, event);
    },
    [panMoveCallback]
  );

  const handleMousemove = useCallback(
    (event: MouseEvent) => {
      handlePanMove(event, event, false);
    },
    [handlePanMove]
  );

  const handleTouchmove = useCallback(
    (event: TouchEvent) => {
      if (event.touches.length > 1) {
        const t1 = event.touches[0];
        const t2 = event.touches[1];
        const newPinchHypot = Math.hypot(
          t1.clientX - t2.clientX,
          t1.clientY - t2.clientY
        );
        const newPinchX = (t1.clientX + t2.clientX) / 2;
        const newPinchY = (t1.clientY + t2.clientY) / 2;

        if (pinchHypot.current !== undefined) {
          // const delta = newPinchHypot - pinchHypot.current;
          // ('pinch', {
          //  delta,
          //  event,
          //  x: newPinchX,
          //  y: newPinchY,
          //  dx: newPinchX - pinchX.current,
          //  dy: newPinchY - pinchY.current
          // });
        }
        pinchHypot.current = newPinchHypot;
        pinchX.current = newPinchX;
        pinchY.current = newPinchY;

        return;
      }

      handlePanMove(event.changedTouches[0], event, true);
    },
    [handlePanMove]
  );

  const handlePanEnd = useCallback(
    (event: MouseEvent | Touch, _touch: boolean) => {
      x.current = event.clientX;
      y.current = event.clientY;

      // ('panend', {
      //  x,
      //  y,
      //  touch
      // });
    },
    []
  );

  const handleMouseup = useCallback(
    (event: MouseEvent) => {
      handlePanEnd(event, false);

      window.removeEventListener('mousemove', handleMousemove);
      // window.removeEventListener('mouseup', handleMouseup);
    },
    [handleMousemove, handlePanEnd]
  );

  const handleTouchend = useCallback(
    (event: TouchEvent) => {
      handlePanEnd(event.changedTouches[0], true);

      window.removeEventListener('touchmove', handleTouchmove);
      // window.removeEventListener('touchend', handleTouchend);
    },
    [handleTouchmove, handlePanEnd]
  );

  const handlePanStart = useCallback(
    (event: MouseEvent | Touch, touch: boolean) => {
      x.current = event.clientX;
      y.current = event.clientY;

      panStartCallback(x.current, y.current, touch);
    },
    [panStartCallback]
  );

  const handleMousedown = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();
      if (touchHandled.current) {
        touchHandled.current = false;
        return;
      }
      event.preventDefault();

      handlePanStart(event, false);

      window.addEventListener('mousemove', handleMousemove);
      window.addEventListener('mouseup', handleMouseup);
    },
    [handleMousemove, handleMouseup, handlePanStart]
  );

  const handleTouchstart = useCallback(
    (event: TouchEvent) => {
      touchHandled.current = true;
      pinchHypot.current = undefined;
      event.stopPropagation();

      handlePanStart(event.changedTouches[0], true);

      window.addEventListener('touchmove', handleTouchmove, { passive: false });
      window.addEventListener('touchend', handleTouchend, { passive: false });
    },
    [handleTouchmove, handleTouchend, handlePanStart]
  );

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      if (ref.current) {
        ref.current.removeEventListener('click', handleClick);
        ref.current.removeEventListener('mousedown', handleMousedown);
        ref.current.removeEventListener('touchstart', handleTouchstart);
      }

      if (node) {
        node.addEventListener('click', handleClick);
        node.addEventListener('mousedown', handleMousedown);
        node.addEventListener('touchstart', handleTouchstart);
      }

      // Save a reference to the node
      ref.current = node;
    },
    [handleClick, handleMousedown, handleTouchstart]
  );

  return setRef;
}
