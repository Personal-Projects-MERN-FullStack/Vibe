import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  auth: false,
  authtoken: "",
  user:{}
};
const authhandler = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login(state, action, payload) {
       state.auth =true
    },
    Logout(state, action, payload) {
        localStorage.removeItem('authtoken');
        localStorage.removeItem('user');
        state.auth = false;
        state.user = {}
    },
    setauthtoken(state, action, payload) {
        state.authtoken = action.payload
    },
    setuser(state,action,payload){
      state.user = action.payload
    }
    
  },
});

export default authhandler.reducer;
export const auth = authhandler.actions;
