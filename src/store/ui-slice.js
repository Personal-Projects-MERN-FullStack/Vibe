import { createSlice } from '@reduxjs/toolkit';

const uislice = createSlice({
    name:'counter',
    initialState : {showcart:true},
    reducers : {
        cartchange(state,action,payload){
            state.showcart = !state.showcart;
        },
        
    }
})

export default uislice.reducer;

export const UiSlice = uislice.actions;