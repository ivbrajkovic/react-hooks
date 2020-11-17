import { useRef, useState, useEffect } from "react";

type Callback = (err: Error | null, data?: Object) => void;

interface IOptions {
  root: Element | null;
  rootMargin: string;
  thresholds: ReadonlyArray<number>;
}

interface IParams {
  elements: Array<Element>;
  options: IOptions | Callback;
  callback: (IntersectionObserverEntry) => void | undefined;
}

const defaultOptions: IOptions = {
  root: null,
  rootMargin: "-150px 0px -150px 0px",
  thresholds: [0],
};

// Handle intersection
const handleIntersect = (cb) => (entries) => {
  entries.forEach((entry) => cb && cb(entry));
};

// Create intersection observer
const createObserver = (elements, options, cb) => {
  const observer = new IntersectionObserver(handleIntersect(cb), options);
  elements.forEach((el) => observer.observe(el));

  return observer;
};

/**
 * Intersection observer
 * @param elements Array of HTMLElements to observe
 * @param cb Callback
 * @param options Intersection observer options
 */
function useIntersectionObserver({
  elements = [],
  options,
  callback,
}: IParams): {
  observer: IntersectionObserver | undefined;
  error: string;
} {
  const observer = useRef<IntersectionObserver>();
  const [error, setError] = useState("");

  const opt = { ...defaultOptions, ...options };

  useEffect(() => {
    if (!elements.length) return;
    if (error) setError("");

    try {
      observer.current = createObserver(elements, opt, callback);
    } catch (err) {
      setError(err.message);
    }

    // eslint-disable-next-line
    return () => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = undefined;
      }
    };
    // eslint-disable-next-line
  }, [elements]);

  return { observer: observer.current, error };
}

export default useIntersectionObserver;
