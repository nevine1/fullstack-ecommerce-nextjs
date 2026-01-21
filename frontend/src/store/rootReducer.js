import { combineReducers } from "@reduxjs/toolkit"
import usersReducer from './slices/usersSlice'
import productsReducer from './slices/productsSlice'
import cartReducer from './slices/cartSlice'



const rootReducer = combineReducers({
   users: usersReducer,
   products: productsReducer,
   cart: cartReducer

})

export default rootReducer;