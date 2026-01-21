import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        isCartLoading: false,
        error: null,
    },
    reducers: {
        setIsCartLoading: (state, action) => {
            state.isCartLoading = action.payload;
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setIsCartLoading, setCartItems, setError } = cartSlice.actions;
export default cartSlice.reducer;