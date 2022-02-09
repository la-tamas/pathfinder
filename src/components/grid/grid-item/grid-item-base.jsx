import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import StartPoint from '../../points/start-point';
import EndPoint from '../../points/end-point';
import { setGridWall, setGridConstantWall } from '../../../features/grid/gridSlice';
import GridItemContent from './gird-item-content';

const GridItemBase = (props) => {
    const dispatch = useDispatch();
    const { position, index, provided, innerRef } = props;
    const costs = useSelector((state) => state.grid.costs);
    const solution = useSelector((state) => state.grid.solution);

    const value = useMemo(() => {
        const { x, y } = position;
        return costs[x][y].cost;
    }, [position, costs]);

    const visited = useMemo(() => {
        const { x, y } = position;
        return costs[x][y].visited;
    }, [position, costs]);

    const isSolution = useMemo(() => {
        const { x, y } = position;
        const filter = solution.filter(item => item.pos.x === x && item.pos.y === y);
        return filter?.length === 1;
    }, [position, solution])

    const handleClick = (event) => {
        if (value === 2 || value === -1) return;
        dispatch(setGridWall(position));
    }

    const handleMouseOver = (event) => {
        event.preventDefault();
        if (value === 2 || value === -1) return;
        if (!event.shiftKey) return;
        dispatch(setGridConstantWall(position));
    }

    const classes = useMemo(() => {
        if (value === 255) return 'bg-grey-400';
        if (!!visited && !isSolution) return 'bg-teal-400';
        if (isSolution) return 'bg-amber-600';
    }, [value, visited, isSolution]);

    return (
        <td {...provided.droppableProps} 
            ref={innerRef} 
            className={`w-[25px] h-[25px] border border-grey-400 ${classes}`}
            onMouseOverCapture={handleMouseOver}
            onClickCapture={handleClick}>
            <GridItemContent classes={classes} value={value}>
                {value === 2 && <StartPoint index={index} />}
                {value === -1 && <EndPoint index={index} />}
            </GridItemContent>
        </td>
    )
};

GridItemBase.propTypes = {
    position: PropTypes.exact({
        x: PropTypes.number,
        y: PropTypes.number,
    }).isRequired,
    index: PropTypes.string,
    value: PropTypes.number,
    children: PropTypes.oneOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

export default GridItemBase;
