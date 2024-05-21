import { FunctionComponent } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { BsStopCircle } from 'react-icons/bs'

type EndPointProps = {
    index: string
}

const EndPoint: FunctionComponent<EndPointProps> = (props) => {
    const { index } = props;

    return (
        <Draggable key={index} draggableId="end-point" index={Number(index)}>
            {(provided) => (
                <div {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    <BsStopCircle 
                        key={index}
                        size={20}
                        style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                </div>
            )}
        </Draggable>
    )
}

export default EndPoint
