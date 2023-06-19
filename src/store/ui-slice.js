import { createSlice } from "@reduxjs/toolkit";

const uislice = createSlice({
  name: "counter",
  initialState: {
    showcart: false,
    shownotification: { active: false, msg: "", path: "", pathname: "" },
    search: "",
    showlogin: false,
    formerror: "",
  },
  reducers: {
    cartchange(state, action, payload) {
      state.showcart = !state.showcart;
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
      state.showlogin = !state.showlogin;
    },
    setformerror(state, action, payload) {
      state.formerror = action.payload;
    },
  },
});

export default uislice.reducer;

export const UiSlice = uislice.actions;
