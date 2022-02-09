import { AStar } from './AStar';
import { Dijkstra } from './Dijkstra';

export const algorithms = {
    astar: AStar,
    disjkstra: Dijkstra,
};

export const algorithmNames = {
    astar: 'A*',
    disjkstra: "Dijkstra's algorithm",
};