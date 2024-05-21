import useGridContext from './useGridContext'
import type { GridType } from '../context/GridContext'

const useGrid = <T = GridType>(selector: (grid: GridType) => T): Readonly<T> => {
    const [grid] = useGridContext((data) => selector(data.grid))

    return grid
}

export default useGrid
