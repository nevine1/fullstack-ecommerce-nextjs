import { setIsLoading , setAllUsers} from "../slices/usersSlice"
import { useSelector } from "react-redux"
import axios from "axios"
const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
export const fetchAllUsers = async (dispatch) => {
      try {
          dispatch(setIsLoading(true))
            const res = await axios.get(`${backUrl}/api/users/get-users`);
            console.log('users are,', res.data)
        if (res.data.success) {
          console.log('full res is', res.data.data)
              dispatch(setAllUsers(res.data.data))
                console.log('res is', res.data)
            }
        } catch (err) {
            console.log(err)
      } finally {
        dispatch(setIsLoading(false))
        }
    }

export const updateRole = async() => {
  try {
       const res = await axios.put(`${backUrl}/api/users/update-role`, ) 
  } catch (err) {
    
      }
    }