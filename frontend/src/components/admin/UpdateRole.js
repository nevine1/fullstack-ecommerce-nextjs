import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { updateRole } from "@/store/async/usersAsync";

const UpdateRole = ({ userId, setShowUpdateRole, currentRole }) => {
  const [newRole, setNewRole] = useState(currentRole || "General");
  const dispatch = useDispatch();

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
          onChange={(e) => setNewRole(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="General">General</option>
          <option value="Admin">Admin</option>
        </select>

        <button
          onClick={() =>
            updateRole({ userId, newRole, setShowUpdateRole, dispatch })
          }
          className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded-md"
        >
          Update Role
        </button>
      </div>
    </div>
  );
};

export default UpdateRole;
