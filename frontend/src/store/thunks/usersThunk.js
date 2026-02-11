import axios from 'axios'
import { setIsLoading, setAllUsers, setUserInfo } from '../slices/usersSlice';
const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetcAllUsers = () => {

    return async (dispatch) => {

        try {

            dispatch(setIsLoading(true))

            const res = await axios.get(`${backUrl}/api/users/get-users`);
            if (res.data.success) {
                // console.log("all users data", res.data.data)
                dispatch(setAllUsers(res.data.data))
            }

        } catch (err) {
            console.log("error fetching all Users", err.message)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

//update user profile
export const updateUserProfile = (userId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(setIsLoading(true))
            const { userInfo } = getState().users;
            const res = await axios.put(`${backUrl}/api/users/update-user-info/${userId}`, {
                name: userInfo.name,
                email: userInfo.email,
                image: userInfo.image
            }, { headers: { Authorization: `Bearer ${userInfo.token}` } })

            if (res.data.success) {
                dispatch(setUserInfo(res.data.data))
            }


        } catch (err) {
            console.log("Error updating user profile:", err.message);
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}