export const scrollTo = (
  { element = document.body, left = 0, top = 0, duration = 500 } = {},
  callback
) => {
  const move = (left, top) => {
    element.scrollLeft = left;
    element.scrollTop = top;
  };

  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const position = () => ({ left: element.scrollLeft, top: element.scrollTop });
  duration = typeof duration === "number" ? duration : 500;
  const increment = 1000 / 60;
  const animationFrameReqFunc =
    window.requestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, increment);
    };

  let currentTime = 0;
  let animationFrame;
  const start = { left: position().left, top: position().top };
  const change = { left: left - start.left, top: top - start.top };

  const anim = () => {
    currentTime += increment;
    element.style.scrollSnapType = "none";
    const left = Math.round(
      ease(currentTime, start.left, change.left, duration)
    );
    const top = Math.round(ease(currentTime, start.top, change.top, duration));
    move(left, top);
    if (currentTime < duration) animationFrame = animationFrameReqFunc(anim);
    else {
      cancelAnimationFrame(animationFrame);
      element.removeAttribute("style");
      if (callback && typeof callback === "function") callback();
    }
  };

  anim();
};
