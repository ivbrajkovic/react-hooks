//
// Use Ripple Hook
//

import { CSSProperties, useEffect } from "react";

interface IOptions {
  styles: CSSProperties;
  keyframes: Keyframe[] | PropertyIndexedKeyframes | null;
  options?: number | KeyframeAnimationOptions;
}

// -----------------------------------------------------
// Default options
//
const defaultStyle: CSSProperties = {
  position: "absolute",
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.7)"
};
const defaultKeyframes: Keyframe[] = [
  { transform: "scale(0)" },
  { transform: "scale(4)", opacity: 0 }
];
const defaultOptions: KeyframeAnimationOptions = {
  duration: 1500,
  easing: "ease",
  fill: "forwards"
};
//
// -----------------------------------------------------

// -----------------------------------------------------
// Ripple animation
//
const handleClick = ({ styles, keyframes, options }: IOptions) => e => {
  const button = e.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  // eslint-disable-next-line no-multi-assign
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - (button.offsetLeft + radius)}px`;
  circle.style.top = `${e.clientY - (button.offsetTop + radius)}px`;

  // for (const [key, value] of Object.entries(styles)) circle.style[key] = value;
  // for (const key in Object.keys(styles)) circle.style[key] = styles[key];
  const keys = Object.keys(styles);
  for (let i = 0; i < keys.length; i++) circle.style[keys[i]] = styles[keys[i]];

  button.appendChild(circle);
  const animation = circle.animate(keyframes, options);
  animation.onfinish = () => circle.remove();
};
//
// -----------------------------------------------------

/**
 * Create ripple effect
 *
 * @param {HTMLCollection} nodes Collection of HTML elements
 * @param {object} opt Ripple effect options
 */
const useRippleEffect = (nodes: Array<Element>, opt: IOptions) => {
  useEffect(() => {
    const elements = [...nodes];
    const styles = { ...defaultStyle, ...opt?.styles };
    const keyframes = opt?.keyframes || defaultKeyframes;
    const options = { ...defaultOptions, ...(opt?.options as {}) };

    const handler = handleClick({ styles, keyframes, options });

    elements.forEach(element => {
      element.addEventListener("click", handler);
    });

    return () =>
      elements.forEach(element => {
        element.removeEventListener("click", handler);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes]);
};

export default useRippleEffect;
