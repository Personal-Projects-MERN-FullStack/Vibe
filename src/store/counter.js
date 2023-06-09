import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name:'counter',
    initialState : {counter :0,showcounter:true},
    reducers : {
        increment(state){
            state.counter++;
        },
        decrement(state){}
    }
})

export default counterSlice.reducer;
