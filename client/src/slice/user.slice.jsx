import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: {},
    loading: false,
    error: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = false
        },
        signInFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false
        },
        updateStart: (state) => {
            state.loading= true
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = false
        },
        updateFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false
        },
        logoutSuccess: (state) => {
            state.currentUser = {},
            state.loading = false,
            state.error = false
        },
        logoutFailure: (state, action) => {
            state.loading = false,
            state.error = action.payload
        },
        deleteStart: (state) => {
            state.loading= true
        },
        deleteSuccess: (state) => {
            state.currentUser = {},
            state.loading = false,
            state.error = false
        },
        deleteFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false
        },
    }
})

export const { signInStart, signInSuccess, signInFailure, updateFailure, updateStart, updateSuccess, logoutFailure, logoutSuccess, deleteFailure, deleteStart, deleteSuccess } = userSlice.actions

export default userSlice.reducer