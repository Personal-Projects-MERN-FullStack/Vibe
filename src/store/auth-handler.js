import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    auth : false
}
const authhandler = createSlice({
    name:'auth',
    initialState ,
    reducers : {
        Login(state,action,payload){
            alert("someone is trying to login ")
        }
    }
})

export default authhandler.reducer;
