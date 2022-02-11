import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modal: true, 
    },
    reducers: {
        toggleModal: (state) => {
            state.modal = !!!state.modal;
        },
    }
});

export const {
    toggleModal,
} = modalSlice.actions;

export default modalSlice.reducer;
