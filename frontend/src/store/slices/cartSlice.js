import { createSlice } from "@reduxjs/toolkit";
import { updateLocale } from "moment";

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
        },
        updateCartItem: (state, action) => {
            const updatedItem = action.payload;
            const index = state.cartItems.findIndex((item) => item._id === updatedItem._id);
            if (index !== -1) {
                state.cartItems[index] = { ...state.cartItems[index], ...updatedItem }
            }
        },
    },
});

export const { setIsCartLoading, setCartItems, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;