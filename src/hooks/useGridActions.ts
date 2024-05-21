import { useCallback } from 'react'
import useGridContext from './useGridContext'
import { AlgorithmTypes, GridItemType, GridType, Position } from '../context/GridContext'
import { algorithms } from '../algorithms'

const useGridActions = () => {
    const [context, setContext] = useGridContext((context) => context)

    const createGrid = useCallback((rows: number, cols: number) => {
        const grid = Array.from(Array(rows), () => new Array<GridItemType>(cols));
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j] = {
                    position: {
                        x: i,
                        y: j
                    },
                    cost: 1,
                    solution: false,
                    value: 0,
                    visited: false,
                    closed: false,
                    f: 0,
                    h: 0
                }
            }
        }

        const startingPoint: Position = {
            x: 1,
            y: 1
        }

        const endPoint: Position = {
            x: grid.length - 2,
            y: grid[0].length - 2,
        }

        grid[startingPoint.x][startingPoint.y].cost = 2
        grid[startingPoint.x][startingPoint.y].value = 2

        grid[endPoint.x][endPoint.y].cost = -1
        grid[endPoint.x][endPoint.y].value = -1
        
        setContext({
            grid,
            isModalVisible: false,
            startingPoint,
            endPoint,
            solution: []
        })
    }, [setContext])

    const setGridWall = useCallback((position: Position) => {
        const { x, y } = position
        const { grid } = context

        if (grid[x][y].cost === 255) {
            grid[x][y].cost = 1
            grid[x][y].value = 1
        } else {
            grid[x][y].cost = 255
            grid[x][y].value = 255
        }

        setContext({
            grid,
        })
    }, [setContext])

    const setGridWallConstant = useCallback((position: Position) => {
        const { x, y } = position
        const { grid } = context

        grid[x][y].cost = 255
        grid[x][y].value = 255

        setContext({
            grid,
        })
    }, [setContext])

    const setStartPoint = useCallback((position: Position) => {
        const { x, y } = position
        const { grid, startingPoint } = context

        if (grid[x][y].cost === 255 || grid[x][y].cost === -1) {
            return
        }
        if (grid[x][y].value === 255 || grid[x][y].value === -1) {
            return
        }

        grid[startingPoint.x][startingPoint.y].cost = 1;
        grid[startingPoint.x][startingPoint.y].value = 1;
        startingPoint.x = x
        startingPoint.y = y
        grid[x][y].cost = 2
        grid[x][y].value = 2

        setContext({
            startingPoint,
            grid,
        })
    }, [setContext])

    const setEndPoint = useCallback((position: Position) => {
        const { x, y } = position;
        const { grid, endPoint } = context

        if (grid[x][y].cost === 255 || grid[x][y].cost === 2) {
            return
        }
        if (grid[x][y].value === 255 || grid[x][y].value === 2) {
            return
        }

        grid[endPoint.x][endPoint.y].cost = 1;
        grid[endPoint.x][endPoint.y].value = 1;
        endPoint.x = x;
        endPoint.y = y;
        grid[x][y].cost = -1;
        grid[x][y].value = -1;

        setContext({
            endPoint,
            grid,
        })
    }, [setContext])

    const setGrid = useCallback((grid: GridType) => {
        setContext({
            grid
        })
    }, [setContext])

    const resolve = useCallback((algorithm: AlgorithmTypes) => {
        const { grid: initialGrid, startingPoint, endPoint } = context
        const { result, grid } = algorithms[algorithm].search(initialGrid, startingPoint, endPoint, setGrid)

        setContext({
            solution: result,
            grid
        })
    }, [context, setContext, setGrid])

    return {
        setGrid,
        createGrid,
        setGridWall,
        setGridWallConstant,
        setStartPoint,
        setEndPoint,
        resolve
    }
}

export default useGridActions
