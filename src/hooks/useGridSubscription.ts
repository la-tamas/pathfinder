import { useCallback, useRef } from 'react'
import deepmerge from 'deepmerge'
import { CallbackType, GridContextType } from '../context/GridContext'

const useGridSubscription = () => {
    const store = useRef<GridContextType>({} as GridContextType)

    const get = useCallback(() => store.current, [])

    const subscribers = useRef(new Set<CallbackType>())

    const set = useCallback((value: Partial<GridContextType>) => {
        store.current = deepmerge(store.current, value, {
            clone: false,
            arrayMerge: (_, source) => source
        })

        return subscribers.current.forEach(callback => callback && callback())
    }, [])

    const subscribe = useCallback((callback: CallbackType) => {
        subscribers.current.add(callback)
        return () => subscribers.current.delete(callback)
    }, [])

    return { get, set, subscribe }
}

export default useGridSubscription
