import { CSSProperties } from "react";
interface IOptions {
    styles: CSSProperties;
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null;
    options?: number | KeyframeAnimationOptions;
}
/**
 * Create ripple effect
 *
 * @param {HTMLCollection} nodes Collection of HTML elements
 * @param {object} opt Ripple effect options
 */
declare const useRippleEffect: (nodes: Array<Element>, opt: IOptions) => void;
export default useRippleEffect;
