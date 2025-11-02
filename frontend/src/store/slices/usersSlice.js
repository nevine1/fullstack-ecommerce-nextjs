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
        userLogout: (state, action) => {
            state.userInfo = null;
            state.userToken = null
        }

    }
})

export const {setIsLoading,  getUsers , setToken ,setUserInfo,  userLogout } = usersSlice.actions; 
export default usersSlice.reducer;
