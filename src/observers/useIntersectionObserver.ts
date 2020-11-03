import { useRef, useState, useEffect } from "react";

interface Options {
  root: Element | null;
  rootMargin: string;
  thresholds: ReadonlyArray<number>;
}

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
 * @param cb Callabck
 * @param options Intersection observer options
 */
const useIntersectionObserver = (
  elements: Array<Element> = [],
  cb: (IntersectionObserverEntry) => void,
  options = defaultOptions
): { observer: IntersectionObserver; error: string } => {
  const observer = useRef();
  const [error, setError] = useState();

  useEffect(() => {
    if (error) setError();
    try {
      observer.current = createObserver(elements, options, cb);
    } catch (err) {
      setError(err.message);
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
    };
  }, [elements]);

  return { observer, error };
};

export default useIntersectionObserver;
