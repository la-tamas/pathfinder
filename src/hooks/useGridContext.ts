import { useContext, useSyncExternalStore } from 'react'
import GridContext, { GridContextType} from '../context/GridContext'

const useGridContext = <T = GridContextType>(selector: (data: GridContextType) => T): Readonly<[T, (value: Partial<GridContextType>) => void]> => {
    const store = useContext(GridContext)

    const state = useSyncExternalStore(store.subscribe, () => 
        selector(store.get())
    )

    return [state, store.set] as const
}

export default useGridContext
