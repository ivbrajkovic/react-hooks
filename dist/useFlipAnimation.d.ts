/// <reference types="react" />
interface DeltaRect {
    top: number;
    left: number;
    width: number;
    height: number;
}
interface IFlipProps {
    root: React.MutableRefObject<HTMLElement>;
    invert: typeof CallbackFunc;
    play: typeof CallbackFunc;
    invertAndPlay?: typeof CallbackFunc;
    debounceScrolling?: number;
    enable?: boolean;
}
interface ICallbackProps {
    delta: DeltaRect;
    elem: HTMLElement;
    previous: DOMRect;
    next: DOMRect;
}
declare function CallbackFunc({ delta, elem, previous, next }: ICallbackProps): void;
declare const useFlipAnimation: ({ root, invert, play, invertAndPlay, debounceScrolling, enable }: IFlipProps) => void;
export default useFlipAnimation;
