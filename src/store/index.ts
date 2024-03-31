import { configureStore } from "@reduxjs/toolkit";

import showReducer from "../Home/reducer";

export interface RootState {
    shows: any[];
    }

const store = configureStore({
    reducer: {
        shows: showReducer,
    },
});

export default store;