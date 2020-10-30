/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useReducer, useEffect, useRef, useCallback } from "react";

import { fetchJsonAbortCb } from "@ivbrajkovic/utils";

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
): [status: any, abort: Function] => {
  const abortRef = useRef();

  const [status, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: TYPES.SET_LOADING });

    // Fetch json async with abort feature
    const abort = fetchJsonAbortCb(url, options, (err, data) => {
      if (err) dispatch({ type: TYPES.SET_ERROR, payload: err.message });
      else dispatch({ type: TYPES.SET_DATA, payload: data });
    });
    abortRef.current = abort;

    return () => {
      if (abortRef.current) abortRef.current = null;
    };
  }, [url]);

  const abort: Function = useCallback(
    () => abortRef.current && abortRef.current(),
    []
  );

  return [status, abort];
};

export default useFetchJsonAbort;
