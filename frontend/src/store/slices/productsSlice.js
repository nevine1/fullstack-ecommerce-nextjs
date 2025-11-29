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
        }, 
        setUpdatedProduct: (state, action) => {
            state.product = action.payload;
        }
    }
})

export const { setProducts, setIsLoading, setUpdatedProduct } = productsSlice.actions;
export default productsSlice.reducer;