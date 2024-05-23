import { AlgorithmTypes } from '../context/GridContext';
import { AStar } from './AStar';
import { Dijkstra } from './Dijkstra';
import { RandomDFS } from './RandomDFS';

export const algorithms = {
    astar: AStar,
    disjkstra: Dijkstra,
    rdfs: RandomDFS,
} as const;

export const algorithmNames: Record<AlgorithmTypes, string> = {
    astar: 'A*',
    disjkstra: "Dijkstra's algorithm",
    rdfs: 'Random DFS',
} as const;