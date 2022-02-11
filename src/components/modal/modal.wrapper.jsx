import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalContent from './modal.content';
import { toggleModal } from '../../features/modal/modalSlice';

const modalContents = [
    [
        'Pathfinding or pathing is the plotting, by a computer application, of the shortest route between two points. It is a more practical variant on solving mazes. This field of research is based heavily on Dijkstra`s algorithm for finding the shortest path on a weighted graph.',
        'Pathfinding is closely related to the shortest path problem, within graph theory, which examines how to identify the path that best meets some criteria (shortest, cheapest, fastest, etc) between two points in a large network. '
    ],
    [
        'Click on squares to draw walls or press Shift and draw your mouse over them.',
        'Move the start and end points freely on the grid.',
        'Choose your method.',
        'Check the results!',
    ]
];

const ModalWrapper = () => {
    const dispatch = useDispatch();
    const isVisible = useSelector((state) => state.modal.modal);

    const [activeStep, setActiveStep] = useState(0);

    const handleClose = () => {
        dispatch(toggleModal());
    }

    const handleNext = () => {
        setActiveStep((prev) => prev !== modalContents.length ? prev + 1 : 0);
    }

    return (
        <div aria-hidden={isVisible ? 'false' : 'true'} className={`${isVisible ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal md:h-full md:inset-0`}>
            <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative translate-y-1/4 lg:translate-x-2/4 bg-white rounded-lg shadow dark:bg-teal-700 translate-x-0">
                    <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-teal-600">
                        <h3 className="text-xl font-semibold text-grey-900 lg:text-2xl dark:text-white">
                            Informations
                        </h3>
                        <button 
                            type="button" 
                            className="text-gray-400 bg-transparent hover:bg-teal-900 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={handleClose}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button>
                    </div>
                    <ModalContent content={modalContents[activeStep]} />
                    <div className="flex items-center p-6 space-x-2 rounded-b border-t border-teal-200 dark:border-teal-600">
                        <button 
                            data-modal-toggle="defaultModal"
                            type="button"
                            onClick={handleClose}
                            className="text-gray-500 bg-white hover:bg-grey-700 focus:ring-4 focus:ring-grey-300 rounded-lg border border-grey-200 text-sm font-medium px-5 py-2.5 hover:text-teal-900 focus:z-10 dark:bg-grey-300 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">
                            Skip
                        </button>
                        <button 
                            data-modal-toggle="defaultModal"
                            type="button"
                            onClick={activeStep === modalContents.length - 1 ? handleClose : handleNext}
                            className="text-gray-500 bg-white hover:bg-grey-700 focus:ring-4 focus:ring-grey-300 rounded-lg border border-grey-200 text-sm font-medium px-5 py-2.5 hover:text-teal-900 focus:z-10 dark:bg-grey-300 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">
                            {activeStep === modalContents.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalWrapper;
