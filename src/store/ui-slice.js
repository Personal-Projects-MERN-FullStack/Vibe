import { createSlice } from '@reduxjs/toolkit';

const uislice = createSlice({
    name:'counter',
    initialState : {showcart:false,shownotification:{active:false,msg:"",path:'',pathname:""}},
    reducers : {
        cartchange(state,action,payload){
            state.showcart = !state.showcart;
        },
        shownotificationbar(state,action,payload){
            console.log(action.payload)
            state.shownotification = action.payload
        },
        hidenotification(state,action,payload){

        }
        
    }
})

export default uislice.reducer;

export const UiSlice = uislice.actions;