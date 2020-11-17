import { useRef, useState, useEffect } from "react";

interface Options {
  root: Element | null;
  rootMargin: string;
  thresholds: ReadonlyArray<number>;
}

type Callback = (err: Error | null, data?: Object) => void;

const defaultOptions: Options = {
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
function useIntersectionObserver(
  elements: Array<Element> = [],
  options: Options | Callback,
  cb: (IntersectionObserverEntry) => void | undefined
): { observer: IntersectionObserver | undefined; error: string } {
  const opt =
    typeof options === "function"
      ? defaultOptions
      : { ...defaultOptions, ...options };

  const observer = useRef<IntersectionObserver>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) setError("");
    try {
      observer.current = createObserver(elements, opt, cb);
    } catch (err) {
      setError(err.message);
    }
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
