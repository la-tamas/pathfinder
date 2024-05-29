interface DisjointSet<T = any> {
    add: (value: T) => DisjointSet<T>
    find: (value: T) => string | number
    connected: (a: T, b: T) => boolean
    union: (a: T, b: T) => DisjointSet<T>
    extract: () => Array<T>
    destroy: () => void
}

declare module 'disjoint-set' {
    function disjointSet<T>(): DisjointSet<T>
}