import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAPI from "./authAPI";

const user = JSON.parse(localStorage.getItem("user"))

// isLoggedIn = bool
// user {
//     access: "",
//     refresh: "",
// }

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };


export const getToken = createAsyncThunk(
    'auth/getToken',
    async (formState) => {
        const data = await authAPI.signin(formState.email, formState.password);
        // login returns response.data
        return data
    }

)

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (formState) => {
        console.log(formState)
        const data = await authAPI.signup(formState.username, formState.email, formState.password);
        // register returns response.data
        console.log(data)
        return data
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        authAPI.logout()
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getToken.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = {};
            })
            .addCase(getToken.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false
                state.user = null;
            })
    }
})

export const { login } = authSlice.actions

export const selectUser = (state) => state.auth.isLoggedIn
export const selectToken = (state) => state.auth.user

export default authSlice.reducer