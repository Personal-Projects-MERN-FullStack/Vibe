// import {createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authHandler from './auth-handler';
// import counterReducer from './counter';
import ProductHandler from './Product-handler';
import uiSlice from './ui-slice';
// const counterReducer = (state={counter:0 },action)=>{
//     if(action.type==='increment'){
//         return {
//             counter :state.counter+1,
//         };
//     }
//     if(action.type === 'decrement'){
//         return {
//             counter :state.counter  - 1
//         }
//     }
//     return state
// }

 

const store = configureStore({
    reducer : {product : ProductHandler,auth:authHandler,ui:uiSlice}
})


export default store;

