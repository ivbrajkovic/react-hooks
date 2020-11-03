interface Options {
    root: Element | null;
    rootMargin: string;
    thresholds: ReadonlyArray<number>;
}
/**
 *
 * @param elements Array of HTMLElements to observe
 * @param cb Callabck
 * @param options Intersection observer options
 */
declare const useIntersectionObserver: (elements: Element[] | undefined, cb: (IntersectionObserverEntry: any) => void, options?: Options) => {
    observer: IntersectionObserver;
    error: string;
};
export default useIntersectionObserver;
