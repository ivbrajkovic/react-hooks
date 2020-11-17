interface Options {
    root: Element | null;
    rootMargin: string;
    thresholds: ReadonlyArray<number>;
}
declare type Callback = (err: Error | null, data?: Object) => void;
/**
 * Intersection observer
 * @param elements Array of HTMLElements to observe
 * @param cb Callback
 * @param options Intersection observer options
 */
declare function useIntersectionObserver(elements: Element[] | undefined, options: Options | Callback, cb: (IntersectionObserverEntry: any) => void | undefined): {
    observer: IntersectionObserver | undefined;
    error: string;
};
export default useIntersectionObserver;
