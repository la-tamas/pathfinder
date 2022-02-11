import isWall from './common/isWall';

var Heap = require('heap');

export const Dijkstra = {
    _init: function(grid) {
        for(var x = 0; x < grid.length; x++) {
            for(var y = 0; y < grid[x].length; y++) {
                grid[x][y] = Object.assign({}, {
                    pos: {
                        x: x,
                        y: y,
                    },
                    f: 0,
                    g: undefined,
                    h: 0,
                    cost: grid[x][y].cost,
                    visited: false,
                    closed: false,
                    parent: null,
                });
            }  
        }
    },
    heap: function() {
        return new Heap((node1, node2) => node1.f - node2.f);
    },
    search: (grid, start, end) => {
        Dijkstra._init(grid)

        var openHeap = Dijkstra.heap();

        openHeap.push(start);

        while(openHeap.size() > 0) {
            var currentNode = openHeap.pop();

            if(currentNode.pos.x === end.pos.x && currentNode.pos.y === end.pos.y) {
                var curr = currentNode;
                var ret = [];
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
    neighbors: function(grid, node) {
        var ret = [];
        var x = node.pos.x;
        var y = node.pos.y;

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