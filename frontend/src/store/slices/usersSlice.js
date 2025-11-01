import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users", 
    initialState: {
        users: [], 
        userInfo: null,
        userToken: null,
        isLoading: false, 
        error: null
    }, 
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        getUsers: (state, action) => {
            state.users = action.payload
        }, 
        setToken: (state, action) => {
            state.userToken = action.payload;
        }, 
        uerLogout: (state, action) => {
            state.userInfo = null;
            state.userToken = null
        }

    }
})

export const {setIsLoading,  getUsers , setToken ,setUserInfo,  uerLogout } = usersSlice.actions; 
export default usersSlice.reducer;
