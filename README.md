# React Hooks

Collection of React hooks ES2015 compatibile

## Hooks list

```js
useFetchJsonAbort; // Fetch JSON response
useFetchJsonAbortDeprecated; // Fetch JSON response
useIntersectionObserver; // Intersection observer
useDeepEffect; // Deep compare useEffect hook
```

### useDeepEffect example

```js
import React, { useEffect, useState } from "react";
import { useDeepEffect } from "@ivbrajkovic/react-hooks";

const Child = ({ data, count }) => {
  useEffect(() => {
    console.log("Child: Data changed!"); // Print on every render
  }, [data]);

  return null;
};

const DeepChild = ({ data, count }) => {
  useDeepEffect(() => {
    console.log("DeepChild: Data changed!"); // Print only when data change
  }, [data]);

  return null;
};

const Index = () => {
  const [count, setCount] = useState(0);
  const [fisrtName, setFisrtName] = useState("Name");
  const [lastName, setlastName] = useState("Lastname");

  const changeNameHandler = () =>
    setFisrtName("Changed" + Math.random().toFixed(2));

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCount((state) => state + 1);
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <>
      <button onClick={changeNameHandler}>Change name</button>
      <div>count: {count}</div>
      <Child data={{ fisrtName, lastName }} count={count} />
      <DeepChild data={{ fisrtName, lastName }} count={count} />
    </>
  );
};

export default Index;
```

## TODO

1. Add terser script to minify js :heavy_check_mark:
2. Add more hooks :blush:
