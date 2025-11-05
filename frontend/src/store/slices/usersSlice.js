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
        setToken: (state, action) => {
            state.userToken = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
            console.log('redux user details is:', action.payload)
        },
        updateUser: (state, action) => {
            state.userInfo = action.payload;
            console.log(' redux updated user info is', state.userInfo)
        },
        getUsers: (state, action) => {
            state.users = action.payload
        },
        userLogout: (state, action) => {
            state.userInfo = null;
            state.userToken = null;
            if (typeof window !== 'undefined'){
                localStorage.removeItem('persist:root');
            }
        }

    }
})

export const {setIsLoading,  getUsers , setToken ,setUserInfo,  updateUser,  userLogout } = usersSlice.actions; 
export default usersSlice.reducer;
