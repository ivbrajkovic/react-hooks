/* eslint-disable no-param-reassign */
// useFlip hook

import { useRef, useLayoutEffect } from "react";

interface DeltaRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface IFlipProps {
  root: React.MutableRefObject<HTMLElement>;
  invert: typeof CallbackFunc;
  play: typeof CallbackFunc;
  invertAndPlay?: typeof CallbackFunc;
}

interface ICallbackProps {
  delta: DeltaRect;
  elem: HTMLElement;
  previous: DOMRect;
  next: DOMRect;
}

declare function CallbackFunc({
  delta,
  elem,
  previous,
  next,
}: ICallbackProps): void;

const invertDefault = ({ delta, elem }: ICallbackProps) => {
  elem.style.transform = `translate(${delta.left}px, ${delta.top}px)`;
  elem.style.transition = `transform 0s`;
};

const playDefault = ({ elem }: ICallbackProps) => {
  elem.style.transform = ``;
  elem.style.transition = `transform 300ms ease`;
};

const getDelta = (start: DOMRect, target: DOMRect) => ({
  top: start.top - target.top,
  left: start.left - target.left,
  width: start.width / target.width,
  height: start.height / target.height,
});

const isZero = (delta: DeltaRect) =>
  delta.left === 0 &&
  delta.top === 0 &&
  delta.width === 1 &&
  delta.height === 1;

// TODO Add onAnimationEnd listener

const useFlipAnimation = ({
  root,
  invert = invertDefault,
  play = playDefault,
  invertAndPlay,
}: IFlipProps) => {
  // Current position ref
  const origins = useRef({});
  const firstRun = useRef(true);

  useLayoutEffect(() => {
    if (!root.current) return;

    // eslint-disable-next-line
    const children = root.current.children;

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      // eslint-disable-next-line
      const key = child.dataset.key || 0;

      // Get next position
      const next = child.getBoundingClientRect();

      if (!firstRun.current) {
        if (key! in origins.current) {
          const previous = origins.current[key!] as DOMRect;
          const delta = getDelta(previous, next);

          if (!isZero(delta as DOMRect)) {
            if (invertAndPlay) {
              invertAndPlay({ delta, elem: child, previous, next });
            } else {
              // Invert position
              invert({ delta, elem: child, previous, next });

              // Start RAF animation
              requestAnimationFrame(() => {
                play({ delta, elem: child, previous, next });
              });
            }
          }
        }
      }

      // Replace curren position with next
      origins.current[child.dataset.key!] = next;
    }

    // if (!firstRun.current) setAnim(animations);

    firstRun.current = false;
    // }, [root, invert, play, invertAndPlay]);
  }, [root, invert, play, invertAndPlay]);
};

export default useFlipAnimation;
