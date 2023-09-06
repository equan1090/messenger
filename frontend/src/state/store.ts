// import {createStore, applyMiddleware } from 'redux';
// import reducers from "./reducers/index";
// import thunk from 'redux-thunk';
// export const store = createStore(
//     reducers,
//     {},
//     applyMiddleware(thunk)
// )

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { userSlice } from "./service/user";

export const store = configureStore({
    reducer:{
        [userSlice.reducerPath]: userSlice.reducer,
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userSlice.middleware),
})


setupListeners(store.dispatch)
