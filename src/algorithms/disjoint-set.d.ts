declare module 'disjoint-set' {
    interface DisjointSet<T = any> {
        add: (value: T) => DisjointSet<T>
        find: (value: T) => string | number
        connected: (a: T, b: T) => boolean
        union: (a: T, b: T) => DisjointSet<T>
        extract: () => Array<T>
        destroy: () => void
    }

    export { DisjointSet }
    export default function disjointSet<T>(): DisjointSet<T>
}