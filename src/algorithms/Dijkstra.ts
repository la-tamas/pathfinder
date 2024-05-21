import { GridItemType, GridType, Position } from '../context/GridContext';
import isWall from './common/isWall';
import Heap from 'heap'

export const Dijkstra = {
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
                    h: 0,
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
    search: (grid: GridType, start: Position, end: Position, callback: (grid: GridType) => void) => {
        var openHeap = Dijkstra.heap();

        openHeap.push(grid[start.x][start.y]);

        while(openHeap.size() > 0) {
                callback(grid)
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

                var neighbors = Dijkstra.neighbors(grid, currentNode);

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
                        neighbor.g = gScore;
                        neighbor.f = neighbor.g;

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