import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    auth : false
}
const authhandler = createSlice({
    name:'auth',
    initialState ,
    reducers : {
        Login(state,action,payload){
            console.log(action.payload)
        }
    }
})

export default authhandler.reducer;
export const auth = authhandler.actions;