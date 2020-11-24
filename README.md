# React Hooks

Collection of React hooks ES2015 compatibile

## Hooks list

```js
useFetchJsonAbort; // Fetch JSON response
useFetchJsonAbortDeprecated; // Fetch JSON response
useIntersectionObserver; // Intersection observer
useDeepEffect; // Deep compare useEffect hook
useFlipAnimation; // FLIP animation hook
useRippleEffect; // Ripple effect hook
```

### useDeepEffect example

```js
import React, { useEffect, useState } from "react";
import { useDeepEffect } from "@ivbrajkovic/react-hooks";

const Child = ({ data }) => {
  useEffect(() => {
    // Print on every render
    console.log("Something changed!");
  }, [data]);
  return null;
};

const DeepChild = ({ data }) => {
  useDeepEffect(() => {
    // Print only when data object change
    console.log("Name or lastname changed!");
  }, [data]);
  return null;
};

const PropertyChild = ({ data }) => {
  useDeepEffect(
    () => {
      // Print only when lastname property of data object change
      console.log("Lastname changed!");
    },
    [data],
    state => state[0].lastName !== data.lastName
  );
  return null;
};

const Index = () => {
  const [count, setCount] = useState(0);
  const [fisrtName, setFisrtName] = useState("name");
  const [lastName, setlastName] = useState("lastname");

  const changeNameHandler = () =>
    setFisrtName("Changed " + Math.random().toFixed(2));
  const changeLastnameHandler = () =>
    setlastName("Changed " + Math.random().toFixed(2));

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCount(state => state + 1);
    }, 1000);
    return () => {
      intervalID && clearInterval(intervalID);
    };
  }, []);

  return (
    <>
      <button onClick={changeNameHandler}>Change name</button>
      <br></br>
      <button onClick={changeLastnameHandler}>Change lastname</button>
      <div>Name: {fisrtName}</div>
      <div>Lastname: {lastName}</div>
      <div>count: {count}</div>
      <Child data={{ fisrtName, lastName }} count={count} />
      <DeepChild data={{ fisrtName, lastName }} count={count} />
      <PropertyChild data={{ fisrtName, lastName }} count={count} />
    </>
  );
};
export default Index;
```

## TODO

1. Add terser script to minify js :heavy_check_mark:
2. Add more hooks :blush:
