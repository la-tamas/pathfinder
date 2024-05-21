import type { GridItemType } from '../../context/GridContext'

export default function isWall(node: GridItemType) {
    return node.cost === 255
};