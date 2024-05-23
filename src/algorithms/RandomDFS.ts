import { GridItemType, GridType, Position } from '../context/GridContext';
import { AbstractResolver } from './common/Abstract'


export class RandomDFS extends AbstractResolver {
    private static getRandomInt(max: number) {
        return Math.floor(Math.random() * max)
    }

    public static async search(grid: GridType, start: Position, end: Position, callback: (grid: GridType) => void, solve: (solution: GridItemType[]) => void) {
        const currentNode = grid[start.x][start.y]

        if (currentNode.visited) {
            return
        }

        currentNode.visited = true

        const neighbors = RandomDFS.neighbors(grid, currentNode)

        if (neighbors.length > 0) {
            const index = RandomDFS.getRandomInt(neighbors.length - 1)

            if (Math.random() > 0.5) {
                return await Promise.all(neighbors.map(async neighbor => {
                    const nextPosition = neighbor.position
                    await RandomDFS.sync(grid, callback)
                    await RandomDFS.search(grid, nextPosition, end, callback, solve)
                }))
            }

            if (neighbors[index].value === grid[end.x][end.y].value || neighbors[index].cost === grid[end.x][end.y].cost) {
                return;
            }

            neighbors[index].value = 255
            neighbors[index].cost = 255
        }

        await Promise.all(neighbors.map(async neighbor => {
            const nextPosition = neighbor.position
            await RandomDFS.sync(grid, callback)
            await RandomDFS.search(grid, nextPosition, end, callback, solve)
        }))
    }
}