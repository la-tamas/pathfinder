import { GridItemType, GridType, Position } from '../context/GridContext';
import { AbstractResolver, ReturnType } from './common/Abstract'


export class RandomDFS extends AbstractResolver {
    private static getRandomInt(max: number) {
        return Math.floor(Math.random() * max)
    }

    public static async search(grid: GridType, start: Position, end: Position, callback: (grid: GridType) => void, solve: (solution: GridItemType[]) => void): Promise<ReturnType> {
        const currentNode = grid[start.x][start.y]

        if (currentNode.visited) {
            return
        }

        currentNode.visited = true
        currentNode.closed = true

        const neighbors = RandomDFS.neighbors(grid, currentNode)

        if (neighbors.length > 0) {
            const index = RandomDFS.getRandomInt(neighbors.length - 1)

            if (neighbors[index].value === grid[end.x][end.y].value || neighbors[index].cost === grid[end.x][end.y].cost) {
                return
            }

            if (Math.random() < 0.4) {
                neighbors[index].value = 255
                neighbors[index].cost = 255
            }

            // for (let i = 0; i < neighbors.length; i++) {
            //     await RandomDFS.sync(grid, callback)
            //     await RandomDFS.search(grid, neighbors[i].position, end, callback, solve)
            // }

            await Promise.all(neighbors.map(async neighbor => {
                const nextPosition = neighbor.position
                if (neighbor.closed) {
                    return { grid, result: [] }
                }

                
                return await RandomDFS.search(grid, nextPosition, end, callback, solve)
            }))

            return { grid, result: [] }
        }

        return { grid, result: [] }
    }
}