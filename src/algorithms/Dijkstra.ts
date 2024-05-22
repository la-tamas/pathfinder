import { GridItemType, GridType, Position } from '../context/GridContext';
import { AbstractResolver } from './common/Abstract';
import isWall from './common/isWall';

export class Dijkstra extends AbstractResolver {
    public static async search(grid: GridType, start: Position, end: Position, callback: (grid: GridType) => void, solve: (solution: GridItemType[]) => void) {
        Dijkstra.init(grid, callback, solve)
        const heap = Dijkstra.heap();

        heap.push(grid[start.x][start.y]);

        while(heap.size() > 0) {
                var currentNode = heap.pop();

                if(currentNode.position.x === end.x && currentNode.position.y === end.y) {
                    var curr = currentNode;
                    var ret: GridItemType[] = [];
                    while(curr.parent) {
                        ret.push(curr);
                        curr = curr.parent;
                    }

                    ret.reverse()
                    for (let i = 0; i < ret.length; i++) {
                        Dijkstra.syncSolution(ret.slice(0, i), solve)
                    }
                    
                    return { 
                        result: ret,
                        grid: grid
                    };
                }

                currentNode.closed = true;

                var neighbors = Dijkstra.neighbors(grid, currentNode);

                for(let i = 0, il = neighbors.length; i < il; i++) {
                    var neighbor = neighbors[i];

                    if(neighbor.closed || isWall(neighbor)) {
                        continue;
                    }

                    var gScore = currentNode.g + neighbor.cost;
                    var beenVisited = neighbor.visited;

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