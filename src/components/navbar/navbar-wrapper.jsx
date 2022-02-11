import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { GrPowerReset } from 'react-icons/gr';
import { BiHelpCircle } from 'react-icons/bi';
import { resolveWithAlgo } from '../../features/grid/gridSlice';
import { algorithmNames } from '../../algorithms';
import { toggleModal } from '../../features/modal/modalSlice';

const algos = Object.entries(algorithmNames);

const NavbarWrapper = forwardRef((props, ref) => {
    const { onReset } = props;
    const dispatch = useDispatch();

    const handleClick = (e, algo) => {
        dispatch(resolveWithAlgo(algo));
    }

    const handleReset = () => {
        onReset();
    }

    const handleHelp = () => {
        dispatch(toggleModal());
    }

    return (
        <div ref={ref} className="min-w-full h-14 min-h-14 bg-teal-800">
            <div className="flex flex-row py-2 px-3 max-h-full overflow-y-auto">
                <button 
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mr-1 rounded"
                    onClick={handleReset}>
                    <GrPowerReset size={22} color="white" style={{ color: 'white' }} />
                </button>
                {
                    algos.map((item, index) => (
                        <button key={`algo-${index}`}
                            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mr-1 rounded overflow-y-hidden" 
                            onClick={(e) => handleClick(e, item[0])}>
                            {item[1]}
                        </button>
                    ))
                }
                <button 
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mr-1 rounded"
                    onClick={handleHelp}>
                    <BiHelpCircle size={22} color="white" style={{ color: 'white' }} />
                </button>
            </div>
        </div>
    )
});

NavbarWrapper.propTypes = {
    onReset: PropTypes.func,
};

export default NavbarWrapper;