//
// Use interval hook
//

import { useEffect, useRef } from "react";

const useInterval = (func: () => void, interval: number) => {
  const id = useRef(-1);
  useEffect(() => {
    if (interval <= 0) {
      if (id.current) clearInterval(id.current);
      return undefined;
    }
    id.current = Number(setInterval(func, interval));
    return () => {
      if (id.current) clearInterval(id.current);
    };
  }, [func, interval]);
};

export default useInterval;
