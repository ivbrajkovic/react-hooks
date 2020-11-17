declare type Callback = (err: Error | null, data?: Object) => void;
interface IOptions {
    root: Element | null;
    rootMargin: string;
    thresholds: ReadonlyArray<number>;
}
interface IParams {
    elements: Array<Element>;
    options: IOptions | Callback;
    callback: (IntersectionObserverEntry: any) => void | undefined;
}
/**
 * Intersection observer
 * @param elements Array of HTMLElements to observe
 * @param cb Callback
 * @param options Intersection observer options
 */
declare function useIntersectionObserver({ elements, options, callback, }: IParams): {
    observer: IntersectionObserver | undefined;
    error: string;
};
export default useIntersectionObserver;
