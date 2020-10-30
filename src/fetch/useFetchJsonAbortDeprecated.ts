/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useReducer, useEffect, useRef, useCallback } from "react";

import { fetchJsonAsync } from "@ivbrajkovic/utils";

interface State {
  data: any;
  error: string;
  loading: boolean;
}

const TYPES = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_DATA: "SET_DATA",
};

const initialState: State = {
  data: {},
  error: "",
  loading: false,
};

const reducer = (
  state: State,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case TYPES.SET_LOADING:
      return { ...initialState, loading: true };

    case TYPES.SET_ERROR:
      return { ...initialState, error: payload };

    case TYPES.SET_DATA:
      return { ...initialState, data: payload };

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

const useFetchJsonAbort = (
  url: string,
  options = {}
): [state: State, abort: Function] => {
  const abortControllerRef = useRef();

  const [status, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    (async () => {
      try {
        dispatch({ type: TYPES.SET_LOADING });

        // Fetch json async with abort feature
        const data = await fetchJsonAsync(url, { ...options, signal });

        dispatch({ type: TYPES.SET_DATA, payload: data });
      } catch (error) {
        dispatch({ type: TYPES.SET_ERROR, payload: error.message });
      }
    })();

    return () => {
      if (abortControllerRef.current) abortControllerRef.current = null;
    };
  }, [url]);

  const abort = useCallback(() => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
  }, []);

  return [status, abort];
};

export default useFetchJsonAbort;
