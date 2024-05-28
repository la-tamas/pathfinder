import { GridType, Position, GridItemType } from '../context/GridContext';
import { AbstractResolver } from './common/Abstract'

export class DFS extends AbstractResolver {
    public static async search(grid: GridType, start: Position, end: Position, callback: (grid: GridType) => void, solve: (solution: GridItemType[]) => void) {
        DFS.init(grid, callback, solve);

        const heap = DFS.heap();

        heap.push(grid[start.x][start.y])

        while (heap.size() > 0) {
            const currentNode = heap.pop();

            if (currentNode.position.x === end.x && currentNode.position.y === end.y) {
                let curr = currentNode;
                const ret: GridItemType[] = [];
                while(curr.parent) {
                    ret.push(curr);
                    curr = curr.parent;
                }
    
                console.log(ret);
    
                ret.reverse()
                for (let i = 0; i < ret.length; i++) {
                    await DFS.syncSolution(ret.slice(0, i), solve)
                }
    
                return { grid, result: ret }
            }

            await DFS.sync(grid, callback);

            const neighbors = DFS.neighbors(grid, currentNode, true);

            for (let i = 0; i < neighbors.length; i++) {
                const neighbor = neighbors[i];
                currentNode.visited = true;
                neighbor.parent = currentNode;

                if (!neighbor.visited) {
                    heap.push(neighbor)
                }
            }
        }

        return { grid, result: [] }
    }
}