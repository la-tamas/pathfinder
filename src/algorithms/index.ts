import { AlgorithmTypes, GeneratorTypes } from '../context/GridContext';
import { AStar } from './AStar';
import { DFS } from './DFS';
import { Dijkstra } from './Dijkstra';
import { RandomDFS } from './RandomDFS';
import { Kruskal } from './Kruskal';

export const algorithms = {
    astar: AStar,
    disjkstra: Dijkstra,
    dfs: DFS,
    
} as const;

export const algorithmNames: Record<AlgorithmTypes, string> = {
    astar: 'A*',
    disjkstra: "Dijkstra's algorithm",
    dfs: 'DFS',
} as const;

export const generators = {
    rdfs: RandomDFS,
    kruskal: Kruskal
}

export const generatorNames: Record<GeneratorTypes, string> = {
    rdfs: 'Random DFS',
    kruskal: 'Random Kruskal',
} as const;