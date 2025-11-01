import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users", 
    initialState: {
        users: [], 
        userInfo: null,
        token: null,
        isLoading: false, 
        error: null
    }, 
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        getUsers: (state, action) => {
            state.users = action.payload
        }, 
        setToken: (state, action) => {
            state.token = action.payload;
        }, 
        uerLogout: (state, action) => {
            state.userInfo = null;
            state.token = null
        }

    }
})

export const {setLoading,  getUsers , setToken ,setUserInfo,  uerLogout } = usersSlice.actions; 
export default usersSlice.reducer;
