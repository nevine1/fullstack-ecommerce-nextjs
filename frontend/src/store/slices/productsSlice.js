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
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }, 
        setProducts: (state, action) => {
            state.products = action.payload
        } 
    }
})

export const { setProducts, setIsLoading } = productsSlice.actions;
export default productsSlice.reducer;