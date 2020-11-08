import { useRef, useEffect } from "react";

/**
 * Deep compare useEffect hook
 * @param effectFunc React useEffect hook
 * @param deps Dependency array
 */
const useDeepEffect = (effectFunc: Function, deps: Array<any>): void => {
  const isFirstRef = useRef(true);
  const prevDeps = useRef(JSON.stringify(deps));

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      effectFunc();
      return;
    }

    const depsStringified = JSON.stringify(deps);

    if (!(prevDeps.current === depsStringified)) {
      prevDeps.current = depsStringified;
      effectFunc();
    }
  }, [deps]);
};

export default useDeepEffect;
