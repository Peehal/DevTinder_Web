import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:'connections', 
    initialState : null, 
    reducers:{
        addConnections: (state, action) => action.payload,
        removeConnecitons: () => null,
    },
});

export const {addConnections, removeConnecitons} = connectionSlice.actions;

export default connectionSlice.reducer;