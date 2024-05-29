import { GridType, Position, GridItemType } from '../context/GridContext'
import { AbstractResolver } from './common/Abstract'
import disjointSet from 'disjoint-set'

export class Kruskal extends AbstractResolver {
    private static initialize(grid: GridType, start: Position, end: Position, callback: (grid: GridType) => void) {
        const set = disjointSet<GridItemType>()

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j].position.x === start.x && grid[i][j].position.y === start.y) {
                    continue
                }
    
                if (grid[i][j].position.x === end.x && grid[i][j].position.y === end.y) {
                    continue
                }

                grid[i][j].cost = 255
                grid[i][j].value = 255
                set.add(grid[i][j])
            }
        }

        Kruskal.sync(grid, callback)

        return set
    }

    public static async search(grid: GridType, start: Position, end: Position, callback: (grid: GridType) => void, solve: (solution: GridItemType[]) => void) {
        Kruskal.init(grid, callback, solve)

        const set = this.initialize(grid, start, end, callback)
        const heap = this.heap()

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                heap.push(grid[i][j])
            }
        }

        while (heap.size() > 0) {
            const currentNode = heap.pop()
            currentNode.visited = true

            if (!currentNode) {
                continue
            }

            if (currentNode.position.x === start.x && currentNode.position.y === start.y) {
                continue
            }

            if (currentNode.position.x === end.x && currentNode.position.y === end.y) {
                continue
            }

            const neighbors = Kruskal.neighbors(grid, currentNode)

            for (let i = 0; i < neighbors.length; i++) {
                if (set.find(currentNode) !== set.find(neighbors[i])) {
                    if (neighbors[i].position.x === start.x && neighbors[i].position.y === start.y) {
                        continue
                    }

                    if (neighbors[i].position.x === end.x && neighbors[i].position.y === end.y) {
                        continue
                    }

                    if (Math.random() < 0.5) {
                        continue
                    }

                    neighbors[i].value = 1
                    neighbors[i].cost = 1
                    set.union(currentNode, neighbors[i])
                }
                
                await Kruskal.sync(grid, callback)
            }
        }

        return { grid, result: [] }
    }
}