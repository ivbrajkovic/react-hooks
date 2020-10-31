// import { useEffect, useState } from "react";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");

const useTest = () => {
  const [state, setState] = react_1.useState();
  react_1.useEffect(() => {
    setState(999);
  }, []);
  return state;
};

module.exports = useTest;
