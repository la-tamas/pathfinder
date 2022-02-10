import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { algorithms } from '../../algorithms';

const timeout = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 1000);
});

export const resolveWithAlgoAsync = createAsyncThunk(
    'grid/resolveWithAlgoAsync',
    async (args) => {
        const { algorithm, costs, sp, ep } = args;
        if (algorithms[algorithm]) {
            try {
                return await algorithms[algorithm].search(costs, sp, ep, timeout);
            } catch (error) {
                return [];
            }
        } else return [];
    }
);

export const gridSlice = createSlice({
    name: 'gird',
    initialState: {
        grid: [],
        sp: {
            pos: {
                x: 0,
                y: 0,
            },
            cost: 2,
            f: 1,
            g: 0,
            h: 4,
            visited: false,
        },
        ep: {
            pos: {
                x: 0,
                y: 1,
            },
            cost: -1,
            f: 0,
            g: 0,
            h: 0,
            visited: false,
        },
        costs: [],
        solution: [],
    },
    reducers: {
        createGrid: (state, action) => {
            const { rows, cols } = action.payload;
            let grid = Array.from(Array(rows), () => new Array(cols));
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    grid[i][j] = 0;
                }
            }
            state.grid = grid;
            let costs = Array.from(Array(rows), () => new Array(cols));
            for (let i = 0; i < costs.length; i++) {
                for (let j = 0; j < costs[i].length; j++) {
                    costs[i][j] = Object.assign({}, {
                        pos: {
                            x: i,
                            y: j,
                        },
                        cost: 1,
                    });
                }
            }
            state.sp.pos.x = 1;
            state.sp.pos.y = 1;
            costs[1][1].cost = 2;
            state.ep.pos.x = costs.length - 2;
            state.ep.pos.y = costs[0].length - 2;
            costs[state.ep.pos.x][state.ep.pos.y].cost = -1
            state.costs = costs;
            state.solution = [];
        },
        setGridWall: (state, action) => {
            const { x, y } = action.payload;
            if (state.costs[x][y].cost === 255) {
                state.costs[x][y].cost = 1;
            } else {
                state.costs[x][y].cost = 255;
            }
        },
        setGridConstantWall: (state, action) => {
            const { x, y } = action.payload;
            state.costs[x][y].cost = 255;
        },
        setStartPoint: (state, action) => {
            const { x, y } = action.payload;
            if (state.costs[x][y].cost === 255 || state.costs[x][y].cost === -1) return;
            state.costs[state.sp.pos.x][state.sp.pos.y].cost = 1;
            state.sp.pos.x = x;
            state.sp.pos.y = y;
            state.costs[x][y].cost = 2;
        },
        setEndPoint: (state, action) => {
            const { x, y } = action.payload;
            if (state.costs[x][y].cost === 255 || state.costs[x][y].cost === 2) return;
            state.costs[state.ep.pos.x][state.ep.pos.y].cost = 1;
            state.ep.pos.x = x;
            state.ep.pos.y = y;
            state.costs[x][y].cost = -1;
        },
        resolveWithAlgo: (state, action) => {
            const algorithm = action.payload;
            let costs = [ ...state.costs ];
            let sp = Object.assign({}, {
                pos: { ...current(state.sp.pos) },
                ...current(state.sp),
            });
            let ep = Object.assign({}, { 
                pos: { ...current(state.ep.pos) },
                ...current(state.ep),
            });
            try {
                const result = algorithms[algorithm].search(costs, sp, ep)
                state.solution = result;
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(resolveWithAlgoAsync.fulfilled, (state, action) => {
            state.solution = action.payload;
        });
    }
});

export const {
    createGrid,
    setGridWall,
    setGridConstantWall,
    setStartPoint,
    setEndPoint,
    resolveWithAlgo,
} = gridSlice.actions;

export default gridSlice.reducer;
