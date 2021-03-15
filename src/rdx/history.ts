import {createSlice} from '@reduxjs/toolkit'

export interface IHistorySlice {
    history: string[];
    error?: boolean;
}

const initialState: IHistorySlice = {
    history: [],
    error: undefined,
}

export const LS_HISTORY_NAME = 'CALCULATIONS_HISTORY';

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        push: (state, action) => {
            state.history.push(action.payload);
            localStorage?.setItem(LS_HISTORY_NAME, JSON.stringify(state.history));
        },
        getHistoryFromLs: (state) => {
            const historyFromLS = localStorage?.getItem(LS_HISTORY_NAME);
            if (historyFromLS) {
                try {
                    state.history = JSON.parse(historyFromLS);
                } catch (e) {
                    state.error = true;
                }
            }
        }
    }
})

export const { push, getHistoryFromLs } = counterSlice.actions
export default counterSlice.reducer
