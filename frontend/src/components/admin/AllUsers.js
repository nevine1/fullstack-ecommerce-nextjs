"use client"
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getAllUsers, setIsLoading} from '../../store/slices/usersSlice'
const AllUsers = () => {
    const dispatch = useDispatch();
    const { users} = useSelector((state) => state.users)
    
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    const fetchAllUsers = async () => {
      try {
          dispatch(setIsLoading(true))
            const res = await axios.get(`${backUrl}/api/users/get-users`);
            console.log('users are,', res.data)
        if (res.data.success) {
          console.log('full res is', res.data.data)
              dispatch(getAllUsers(res.data.data))
                console.log('res is', res.data)
            }
        } catch (err) {
            console.log(err)
      } finally {
        dispatch(setIsLoading(false))
        }
    }
    
    useEffect(() => {
        fetchAllUsers();
    }, [])
  console.log('users are', users)
  return (
    <div>
      {
        users?.map((user) => (
          <div key={user._id}>
            <h1>{user.name}</h1>
          </div>
        ))
      }
    </div>
  )
}

export default AllUsers
