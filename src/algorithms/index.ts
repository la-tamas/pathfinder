import { AlgorithmTypes } from '../context/GridContext';
import { AStar } from './AStar';
import { DFS } from './DFS';
import { Dijkstra } from './Dijkstra';
import { RandomDFS } from './RandomDFS';

export const algorithms = {
    astar: AStar,
    disjkstra: Dijkstra,
    dfs: DFS,
    rdfs: RandomDFS,
} as const;

export const algorithmNames: Record<AlgorithmTypes, string> = {
    astar: 'A*',
    disjkstra: "Dijkstra's algorithm",
    dfs: 'DFS',
    rdfs: 'Random DFS',
} as const;