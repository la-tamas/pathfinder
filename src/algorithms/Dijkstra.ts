import { GridItemType, GridType, Position } from '../context/GridContext';
import { AbstractResolver } from './common/Abstract';
import isWall from './common/isWall';

export class Dijkstra extends AbstractResolver {
    public static async search(grid: GridType, start: Position, end: Position, callback: (grid: GridType) => void, solve: (solution: GridItemType[]) => void) {
        Dijkstra.init(grid, callback, solve)
        const heap = Dijkstra.heap();

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
                        await Dijkstra.syncSolution(ret.slice(0, i), solve)
                    }

                    return { 
                        result: ret,
                        grid: grid
                    };
                }

                currentNode.closed = true;

                const neighbors = Dijkstra.neighbors(grid, currentNode, true);

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
                        neighbor.g = gScore;
                        neighbor.f = neighbor.g;

                        if (!beenVisited) {
                            heap.push(neighbor);
                        }
                        else {
                            heap.updateItem(neighbor)
                        }

                        await Dijkstra.sync(grid, callback)
                    }
                }
        }

        return { 
            result: [],
            grid: grid
        }
    }
}