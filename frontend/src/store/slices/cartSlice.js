import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        isCartLoading: false,

    },
    reducers: {
        setIsCartLoading: (state, action) => {
            state.isCartLoading = action.payload;
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        }
    }
});

export const { setIsCartLoading, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;