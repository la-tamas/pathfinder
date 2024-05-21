import { AlgorithmTypes } from '../context/GridContext';
import { AStar } from './AStar';
import { Dijkstra } from './Dijkstra';

export const algorithms = {
    astar: AStar,
    disjkstra: Dijkstra,
} as const;

export const algorithmNames: Record<AlgorithmTypes, string> = {
    astar: 'A*',
    disjkstra: "Dijkstra's algorithm",
} as const;