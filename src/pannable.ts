import { useRef, useCallback, useEffect } from 'react';
import {
  PanStartCallback,
  PanMoveCallback,
  PanEndCallback,
  PanPinchCallback
} from './types';

export function usePannableRef(
  panStartCallback: PanStartCallback | undefined,
  panMoveCallback: PanMoveCallback | undefined,
  panEndCallback: PanEndCallback | undefined,
  panPinchCallback: PanPinchCallback | undefined
) {
  const ref = useRef<HTMLElement | null>(null);
  const handleClickRef = useRef<EventListener | null>(null);
  const handleMousedownRef = useRef<EventListener | null>(null);
  const handleTouchstartRef = useRef<EventListener | null>(null);

  const panStartCallbackRef = useRef<PanStartCallback | undefined>(
    panStartCallback
  );
  const panMoveCallbackRef = useRef<PanMoveCallback | undefined>(
    panMoveCallback
  );
  const panEndCallbackRef = useRef<PanEndCallback | undefined>(panEndCallback);
  const panPinchCallbackRef = useRef<PanPinchCallback | undefined>(
    panPinchCallback
  );

  useEffect(() => {
    panStartCallbackRef.current = panStartCallback;
  }, [panStartCallback]);

  useEffect(() => {
    panMoveCallbackRef.current = panMoveCallback;
  }, [panMoveCallback]);

  useEffect(() => {
    panEndCallbackRef.current = panEndCallback;
  }, [panEndCallback]);

  useEffect(() => {
    panPinchCallbackRef.current = panPinchCallback;
  }, [panPinchCallback]);

  const setRef = useCallback((node: HTMLElement | null) => {
    if (ref.current) {
      if (handleClickRef.current) {
        ref.current.removeEventListener('click', handleClickRef.current);
      }
      if (handleMousedownRef.current) {
        ref.current.removeEventListener(
          'mousedown',
          handleMousedownRef.current
        );
      }
      if (handleTouchstartRef.current) {
        ref.current.removeEventListener(
          'touchstart',
          handleTouchstartRef.current
        );
      }
    }

    let touchHandled = false;
    let x = 0;
    let y = 0;
    let pinchHypot: undefined | number;
    let pinchX = 0;
    let pinchY = 0;

    function handleClick(event: MouseEvent) {
      event.stopPropagation();
    }

    function handlePanMove(
      eventPos: MouseEvent | Touch,
      event: MouseEvent | TouchEvent,
      touch: boolean
    ) {
      const ctrlKey = event.ctrlKey;
      const dx = eventPos.clientX - x;
      const dy = eventPos.clientY - y;
      x = eventPos.clientX;
      y = eventPos.clientY;

      if (panMoveCallbackRef.current) {
        panMoveCallbackRef.current(x, y, dx, dy, touch, ctrlKey, event);
      }
    }

    function handleMousemove(event: MouseEvent) {
      handlePanMove(event, event, false);
    }

    function handleTouchmove(event: TouchEvent) {
      if (event.touches.length > 1) {
        const t1 = event.touches[0];
        const t2 = event.touches[1];
        const newPinchHypot = Math.hypot(
          t1.clientX - t2.clientX,
          t1.clientY - t2.clientY
        );
        const newPinchX = (t1.clientX + t2.clientX) / 2;
        const newPinchY = (t1.clientY + t2.clientY) / 2;

        if (pinchHypot !== undefined) {
          const delta = newPinchHypot - pinchHypot;
          if (panPinchCallbackRef.current) {
            panPinchCallbackRef.current(
              newPinchX,
              newPinchY,
              newPinchX - pinchX,
              newPinchY - pinchY,
              delta,
              event
            );
          }
        }
        pinchHypot = newPinchHypot;
        pinchX = newPinchX;
        pinchY = newPinchY;

        return;
      }

      handlePanMove(event.changedTouches[0], event, true);
    }

    function handlePanEnd(event: MouseEvent | Touch, touch: boolean) {
      x = event.clientX;
      y = event.clientY;

      if (panEndCallbackRef.current) {
        panEndCallbackRef.current(x, y, touch);
      }
    }

    function handleMouseup(event: MouseEvent) {
      handlePanEnd(event, false);

      window.removeEventListener('mousemove', handleMousemove);
      window.removeEventListener('mouseup', handleMouseup);
    }

    function handleTouchend(event: TouchEvent) {
      handlePanEnd(event.changedTouches[0], true);

      window.removeEventListener('touchmove', handleTouchmove);
      window.removeEventListener('touchend', handleTouchend);
    }

    function handlePanStart(event: MouseEvent | Touch, touch: boolean) {
      x = event.clientX;
      y = event.clientY;

      if (panStartCallbackRef.current) {
        panStartCallbackRef.current(x, y, touch);
      }
    }

    function handleMousedown(event: MouseEvent) {
      event.stopPropagation();
      if (touchHandled) {
        touchHandled = false;
        return;
      }
      event.preventDefault();

      handlePanStart(event, false);

      window.addEventListener('mousemove', handleMousemove);
      window.addEventListener('mouseup', handleMouseup);
    }

    function handleTouchstart(event: TouchEvent) {
      touchHandled = true;
      pinchHypot = undefined;
      event.stopPropagation();

      handlePanStart(event.changedTouches[0], true);

      window.addEventListener('touchmove', handleTouchmove, {
        passive: false
      });
      window.addEventListener('touchend', handleTouchend, {
        passive: false
      });
    }

    if (node) {
      node.addEventListener('click', handleClick);
      node.addEventListener('mousedown', handleMousedown);
      node.addEventListener('touchstart', handleTouchstart);
    }

    // Save a reference to the node
    ref.current = node;
    handleClickRef.current = handleClick as EventListener;
    handleMousedownRef.current = handleMousedown as EventListener;
    handleTouchstartRef.current = handleTouchstart as EventListener;
  }, []);

  return setRef;
}
