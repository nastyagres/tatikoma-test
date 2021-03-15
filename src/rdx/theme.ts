import {createSlice} from '@reduxjs/toolkit'

export enum THEME {
    DARK,
    LIGHT,
}

export interface IThemeSlice {
    theme: THEME;
}

const initialState: IThemeSlice = {
    theme: THEME.DARK,
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        toggle: (state) => {
            state.theme = state.theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
        },
    }
})

export const { toggle } = counterSlice.actions

export default counterSlice.reducer
