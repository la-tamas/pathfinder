import { GridItemType, GridType, Position } from '../context/GridContext';
import { AbstractResolver } from './common/Abstract';
import isWall from './common/isWall';

export class AStar extends AbstractResolver {
    private static manhattan(pos0: Position, pos1: Position) {
        const d1 = Math.abs(pos1.x - pos0.x);
        const d2 = Math.abs(pos1.y - pos0.y);
        return d1 + d2;
    }

    public static async search(grid: GridType, start: Position, end: Position, callback: (grid: GridType) => void, solve: (solution: GridItemType[]) => void) {
        AStar.init(grid, callback, solve)
        const heuristic = AStar.manhattan;

        const heap = AStar.heap();

        heap.push(grid[start.x][start.y]);

        while(heap.size() > 0) {
            const currentNode = heap.pop();

            if(currentNode.position.x === end.x && currentNode.position.y === end.y) {
                let curr = currentNode;
                const ret: GridItemType[] = [];
                while(curr.parent) {
                    ret.push(curr);
                    curr = curr.parent;
                }

                ret.reverse()
                for (let i = 0; i < ret.length; i++) {
                    await AStar.syncSolution(ret.slice(0, i), solve)
                }

                return { 
                    result: ret,
                    grid: grid
                };
            }

            currentNode.closed = true;

            const neighbors = AStar.neighbors(grid, currentNode, true);

            for(let i = 0, il = neighbors.length; i < il; i++) {
                const neighbor = neighbors[i];

                if(neighbor.closed || isWall(neighbor)) {
                    continue;
                }

                const gScore = currentNode.g + neighbor.cost;
                const beenVisited = neighbor.visited;

                if(!beenVisited || gScore < neighbor.g) {
                    neighbor.visited = true;
                    neighbor.parent = currentNode;
                    neighbor.h = neighbor.h || heuristic(neighbor.position, end);
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;

                    if (!beenVisited) {
                        heap.push(neighbor);
                    }
                    else {
                        heap.updateItem(neighbor)
                    }

                    await AStar.sync(grid, callback)
                }
            }
        }

        return { 
            result: [],
            grid: grid
        };
    }
}