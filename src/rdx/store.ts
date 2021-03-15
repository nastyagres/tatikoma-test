import {configureStore, combineReducers} from '@reduxjs/toolkit'
import history from './history';
import theme from './theme';


const reducer = combineReducers({
    history,
    theme
});

export type RootState = ReturnType<typeof store.getState>

const store = configureStore({
    reducer
})


export type AppDispatch = typeof store.dispatch

export default store;
