import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { BsStopCircle } from 'react-icons/bs';

const EndPoint = (props) => {
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
    );
};

EndPoint.propTypes = {
    index: PropTypes.string,
};

export default EndPoint;
