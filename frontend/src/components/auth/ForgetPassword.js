import React from 'react'

const ForgetPassword = () => {
  return (
    <div className=" flex justify-center items-center min-h-screen">
          <form className="flex flex-col max-w-md w-full bg-red-200 px-8 py-6 border border-gray-500 m-4">
              <p>sign here to reset ur password</p>
              <label>email</label>
              <input
                  type="email"
                  name="email"

              />
              <label>email</label>
              <input
                  type="email"
                  name="email"
                  
              />
              <button>submit</button>
        </form>
    </div>
  )
}

export default ForgetPassword
