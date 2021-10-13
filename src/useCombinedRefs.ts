import { useRef, useEffect, MutableRefObject } from 'react';

function useCombinedRefs<T = undefined>(
  ...refs: MutableRefObject<T | undefined>[]
): MutableRefObject<T | undefined> {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach(
      (ref: MutableRefObject<T | undefined> | ((param: any) => void)) => {
        if (!ref) return;

        if (typeof ref === 'function') ref(targetRef.current);
        // eslint-disable-next-line no-param-reassign
        else ref.current = targetRef.current;
      }
    );
  }, [refs]);

  return targetRef;
}

export default useCombinedRefs;
