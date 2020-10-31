"use strict";
/* eslint-disable  @typescript-eslint/no-explicit-any */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utils_1 = require("@ivbrajkovic/utils");
var TYPES = {
    SET_LOADING: "SET_LOADING",
    SET_ERROR: "SET_ERROR",
    SET_DATA: "SET_DATA",
};
var initialState = {
    data: null,
    error: "",
    loading: false,
};
var reducer = function (state, _a) {
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case TYPES.SET_LOADING:
            return __assign(__assign({}, initialState), { loading: true });
        case TYPES.SET_ERROR:
            return __assign(__assign({}, initialState), { error: payload });
        case TYPES.SET_DATA:
            return __assign(__assign({}, initialState), { data: payload });
        default:
            throw new Error("Unhandled action type: " + type);
    }
};
var useFetchJsonAbort = function (url, options) {
    if (options === void 0) { options = {}; }
    var abortRef = react_1.useRef();
    var _a = react_1.useReducer(reducer, initialState), state = _a[0], dispatch = _a[1];
    react_1.useEffect(function () {
        dispatch({ type: TYPES.SET_LOADING });
        // Fetch json async with abort feature
        var abort = utils_1.fetchJsonAbortCb(url, options, function (err, data) {
            if (err)
                dispatch({ type: TYPES.SET_ERROR, payload: err.message });
            else
                dispatch({ type: TYPES.SET_DATA, payload: data });
        });
        abortRef.current = abort;
        return function () {
            if (abortRef.current)
                abortRef.current = null;
        };
    }, [url]);
    var abort = react_1.useCallback(function () {
        if (abortRef.current)
            abortRef.current();
    }, []);
    return [state, abort];
};
exports.default = useFetchJsonAbort;
