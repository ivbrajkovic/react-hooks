/* eslint-disable no-param-reassign */
// useFlip hook

import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { debounce } from "@ivbrajkovic/utils";

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
  debounceScrolling?: number;
  enable?: boolean;
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
  next
}: ICallbackProps): void;

// ────────────────────────────────────────────────────────
// Default functions
//
const invertDefault = ({ delta, elem }: ICallbackProps) => {
  elem.style.transform = `translate(${delta.left}px, ${delta.top}px)`;
  elem.style.transition = `transform 0s`;
};

const playDefault = ({ elem }: ICallbackProps) => {
  elem.style.transform = ``;
  elem.style.transition = `transform 300ms ease`;
};

// eslint-disable-next-line
const invertAndPlayDefault = ({ delta, elem, previous, next }) => {
  elem.animate(
    [
      { transform: `translate(${delta.left}px, ${delta.top}px)` },
      { transform: `none` }
    ],
    { delay: 0, duration: 300, easing: "ease" }
  );
};
//
// ────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────
// Helper functions
//
const getDelta = (start: DOMRect, target: DOMRect) => ({
  top: start.top - target.top,
  left: start.left - target.left,
  width: start.width / target.width,
  height: start.height / target.height
});

const isZero = (delta: DeltaRect) =>
  delta.left === 0 &&
  delta.top === 0 &&
  delta.width === 1 &&
  delta.height === 1;
//
// ────────────────────────────────────────────────────────

// TODO Add onAnimationEnd listener

const useFlipAnimation = ({
  root,
  invert = invertDefault,
  play = playDefault,
  invertAndPlay = invertAndPlayDefault,
  debounceScrolling = 0,
  enable = false
}: IFlipProps) => {
  const origins = useRef({});
  const firstRun = useRef(true);
  const refresh = useState(true)[1];

  // ────────────────────────────────────────────────────────
  // Toggle animation on/off
  //
  useEffect(() => {
    firstRun.current = true;
    origins.current = {};
  }, [enable]);

  // ────────────────────────────────────────────────────────
  // Debounce window scroll listener
  // and set flag to recalculate starting items position
  //
  useEffect(() => {
    if (!enable) return;

    let debounced;
    if (debounceScrolling > 0) {
      debounced = debounce(() => {
        // On scroll we must recalculate items position
        firstRun.current = true;
        // Force re-render
        refresh(s => !s);
      }, debounceScrolling);

      window.addEventListener("scroll", debounced);
    }

    // eslint-disable-next-line consistent-return
    return () => debounced && window.removeEventListener("scroll", debounced);

    // eslint-disable-next-line
  }, [enable]);

  // ────────────────────────────────────────────────────────
  // Flip animation
  //  using sync layout effect to get elements
  //  position before rendering to the DOM
  useLayoutEffect(() => {
    if (!root.current || !enable) return;

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

      // Replace current position with next
      origins.current[child.dataset.key!] = next;
    }

    firstRun.current = false;
  }, [root, invert, play, invertAndPlay, enable]);
};

export default useFlipAnimation;
