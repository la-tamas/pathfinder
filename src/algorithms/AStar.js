var Heap = require('heap');

function isWall(node) {
    return node.cost === 255;
}

export const AStar = {
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
                    h: undefined,
                    cost: grid[x][y].cost,
                    visited: false,
                    closed: false,
                    parent: null,
                });
                // var node = grid[x][y];
                // node.f = null;
                // node.g = null;
                // node.h = null;
                // node.cost = 1;
                // node.visited = false;
                // node.closed = false;
                // node.parent = null; 
            }  
        }
    },
    heap: function() {
        return new Heap((node1, node2) => node1.f - node2.f);
        //return [];
    },
    search: (grid, start, end) => {
        AStar._init(grid)
        const heuristic = AStar.manhattan;

        var openHeap = AStar.heap();

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
                return ret.reverse();
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
                    neighbor.h = neighbor.h || heuristic(neighbor.pos, end.pos);
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

        return [];
    },
    searchWithPromise: (grid, start, end, timeout) => new Promise(async (resolve) => {
        AStar._init(grid)
        const heuristic = AStar.manhattan;

        var openHeap = AStar.heap();

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
                resolve(ret.reverse());
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
                    neighbor.h = neighbor.h || heuristic(neighbor.pos, end.pos);;
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;

                    if (!beenVisited) {
                        openHeap.push(neighbor);
                        openHeap.heapify();
                    }
                    else {
                        openHeap.push(neighbor);
                        openHeap.heapify();
                    }
                }
            }

            await timeout();
        }

        resolve([]);
    }),
    manhattan: (pos0, pos1) => {
        var d1 = Math.abs (pos1.x - pos0.x);
        var d2 = Math.abs (pos1.y - pos0.y);
        return d1 + d2;
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