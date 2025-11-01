import { combineReducers } from "@reduxjs/toolkit"
import usersReducer from './slices/usersSlice'



const rootReducer = combineReducers({
   users: usersReducer,
   
  
})
  
export default rootReducer;