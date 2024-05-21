import { GridItemType, GridType, Position } from '../context/GridContext';
import isWall from './common/isWall';
import Heap from 'heap'

export const AStar = {
    _init: function(grid: GridType) {
        for(var x = 0; x < grid.length; x++) {
            for(var y = 0; y < grid[x].length; y++) {
                grid[x][y] = Object.assign({}, {
                    position: {
                        x: x,
                        y: y,
                    },
                    f: 0,
                    g: undefined,
                    h: undefined,
                    cost: grid[x][y].cost,
                    value: grid[x][y].value,
                    visited: false,
                    closed: false,
                    parent: null,
                });
            }  
        }
    },
    heap: function() {
        return new Heap<GridItemType>((node1, node2) => node1.f - node2.f);
    },
    search: (grid: GridType, start: Position, end: Position) => {
        const heuristic = AStar.manhattan;

        var openHeap = AStar.heap();

        openHeap.push(grid[start.x][start.y]);

        while(openHeap.size() > 0) {
            var currentNode = openHeap.pop();

            if(currentNode.position.x === end.x && currentNode.position.y === end.y) {
                var curr = currentNode;
                var ret: GridItemType[] = [];
                while(curr.parent) {
                    ret.push(curr);
                    curr = curr.parent;
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
                        openHeap.push(neighbor);
                    }
                    else {
                        openHeap.updateItem(neighbor)
                    }
                }
            }
        }

        return { 
            result: [],
            grid: grid
        };
    },
    manhattan: (pos0: Position, pos1: Position) => {
        var d1 = Math.abs(pos1.x - pos0.x);
        var d2 = Math.abs(pos1.y - pos0.y);
        return d1 + d2;
    },
    neighbors: function(grid: GridType, node: GridItemType) {
        var ret: GridItemType[] = [];
        var x = node.position.x;
        var y = node.position.y;

        if(grid[x-1] && grid[x-1][y]) {
            ret.push(grid[x-1][y]);
        }

        if(grid[x+1] && grid[x+1][y]) {
            ret.push(grid[x+1][y]);
        }

        if(grid[x] && grid[x][y-1]) {
            ret.push(grid[x][y-1]);
        }

        if(grid[x] && grid[x][y+1]) {
            ret.push(grid[x][y+1]);
        }
        return ret;
    }
}