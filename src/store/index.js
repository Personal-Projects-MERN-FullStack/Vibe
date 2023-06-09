// import {createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authHandler from './auth-handler';
import counterReducer from './counter';
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
    reducer : {counter : counterReducer,auth:authHandler}
})


export default store;

