import { configureStore } from '@reduxjs/toolkit';
import gridReducer from '../features/grid/gridSlice';

export default configureStore({
    reducer: {
        grid: gridReducer,
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
