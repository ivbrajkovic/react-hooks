interface State {
    data: any;
    error: string;
    loading: boolean;
}
declare const useFetchJsonAbort: (url: string, options?: RequestInit) => [state: State, abort: Function];
export default useFetchJsonAbort;
