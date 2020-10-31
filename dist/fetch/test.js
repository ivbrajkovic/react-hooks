import { useEffect, useState } from "react";

const useTest = () => {
  const [state, setState] = useState();
  useEffect(() => {
    setState(999);
  }, []);
  return state;
};

export default useTest;
