import React, { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { GrPowerReset } from 'react-icons/gr';
import { resolveWithAlgo, createGrid } from '../../features/grid/gridSlice';
import { algorithmNames } from '../../algorithms';

const algos = Object.entries(algorithmNames);

const NavbarWrapper = forwardRef((props, ref) => {
    const { dimensions } = props;
    const dispatch = useDispatch();

    const handleClick = (e, algo) => {
        console.log(algo);
        dispatch(resolveWithAlgo(algo));
    }

    const handleReset = () => {
        const { width, height } = dimensions;
        const difference = ref.current?.offsetHeight;
        if (height > 0) {
            dispatch(createGrid({
                rows: Math.floor((height - (difference === undefined ? 0 : difference)) / 25),
                cols: Math.floor(width / 25)
            }));
        }
    }

    return (
        <div ref={ref} className="min-w-full h-14 bg-teal-800">
            <div className="flex py-2 px-3">
                <button 
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mr-1 rounded"
                    onClick={handleReset}>
                    <GrPowerReset size={22} color="white" style={{ color: 'white' }} />
                </button>
                <div className="">
                    {
                        algos.map((item, index) => (
                            <button key={`algo-${index}`}
                                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mr-1 rounded" 
                                onClick={(e) => handleClick(e, item[0])}>
                                {item[1]}
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
});

export default NavbarWrapper;