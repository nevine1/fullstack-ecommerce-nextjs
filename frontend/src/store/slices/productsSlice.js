import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        lastSearchedCategory: null,
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
            state.productInfo = action.payload;
        },
        setProductDetails: (state, action) => {
            state.productInfo = action.payload;
        },
        setSearchedCategory: (state, action) => {
            state.lastSearchedCategory = action.payload;
        }
    }
})

export const { setProducts, setIsLoading, setUpdatedProduct, setProductDetails, setSearchedCategory } = productsSlice.actions;
export default productsSlice.reducer;