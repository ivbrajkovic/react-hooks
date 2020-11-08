/**
 * Deep compare useEffect hook
 * @param effectFunc React useEffect hook
 * @param deps Dependency array
 */
declare const useDeepEffect: (effectFunc: Function, deps: Array<any>, cb?: Function | undefined) => void;
export default useDeepEffect;
