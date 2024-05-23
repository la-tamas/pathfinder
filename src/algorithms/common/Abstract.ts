import Heap from 'heap';
import type { GridItemType, GridType, Position } from '../../context/GridContext'
import isWall from './isWall';

type ReturnType = {
    result: GridItemType[]
    grid: GridType
}

abstract class IAbstractResolver {
    init: (grid: GridType, callback: (grid: GridType) => void, solve: (solution: GridItemType[]) => void) => void
    heap: () => Heap<GridItemType>
    neighbors: (grid: GridType, node: GridItemType) => GridItemType[]
    search: (grid: GridType, start: Position, end: Position, callback: (grid: GridType) => void, solve: (solution: GridItemType[]) => void) => Promise<ReturnType>
    sync: (grid: GridType, callback: (grid: GridType) => void) => Promise<void>
}

export class AbstractResolver extends IAbstractResolver {
    protected static init(grid: GridType, callback: (grid: GridType) => void, solve: (solution: GridItemType[]) => void) {
        for(var x = 0; x < grid.length; x++) {
            for(var y = 0; y < grid[x].length; y++) {
                grid[x][y] = Object.assign({}, {
                    position: {
                        x: x,
                        y: y,
                    },
                    f: 0,
                    g: 0,
                    h: 0,
                    cost: grid[x][y].cost,
                    value: grid[x][y].value,
                    visited: false,
                    closed: false,
                    parent: null,
                })
            }  
        }

        solve([])
        return callback(grid)
    }

    protected static heap() {
        return new Heap<GridItemType>((node1, node2) => node1.f - node2.f)
    }

    protected static neighbors(grid: GridType, node: GridItemType) {
        const ret: GridItemType[] = []
        const x = node.position.x
        const y = node.position.y

        if (isWall(node)) {
            return []
        }

        if(grid[x-1] && grid[x-1][y] && !grid[x-1][y].visited && !grid[x-1][y].closed) {
            ret.push(grid[x-1][y])
        }

        if(grid[x+1] && grid[x+1][y] && !grid[x+1][y].visited && !grid[x+1][y].closed) {
            ret.push(grid[x+1][y])
        }

        if(grid[x] && grid[x][y-1] && !grid[x][y-1].visited && !grid[x][y-1].closed) {
            ret.push(grid[x][y-1])
        }

        if(grid[x] && grid[x][y+1] && !grid[x][y+1].visited && !grid[x][y+1].closed) {
            ret.push(grid[x][y+1])
        }

        return ret
    }

    protected static async sync(grid: GridType, callback: (grid: GridType) => void) {
        return new Promise<void>(resolve => {
            setTimeout(() => resolve(callback(grid)), 1)
        })
    }

    protected static async syncSolution(solution: GridItemType[], solve: (solution: GridItemType[]) => void) {
        return new Promise<void>(resolve => {
            setTimeout(() => resolve(solve(solution)), 1)
        })
    }
}