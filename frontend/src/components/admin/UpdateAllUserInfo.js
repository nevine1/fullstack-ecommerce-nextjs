import { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoading } from '@/store/slices/usersSlice'
const UpdateAllUserInfo = ({userId, name, email, role}) => {
    const backUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        name: "", 
        email: "", 
        role: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserInfo((prev) => ({...prev, name: value}))
        }
    const adminUpdateUserInfo = async () => {
        try {
            dispatchEvent(setIsLoading(true))
            const res = await axios.push(`${backUrl}/api/users/update-user-admin`, 
                { userId, name, email, role}
            )
            if (res.data.success) {
                console.log(res.data.data)
            }
        } catch (err) {
            console.log('Error message is:', err.message)
        }
    }
  return (
    <div className="relative inset-0 bg-red-400 flex justify-center items-center m-10 p-10">
      
      
            <div className="bg-gray-100 py-5 px-10 rounded-xl border border-gray-300 shadow-lg w-full max-w-md space-y-5">
              <div>
                <label className="font-bold text-gray-500">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
                  />
               
              </div>
      
              <div>
                <label className="font-bold text-gray-500">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 outline-none bg-blue-50 border border-blue-200 focus:border-blue-200 rounded-md"
                  />
                
                  </div>
                  <div>
                      <select
                            value={role}
                            onChange={handleChange}
                            className="border p-2 rounded-md"
                            >
                            <option value="General">General</option>
                            <option value="Admin">Admin</option>
                            </select>
                  </div>
      
      
              <div className="flex flex-col pt-4">
                <button className="px-8 py-2 mb-5 text-[16px] width-auto rounded-full shadow transition-all duration-500 bg-white text-blue-500 border border-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
            
          
    </div>
  )
}

export default UpdateAllUserInfo
