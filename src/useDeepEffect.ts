import { useRef, useEffect } from "react";

const useDeepEffect = (effectFunc: Function, deps: Array<any>): void => {
  const isFirstRef = useRef(true);
  const prevDeps = useRef(JSON.stringify(deps));

  useEffect(() => {
    if (isFirstRef) {
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
