import { useState, useCallback } from "react";

import isEqual from "lodash/isEqual";

type Equality = boolean | Array<string>;
type EqualityFnc<S extends object, T extends Equality> = (
  newState: S,
  equality?: T
) => void;

function useState2<S extends object, T extends Equality>(
  initialState: S | (() => S)
): [S, EqualityFnc<S, T>] {
  const [state, setState] = useState(initialState);
  const setState2 = useCallback((newState: S, equality?: T) => {
    if (equality) {
      if (typeof equality === "boolean") {
        setState((oldState) => {
          // If true than deep compare objects
          if (isEqual(oldState, newState)) return oldState;
          return newState;
        });
      } else if (Array.isArray(equality)) {
        setState((oldState) => {
          // If array than deep compare selected attributes
          for (let i = 0; i < equality.length; i++) {
            const key = equality[i];
            if (!isEqual(oldState[key], newState[key])) return newState;
          }
          return oldState;
        });
      }
    } else if (typeof newState === "function") setState(newState);
    else if (typeof newState === "object")
      // If new state is object than merge objects
      setState((oldState) => ({ ...oldState, ...newState }));
    else setState(newState);
  }, []);

  return [state, setState2];
}

export default useState2;
