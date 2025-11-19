import { combineReducers } from "@reduxjs/toolkit"
import usersReducer from './slices/usersSlice'
import productsReducer from './slices/productsSlice'



const rootReducer = combineReducers({
   users: usersReducer,
   products: productsReducer,
   
  
})
  
export default rootReducer;