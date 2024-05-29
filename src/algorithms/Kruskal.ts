import Heap from 'heap'
import { GridType, Position, GridItemType } from '../context/GridContext'
import { AbstractResolver, Direction } from './common/Abstract'
import disjointSet from 'disjoint-set'

export class Kruskal extends AbstractResolver {
    private static initialize(grid: GridType, heap: Heap<GridItemType>, start: Position, end: Position, callback: (grid: GridType) => void) {
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

    private static addToHeap(grid: GridType, heap: Heap<GridItemType>, steps = [5, 10], direction: Direction = 'horizontal') {
        if (direction === 'horizontal') {
            for (let i = 0; i < grid[0].length; i++) {
                steps.map(step => heap.push(grid[step][i]))
            }
        } else {
            for (let i = 0; i < grid.length; i++) {
                steps.map(step => heap.push(grid[i][step]))
            }
        }
    
    }

    public static async search(grid: GridType, start: Position, end: Position, callback: (grid: GridType) => void, solve: (solution: GridItemType[]) => void) {
        Kruskal.init(grid, callback, solve)

        const heap = this.heap()
        const set = this.initialize(grid, heap, start, end, callback)

        heap.push(grid[start.x][start.y])
        heap.push(grid[end.x][end.y])

        while (heap.size() > 0) {
            const currentNode = heap.pop()

            if (!currentNode || currentNode.visited) {
                continue
            }

            currentNode.visited = true
            const neighbors = Kruskal.neighbors(grid, currentNode, false)

            if (currentNode.position.x === start.x && currentNode.position.y === start.y) {
                neighbors.map(neighbor => heap.push(neighbor))
                continue
            }

            if (currentNode.position.x === end.x && currentNode.position.y === end.y) {
                neighbors.map(neighbor => heap.push(neighbor))
                continue
            }

            const isDivided = Kruskal.isWall(currentNode) && neighbors.some(
                neighbor => neighbors
                    .filter(n => n !== neighbor)
                    .some(n => set.find(n) !== set.find(neighbor))
            )

            if (isDivided) {
                currentNode.value = 1
                currentNode.cost = 1
                set.union(currentNode, neighbors[Math.floor(Math.random() * (neighbors.length - 1))])
            }

            neighbors.map(neighbor => heap.push(neighbor))
                
            await Kruskal.sync(grid, callback)
        }

        return { grid, result: [] }
    }
}