import { FunctionComponent } from 'react';
import { Draggable } from 'react-beautiful-dnd'
import { VscDebugStart } from 'react-icons/vsc'

type StartPointProps = {
    index: string
}

const StartPoint: FunctionComponent<StartPointProps> = (props) => {
    const { index } = props;

    return (
        <Draggable key={index} draggableId="start-point" index={Number(index)}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <VscDebugStart 
                        key={index}
                        size={20}
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    />
                </div>
            )}
        </Draggable>
    )
}

export default StartPoint
