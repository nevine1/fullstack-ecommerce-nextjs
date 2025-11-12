import { setIsLoading , setAllUsers, updateUser} from "../slices/usersSlice"
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
            console.log(err.message)
      } finally {
        dispatch(setIsLoading(false))
        }
    }


export const updateRole = async ({ userId, newRole, setShowUpdateRole, dispatch }) => {
  if (!newRole) return alert("Please select a role");
  
  try {
    dispatch(setIsLoading(true));

    const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update-role`, {
      userId,
      role: newRole,
    });

    if (res.data.success) {
      dispatch(updateUser(res.data.data));
      alert("User role updated successfully");
      setShowUpdateRole(false);
    }
  } catch (err) {
    console.error("Error updating role:", err.message);
    alert("Failed to update user role");
  } finally {
    dispatch(setIsLoading(false));
  }
};