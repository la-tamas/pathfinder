import { FunctionComponent, memo } from 'react';
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import useGrid from '../../hooks/useGrid';
import GridItemBase from './gridItem/gridItem.base';
import useGridActions from '../../hooks/useGridActions';

const GridWrapper: FunctionComponent = () => {
    const grid = useGrid((grid) => grid)
    const { setStartPoint, setEndPoint} = useGridActions()

    const handleDrop: OnDragEndResponder = (result) => {
        let [x, y] = String(result.destination.droppableId).split('-');
        if (String(result.draggableId).indexOf('start') !== -1) {
            setStartPoint({
                x: Number(x),
                y: Number(y)
            });
        } else {
            setEndPoint({
                x: Number(x),
                y: Number(y)
            })
        }
    }

    return (
        <div className="flex justify-center align-center py-1 bg-teal-200">
            <table className="mx-auto bg-white border-collapse">
                <DragDropContext onDragEnd={handleDrop}>
                    <tbody>
                    {
                        grid?.map((row, r) => (
                            <tr key={`grid-row-${r}`}>
                            {
                                row.map((_, c) => (
                                    <Droppable key={`drop-${r}${c}`} droppableId={`${r}-${c}`}>
                                        {(provided) => (
                                            <GridItemBase 
                                                {...provided}
                                                key={`grid-item-${r}${c}`}
                                                position={{ x: r, y: c }}
                                                index={`${r}${c}`}
                                            />
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
    )
}

export default memo(GridWrapper)
