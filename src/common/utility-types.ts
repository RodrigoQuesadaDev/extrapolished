export type MapProps<T, V> = {
    [P in keyof T]: V
};
