import { createSlice } from "@reduxjs/toolkit";

const uislice = createSlice({
  name: "counter",
  initialState: {
    showcart: false,
    showprofile:false,
    shownotification: { active: false, msg: "", path: "", pathname: "" },
    search: "",
    showlogin: false,
    formerror: "",
    orderplaced:false
  },
  reducers: {
    cartchange(state, action, payload) {
      state.showcart = !state.showcart;
    },
    profilechange(state,action,payload){
      state.showprofile = !state.showprofile
    },
    shownotificationbar(state, action, payload) {
      // console.log(action.payload)
      state.shownotification = action.payload;
    },

    updatesearchcontent(state, action, payload) {
      // console.log(action.payload)
      state.search = action.payload;
    },
    loginmodel(state, action, payload) {
      // console.log(action.payload)
     if(!action.payload){
    
      state.showlogin = false
     }else{
      
  
      state.showlogin = true;
     }
    },
    setformerror(state, action, payload) {
      state.formerror = action.payload;
    },setorderplaced(state,action,payload){
      state.orderplaced = action.payload
    }
  },
});

export default uislice.reducer;

export const UiSlice = uislice.actions;
