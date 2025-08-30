import { createSlice } from "@reduxjs/toolkit";

const requestslice = createSlice({
    name:"requests",
    initialState: null,
    reducers:{
        addRequests :(state, action ) => action.payload,
        removeRequest: (state, action) =>{
            const newArray = state.filter ((r)=> r._id != action.payload) ;
            return newArray;
        }
    },
}); 

export const { addRequests, removeRequest } = requestslice.actions;
export default requestslice.reducer;
