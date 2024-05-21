import { createContext } from 'react'
import { algorithms } from '../algorithms'

export type AlgorithmTypes = keyof typeof algorithms

export type Position = {
    x: number
    y: number
}

export type GridItemType = {
    position: Position
    parent?: GridItemType | null
    cost: number
    solution?: boolean
    value: number
    visited: boolean
    closed: boolean
    f: number
    g?: number
    h: number
}

export type SolutionItem = {
    x: number
    y: number
}

export type GridType = GridItemType[][]

export type CallbackType = (() => void) | undefined

export type GridContextType = {
    grid: GridType
    startingPoint: Position
    endPoint: Position
    solution: GridItemType[]
    isModalVisible: boolean
}

type GridContextProps = {
    get: () => GridContextType
    set: (value: Partial<GridContextType>) => void
    subscribe: (callback: CallbackType) => () => void
}

const GridContext = createContext<GridContextProps>({} as GridContextProps)

export default GridContext
