import React from 'react';
import PropTypes from 'prop-types';

const ModalContent = ({ content }) => {

    return (
        <div className="p-6 space-y-6">
            {
                content.map((item, index) => (
                    <p key={`dialog-item-${index}`} className="text-white">
                        {item}
                    </p>
                ))
            }
        </div> 
    );
};

ModalContent.propTypes = {
    content: PropTypes.arrayOf(PropTypes.string),
};

export default ModalContent;
