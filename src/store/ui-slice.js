import { createSlice } from '@reduxjs/toolkit';

const uislice = createSlice({
    name:'counter',
    initialState : {counter :0,showcounter:true},
    reducers : {
        increment(state){
            state.counter++;
        },
        decrement(state){}
    }
})

export default uislice.reducer;
