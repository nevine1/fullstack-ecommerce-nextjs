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
            state.productInfo = action.payload;
        },
        setProductDetails: (state, action) => {
            state.productInfo = action.payload;
        }
    }
})

export const { setProducts, setIsLoading, setUpdatedProduct, setProductDetails } = productsSlice.actions;
export default productsSlice.reducer;