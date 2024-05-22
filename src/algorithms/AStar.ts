import { GridItemType, GridType, Position } from '../context/GridContext';
import { AbstractResolver } from './common/Abstract';
import isWall from './common/isWall';

export class AStar extends AbstractResolver {
    private static manhattan(pos0: Position, pos1: Position) {
        var d1 = Math.abs(pos1.x - pos0.x);
        var d2 = Math.abs(pos1.y - pos0.y);
        return d1 + d2;
    }

    public static async search(grid: GridType, start: Position, end: Position, callback: (grid: GridType) => void, solve: (solution: GridItemType[]) => void) {
        AStar.init(grid, callback, solve)
        const heuristic = AStar.manhattan;

        var heap = AStar.heap();

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
                    AStar.syncSolution(ret.slice(0, i), solve)
                }

                return { 
                    result: ret.reverse(), 
                    grid: grid
                };
            }

            currentNode.closed = true;

            var neighbors = AStar.neighbors(grid, currentNode);

            for(var i = 0, il = neighbors.length; i < il; i++) {
                var neighbor = neighbors[i];

                if(neighbor.closed || isWall(neighbor)) {
                    continue;
                }

                var gScore = currentNode.g + neighbor.cost;
                var beenVisited = neighbor.visited;

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