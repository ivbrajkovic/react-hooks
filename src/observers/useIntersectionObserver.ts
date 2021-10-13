import { useRef, useState, useEffect } from "react";

interface IOptions {
  root: Element | null;
  rootMargin: string;
  thresholds: ReadonlyArray<number>;
}

interface IParams {
  elements: Array<Element>;
  options: IOptions | IntersectionObserverCallback;
  callback: IntersectionObserverCallback;
}

const defaultOptions: IOptions = {
  root: null,
  rootMargin: "-150px 0px -150px 0px",
  thresholds: [0],
};

// Handle intersection
const handleIntersect =
  (cb) =>
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => cb && cb(entry, observer));
  };

// Create intersection observer
const createObserver = (
  elements: Element[],
  options: IntersectionObserverInit,
  cb: IntersectionObserverCallback
) => {
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
    } catch (err: any) {
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
