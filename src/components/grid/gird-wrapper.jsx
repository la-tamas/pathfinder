import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import GridItemBase from './grid-item/grid-item-base';
import { setEndPoint, setStartPoint } from '../../features/grid/gridSlice';

const GridWrapper = (props) => {
    const dispatch = useDispatch();
    const grid = useSelector((state) => state.grid.grid);

    const handleDrop = (result) => {
        let [x, y] = String(result.destination.droppableId).split('-');
        if (String(result.draggableId).indexOf('start') !== -1) {
            dispatch(setStartPoint({
                x: Number(x),
                y: Number(y)
            }));
        } else {
            console.log('ep', x, y);
            dispatch(setEndPoint({
                x: Number(x),
                y: Number(y)
            }));
        }
    };

    return (
        <div className="flex justify-center align-center py-1">
            <div className="border-collapse">
                <table className="mx-auto">
                    <DragDropContext onDragEnd={handleDrop}>
                        <tbody>
                        {
                            grid.map((row, r) => (
                                <tr key={`grid-row-${r}`}>
                                {
                                    row.map((col, c) => (
                                        <Droppable key={`drop-${r}${c}`} droppableId={`${r}-${c}`} index={Number(`${r}${c}`)}>
                                            {(provided) => (
                                                <GridItemBase 
                                                    provided={provided}
                                                    innerRef={provided.innerRef}
                                                    key={`grid-item-${r}${c}`}
                                                    position={{ x: r, y: c }}
                                                    index={`${r}${c}`} />
                                            )}
                                        </Droppable>
                                    ))
                                }
                                </tr>
                            ))
                        }
                        </tbody>
                    </DragDropContext>
                </table>
            </div>
        </div>
    );
};

GridWrapper.propTypes = {
};

export default GridWrapper;
