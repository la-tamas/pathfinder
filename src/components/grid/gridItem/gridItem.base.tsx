import { useMemo, useCallback, ReactNode, forwardRef, memo, MouseEventHandler } from 'react'
import { DroppableProvided } from 'react-beautiful-dnd'
import StartPoint from '../../points/startPoint'
import EndPoint from '../../points/endPoint'
import GridItemContent from './gridItem.content'
import useGrid from '../../../hooks/useGrid'
import useGridContext from '../../../hooks/useGridContext'
import useGridActions from '../../../hooks/useGridActions'

type GridItemBaseProps = DroppableProvided & {
    position:{
        x: number
        y: number
    }
    index: string
    children?: ReactNode | ReactNode[] | JSX.Element
}

const GridItemBase = forwardRef<HTMLTableCellElement, GridItemBaseProps>((props, ref) => {
    const { position, index, innerRef, droppableProps, ...rest } = props;
    const { x, y } = position

    const gridItem = useGrid((grid) => grid[x][y])
    const [solution] = useGridContext((context) => context.solution)
    const { setGridWall, setGridWallConstant } = useGridActions()

    const { value, visited } = useMemo(() => gridItem, [gridItem])

    const isSolution = useMemo(() => {
        const { x, y } = position;
        const filter = solution.filter(item => item.position.x === x && item.position.y === y);
        return filter?.length === 1;
    }, [position, solution])

    const handleClick: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
        event.preventDefault()

        if (value === 2 || value === -1) {
            return
        }
        setGridWall(position)
    }, [position, value]);

    const handleMouseOver: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
        event.preventDefault()
        if (!event.shiftKey) {
            return
        }

        if (value === 2 || value === -1) {
            return
        }
        setGridWallConstant(position)
    }, [position, value])

    const classes = useMemo(() => {
        if (value === 255) return 'bg-grey-400';
        if (!!visited && !isSolution) return 'bg-teal-400';
        if (isSolution) return 'bg-amber-600';
    }, [value, visited, isSolution]);

    return (
        <td 
            {...rest}
            {...droppableProps}
            ref={innerRef} 
            className={`w-[25px] h-[25px] border border-grey-400 ${classes}`}>
            <GridItemContent 
                ref={ref}
                onMouseOver={handleMouseOver}
                onClick={handleClick}
                classes={classes} 
            >
                {value === 2 && <StartPoint index={index} />}
                {value === -1 && <EndPoint index={index} />}
            </GridItemContent>
        </td>
    )
})

export default memo(GridItemBase);
