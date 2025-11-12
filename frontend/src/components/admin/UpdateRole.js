import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setIsLoading, updateUser } from '../../store/slices/usersSlice'
import { IoClose } from "react-icons/io5";

const UpdateRole = ({ userId, setShowUpdateRole, currentRole }) => {
  const [newRole, setNewRole] = useState(currentRole || 'General')
  const dispatch = useDispatch()

  const handleRoleChange = (e) => {
    setNewRole(e.target.value)
  }

  const updateRole = async () => {
    if (!newRole) return alert("Please select a role");
    try {
      dispatch(setIsLoading(true))
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BACK_URL}/api/users/update-role`, {
        userId,
        role: newRole,
      })
      if (res.data.success) {
        dispatch(updateUser(res.data.data))
        alert(' User role updated successfully')
        setShowUpdateRole(false)
      }
    } catch (err) {
      console.error('Error updating role:', err.message)
      alert(' Failed to update user role')
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <button
        onClick={() => setShowUpdateRole(false)}
        className="absolute top-6 right-6 text-white bg-red-600 p-2 rounded-full"
      >
        <IoClose size="20" />
      </button>

      <div className="bg-white p-6 rounded-md shadow-lg flex flex-col gap-4 w-[300px]">
        <h2 className="text-lg font-semibold text-center">Change User Role</h2>
        <select
          value={newRole}
          onChange={handleRoleChange}
          className="border p-2 rounded-md"
        >
          <option value="General">General</option>
          <option value="Admin">Admin</option>
        </select>
        <button
          onClick={updateRole}
          className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-md"
        >
          Update Role
        </button>
      </div>
    </div>
  )
}

export default UpdateRole
