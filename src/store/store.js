import { configureStore } from '@reduxjs/toolkit';
import gridReducer from '../features/grid/gridSlice';
import modalReducer from '../features/modal/modalSlice';

export default configureStore({
    reducer: {
        grid: gridReducer,
        modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                
            ],
            ignoredPaths: [
                
            ]
        }
    }),
});
