import { useRef, useEffect } from "react";

/**
 * Deep compare useEffect hook
 * @param effectFunc React useEffect hook
 * @param deps Dependency array
 */
const useDeepEffect = (
  effectFunc: Function,
  deps: Array<any>,
  cb?: Function
): void => {
  const isFirstRef = useRef(true);
  // const prevDeps = useRef(JSON.stringify(deps));
  const prevDeps = useRef(deps);

  useEffect(() => {
    // If on mount
    if (isFirstRef.current) {
      isFirstRef.current = false;
      effectFunc();
      return;
    }

    // If cb is a function
    if (cb && typeof cb === "function") {
      if (cb(prevDeps.current)) {
        prevDeps.current = deps;
        effectFunc();
      }
      return;
    }

    // Else do a deep copmare
    const depsStringified = JSON.stringify(deps);
    const prevDepsStringified = JSON.stringify(prevDeps.current);

    if (prevDepsStringified !== depsStringified) {
      prevDeps.current = deps;
      effectFunc();
    }
    // eslint-disable-next-line
  }, [deps]);
};

export default useDeepEffect;
