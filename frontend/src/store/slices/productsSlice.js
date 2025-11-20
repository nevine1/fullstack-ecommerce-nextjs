import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products', 
    initialState: {
        products: [], 
        isLoading: false,
        productInfo: null,
        error: null,
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        } 
    }
})

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;