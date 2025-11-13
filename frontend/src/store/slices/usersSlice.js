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
            const updatedUser = action.payload;
            state.users = state.users.map((user) =>
                user._id === updatedUser._id ? updatedUser : user
            );

            if (state.userInfo && state.userInfo._id === updatedUser._id) {
                    state.userInfo = { ...state.userInfo, role: updatedUser.role };
                }
            },
        getUsers: (state, action) => {
            state.users = action.payload
        },
        setAllUsers: (state, action) => { 
            state.users = action.payload;
            console.log('redux slice users are', state.users)
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

export const {setIsLoading, setAllUsers,  getUsers , setToken ,setUserInfo,  updateUser,  userLogout } = usersSlice.actions; 
export default usersSlice.reducer;
