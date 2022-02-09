import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { VscDebugStart } from 'react-icons/vsc';

const StartPoint = (props) => {
    const { index } = props;

    return (
        <Draggable key={index} draggableId="start-point" index={Number(index)}>
            {(provided) => (
                <div {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    <VscDebugStart 
                        key={index}
                        size={20}
                        style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                </div>
            )}
        </Draggable>
    );
};

StartPoint.propTypes = {
    index: PropTypes.string,
};

export default StartPoint;
